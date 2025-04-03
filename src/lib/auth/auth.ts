import {betterAuth} from 'better-auth'
import {MongoClient} from 'mongodb'
import { mongodbAdapter } from 'better-auth/adapters/mongodb'
import {MONGODB_URI} from '$env/static/private'

const client = new MongoClient(MONGODB_URI)

const db = client.db('better-auth')

export const auth = betterAuth({
database: mongodbAdapter(db),
emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
}
})
