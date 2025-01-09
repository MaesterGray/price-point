<script>
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
			hostname.includes('amaxon.') ||
			hostname.endsWith('amaxon')
		) {
			return true;
		} else {
			return false;
		}
        } else {
            return false
        };
        } catch (error) {
            
        }
        
		
	});
    $inspect(isValid)
</script>

<form
 class=" mt-12 flex flex-wrap gap-4" 
 method="post" 
 action="?/scrapeAndStoreAmazonProduct"
 use:enhance={()=>{
    isLoading = true
	toast.success('Valid Link')
    return async({update,result})=>{
        await update()
        isLoading = false
		console.log(result)
		if(result.data.message==='unexpected error'){
			toast.error('Server error: check your network settings')
		}else if(result.data.message==='Failed to scrape product'){
			toast.error('Failed to scrape product')
		}else if(result.data.message === 'Product sucessfully scraped and stored'){
			toast.success('Product scraped successfully')
		}else{
			toast.error('Product already exists')
		}
    }
}}>
	<input
		type="text"
		id="url"
		name='url'
		bind:value={searchPrompt}
		placeholder="Enter product link"
		class=" searchbar-input"
	/>
	<button type="submit" class="searchbar-btn" disabled={ !isValid}>
		{isLoading ? 'Searching...' : 'Search'}
	</button>
</form>
