import { connectToDb } from '$lib/mongoose.js'
import { scrapeAmazonProduct } from '$lib/scraper/index.js'
import { fail } from '@sveltejs/kit'
import Product from '$lib/models/product.model.js'
import { getAveragePrice,getHighestPrice,getLowestPrice } from '$lib/utils.js'

export async function load(){
    try {
        connectToDb();
    
        const productResult = await Product.find() as [];
        const productsRaw = []
        productResult.forEach((product)=>{
            productsRaw.push(product)
        })
        const products = JSON.parse(JSON.stringify(productsRaw))
        return {products};
      } catch (error) {
        console.log(error);
      }
}

export const actions = {
     scrapeAndStoreAmazonProduct: async ({request}) => {
        try {
            const formData = await request.formData()
            const url = formData.get('url') as string
            await connectToDb()
            const scrapedProduct = await scrapeAmazonProduct(url)
            let product = scrapedProduct
            if (!scrapedProduct) {
                throw new Error('Failed to scrape product')
            }
        const existingProduct = await Product.findOne({url:scrapedProduct.url});
        if(existingProduct){
            const updatedPriceHistory= [
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
            return{message:'Product already exists',}

        }
        await Product.findOneAndUpdate({  url:scrapedProduct.url},
            product,
            {upsert:true,new:true}
        )
        return {message:'Product successfully scraped and stored'}
        } catch (error:any) {
            if (error.message==='Failed to scrape product') {
                return {message:'failed to scrape product',}
            }else{
                return {message:'unexpected error'}
            }
        }
        
     }
}