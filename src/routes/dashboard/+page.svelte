<script lang="ts">
    import type { PageData } from './$types';
    import Searchbar from '$lib/components/Searchbar.svelte';
    import Productcard from '$lib/components/Productcard.svelte';
    let { data }: { data: PageData } = $props();

  
</script>

<section class='flex flex-col items-center px-6 py-24 md:px-24'>
    <div class='mb-8 flex items-center justify-between'>
        <h1 class='head-text'>Welcome, {data.session.user.name}</h1>
    </div>

    <div class='mb-12'>
        <h2 class='text-2xl font-semibold mb-4'>Track New Product</h2>
        <div class='max-w-3xl'>
            <Searchbar />
        </div>
    </div>

    <div class='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <div class='rounded-lg bg-white p-6 shadow-md'>
            <h2 class='mb-4 text-xl font-semibold'>Your Products</h2>
            <p class='text-gray-600'>Track your product prices here</p>
        </div>
    </div>

    <div class="flex flex-wrap gap-x-8 gap-y-16">
        {#each data.products as product }
           <Productcard product={product}/>
        {/each}
       </div>
</section>