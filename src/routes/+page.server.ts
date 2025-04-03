import { connectToDb } from '$lib/mongoose.js'
import { scrapeAmazonProduct } from '$lib/scraper/index.js'
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

