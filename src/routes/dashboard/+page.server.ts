import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { scrapeAmazonProduct } from '$lib/scraper';
import Product from '$lib/models/product.model';
import { connectToDb } from '$lib/mongoose.js'
import { getAveragePrice, getHighestPrice, getLowestPrice } from '$lib/utils.js'
import type { TProduct } from '$lib/types';
import { trackProduct } from '$lib/server/reusableFunctions';
import { isProductAlreadyTracked } from '$lib/server/reusableFunctions';

export const load = (async ({locals}) => {
    if(!locals.session) {
        redirect(302, '/signin')
    }

    try {
        await connectToDb()

        const userEmail = locals.session.user.email
        const productResult = await Product.find({
            'users.email': userEmail
        }) 

        const products = JSON.parse(JSON.stringify(productResult)) as TProduct[]

        return {
            session: locals.session,
            products
        };
    } catch (error) {
        console.error('Error fetching user products:', error)
        return {
            session: locals.session,
            products: []
        };
    }
}) satisfies PageServerLoad;

export const actions = {
    scrapeAndStoreAmazonProduct: async ({request, locals}) => {
       try {
           const formData = await request.formData()
           const url = formData.get('url') as string
           const userEmail = locals.session?.user.email;

           if (!userEmail) {
               throw new Error('User not authenticated');
           }

           await connectToDb()
           const scrapedProduct = await scrapeAmazonProduct(url)
           let product = scrapedProduct as TProduct
           if (!scrapedProduct) {
               throw new Error('Failed to scrape product')
           }

           const existingProduct = await Product.findOne({url: scrapedProduct.url});
           if(existingProduct) {
               const updatedPriceHistory = [
                   ...existingProduct.priceHistory,
                   { price: scrapedProduct.currentPrice }
                 ]
                 product = {
                   ...scrapedProduct,
                   priceHistory: updatedPriceHistory,
                   lowestPrice: getLowestPrice(updatedPriceHistory),
                   highestPrice: getHighestPrice(updatedPriceHistory),
                   averagePrice: getAveragePrice(updatedPriceHistory),
                 }
                 
                 const isAlreadyTracked = await isProductAlreadyTracked(existingProduct._id.toString(), userEmail);
                 if(isAlreadyTracked) {
                    return { message: 'User already tracks this product' };
                 } else {
                    await trackProduct(existingProduct._id.toString(), userEmail);
                    return { message: 'Product successfully tracked' };
                 }
           }

           const productQuery = await Product.findOneAndUpdate(
               { url: scrapedProduct.url },
               product,
               { upsert: true, new: true }
           );

           if (productQuery) {
               const result = await trackProduct(productQuery._id.toString(), userEmail);
               if(result.success) {
                   return { message: 'Product successfully scraped,stored and tracked' };
               } else {
                   return { message: result.message || 'Failed to track product' };
               }
           }

           return { message: 'Product successfully scraped and stored' };
       } catch (error: any) {
           console.error('Error in scrapeAndStoreAmazonProduct:', error);
           if (error.message === 'Failed to scrape product') {
               return { message: 'Failed to scrape product' };
           } else if (error.message === 'User already tracks this product') {
               return { message: 'User already tracks this product' };
           } else {
               return { message: 'unexpected error' };
           }
       }
    }
};