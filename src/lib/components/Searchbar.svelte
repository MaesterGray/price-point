<script lang="ts">
	import { enhance } from "$app/forms";
	import {toast} from 'svelte-sonner'

	let searchPrompt = $state('');
	let isLoading = $state(false);
	let isValid = $derived.by(() => {
        try {
            if(searchPrompt !== '') {
                const parsedUrl = new URL(searchPrompt);
                const hostname = parsedUrl.hostname;

                if (
                    hostname.includes('amazon') ||
                    hostname.includes('amazon.') ||
                    hostname.endsWith('amazon')
                ) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } catch (error) {
            return false;
        }
	});
</script>

<form
 class="mt-12 flex flex-wrap gap-4" 
 method="post" 
 action="?/scrapeAndStoreAmazonProduct"
 use:enhance={()=>{
    isLoading = true;
    return async({update, result}) => {
        await update();
        isLoading = false;
        
        if (!result || !('data' in result)) return;
        
        const message = result.data?.message;
        
        switch(message) {
            case 'unexpected error':
                toast.error('Server error: check your network settings');
                break;
            case 'Failed to scrape product':
                toast.error('Failed to scrape product');
                break;
            case 'Product successfully scraped,stored and tracked':
                toast.success('Product successfully tracked!');
                break;
            case 'Product successfully tracked':
                toast.success('Product successfully tracked!');
                break;
            case 'User already tracks this product':
                toast.error('You are already tracking this product');
                break;
            default:
                toast.error('An unexpected error occurred');
        }
    }
}}>
	<input
		type="text"
		id="url"
		name='url'
		bind:value={searchPrompt}
		placeholder="Enter product link"
		class="searchbar-input"
	/>
	<button type="submit" class="searchbar-btn" disabled={!isValid}>
		{isLoading ? 'Searching...' : 'Search'}
	</button>
</form>
