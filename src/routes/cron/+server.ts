import { getLowestPrice, getHighestPrice, getAveragePrice, getEmailNotifType } from "$lib/utils";
import { connectToDb } from "$lib/mongoose";
import Product from "$lib/models/product.model";
import { scrapeAmazonProduct } from "$lib/scraper";
import {  sendEmail } from "$lib/mail";
import { json } from "@sveltejs/kit";
import type {User} from '$lib/types'
export const GET = async () => {
	try {
		await connectToDb();

		const products = await Product.find({});
	
		if (!products) throw new Error("No product fetched");
	
		// ======================== 1 SCRAPE LATEST PRODUCT DETAILS & UPDATE DB
		const updatedProducts = await Promise.all(
		  products.map(async (currentProduct) => {
			// Scrape product
			const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);
	
			if (!scrapedProduct) return;
	
			const updatedPriceHistory = [
			  ...currentProduct.priceHistory,
			  {
				price: scrapedProduct.currentPrice,
			  },
			];
	
			const product = {
			  ...scrapedProduct,
			  priceHistory: updatedPriceHistory,
			  lowestPrice: getLowestPrice(updatedPriceHistory),
			  highestPrice: getHighestPrice(updatedPriceHistory),
			  averagePrice: getAveragePrice(updatedPriceHistory),
			};
	
			// Update Products in DB
			const updatedProduct = await Product.findOneAndUpdate(
			  {
				url: product.url,
			  },
			  product
			);
	
			// ======================== 2 CHECK EACH PRODUCT'S STATUS & SEND EMAIL ACCORDINGLY
			const emailNotifType = getEmailNotifType(
			  scrapedProduct,
			  currentProduct
			);
	
			if (emailNotifType && updatedProduct.users.length > 0) {
			  const productInfo = {
				title: updatedProduct.title,
				url: updatedProduct.url,
			  };
			  // Construct emailContent
			  // Get array of user emails
			  const userEmails = updatedProduct.users.map((user:User) => user.email);
			  userEmails.forEach(async (email:string) => {
				await sendEmail(emailNotifType,productInfo, [email]);
			  });
			  // Send email notification
			  
			}
	
			return updatedProduct;
		  })
		)
	return json({status:200,products:updatedProducts})

	} catch (error) {
		console.log(error)
		
	}
;
};
