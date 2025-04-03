import {auth} from '$lib/auth/auth'
import {redirect} from '@sveltejs/kit'
import { svelteKitHandler } from 'better-auth/svelte-kit'


export const handle = async ({event, resolve}) => {

const session = await auth.api.getSession({headers:event.request.headers})

if(session){
    event.locals.session = session
}

if(event.url.pathname.startsWith('/dashboard') && !session) {
    return redirect(302, '/signin')
}

if(event.url.pathname.startsWith('/signin') && session) {
    return redirect(302, '/dashboard')
}
return svelteKitHandler({auth, event, resolve})
}
