import type { PageServerLoad } from './$types';
import { connectToDb } from '$lib/mongoose';
import Product  from '$lib/models/product.model';
import { addUserEmailToProduct } from '$lib/utils';
import { sendEmail } from '$lib/mail';
import type { User } from '$lib/types';

export const load = (async ({params}) => {
		const {product_id} = params;
		await connectToDb();
		let productRaw = await Product.findOne({_id:product_id});
		let product = JSON.parse(JSON.stringify(productRaw));
		const similarProductsRaw = await Product.find({
			_id: { $ne: product_id },
		  }).limit(3);
		const similarProducts = JSON.parse(JSON.stringify(similarProductsRaw));
	return {product,similarProducts};
}) satisfies PageServerLoad;


export const actions = {
	addUserEmailToProduct:async ({request})=>{
		const formdata = await request.formData();
		const productId = formdata.get('productId');
		const userEmail = formdata.get('userEmail') as string;
		try {
			await connectToDb()
			const product = await Product.findById(productId);
		
			if(!product) return;
		
			const userExists = product.users.some((user: User) => user.email === userEmail);
		
			if(!userExists) {
			  product.users.push({ email: userEmail });
		
			  await product.save();
			await sendEmail('WELCOME',{title:product.title,url:product.url},[userEmail]);
			  return {success:true};
		
			}else {
				return {error:'User already exists'};
			}
		  } catch (error:any) {
			
			console.log(error);
			return {error:error.message};
		  }
	}
}