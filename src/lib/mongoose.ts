import mongoose from 'mongoose'
import {MONGODB_URI} from '$env/static/private'
let isConnected = false


export const connectToDb = async ()=>{
    mongoose.set('strictQuery',true)

    if(!MONGODB_URI) return console.log('MONGODN_URI is not defined')

        if(isConnected) return console.log('using existing database connection')

            try {
                await mongoose.connect(MONGODB_URI)
                isConnected = true
                console.log('Mongo Db Connected')
            } catch (error) {
                console.error(error)
            }
}