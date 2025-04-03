import {connectToDb} from "$lib/mongoose";
import Product from "$lib/models/product.model";
import {sendEmail} from "$lib/mail";
import type { User } from "$lib/types";

export async function isProductAlreadyTracked(productId: string, userEmail: string) {
    try {
        await connectToDb();
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");
        return product.users.some((user:User) => (user.email === userEmail));
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function trackProduct(productId: string, userEmail: string) {
    if (!await isProductAlreadyTracked(productId, userEmail)) {
        try {
            await connectToDb();
            const product = await Product.findById(productId);
            if (!product) return {success: false, message: "Product not found"};
            
            product.users.push({ email: userEmail });
            await product.save();
            await sendEmail('WELCOME', {title: product.title, url: product.url}, [userEmail]);

            return {success: true, message: "Product tracked successfully"};
        } catch (error) {
            console.log(error);
            return {success: false, message: "Failed to track product"};
        }       
    } else {
        return {success: false, message: "Product already tracked"};
    }
}

export async function untrackProduct(productId: string, userEmail: string) {
    try {
        await connectToDb();
        const product = await Product.findById(productId);
        if (!product) throw new Error("Product not found");
        product.users = product.users.filter((user:User) => (user.email !== userEmail));
        await product.save();
        return {success: true, message: "Product untracked successfully"};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Failed to untrack product"};
    }
}

