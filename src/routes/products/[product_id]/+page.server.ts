import type { PageServerLoad } from './$types';
import { connectToDb } from '$lib/mongoose';
import Product  from '$lib/models/product.model';
import type { TProduct } from '$lib/types';
import { trackProduct } from '$lib/server/reusableFunctions';
import { invalidateAll } from '$app/navigation';
export const load = (async ({params,locals}) => {
		const {product_id} = params;
		await connectToDb();
		let productRaw = await Product.findOne({_id:product_id});
		let product = JSON.parse(JSON.stringify(productRaw)) as TProduct
		const similarProductsRaw = await Product.find({
			_id: { $ne: product_id },
		  }).limit(3) as TProduct[]
		const similarProducts = JSON.parse(JSON.stringify(similarProductsRaw));
	return {product,similarProducts,user:locals!.session!.user};
}) satisfies PageServerLoad;


export const actions = {
	addUserEmailToProduct:async ({request,params,locals})=>{
		const productId = params.product_id
		const userEmail = locals!.session!.user.email;
		try {
		let result = await trackProduct(productId ,userEmail)
		invalidateAll()
		return result
		  } catch (error:any) {
			
			console.log(error);
			return {sucess:false,message:'Unexpecteed error occured'};
		}
	}
}