import {createAuthClient} from 'better-auth/client'

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_BASE_AUTH_URL,
})


export const {signIn, signUp, signOut, useSession} = authClient