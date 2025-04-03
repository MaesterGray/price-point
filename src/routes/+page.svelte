<script>
	import Productcard from "$lib/components/Productcard.svelte";
    import Herocarousel from "$lib/components/Herocarousel.svelte";
    import { toast } from "svelte-sonner";
    let {form,data} = $props()
    if(form){
        if (form.error === 'Failed to scrape product') {
          toast.error('Failed to scrape product')
        }else if(form.success){
          toast.success('Product scraped successfully')
        }else{
          toast.error('Server Error : check network settings')
        }
      }
</script>
<section class="px-6 md:px-20 py-24">
    <div class="flex max-xl:flex-col gap-16">
      <div class="flex flex-col justify-center"> 
        <p class="small-text">
          Smart Shopping Starts Here:
         
        </p>

        <h1 class="head-text">
          Unleash the Power of
          <span class="text-primary"> PriceWise</span>
        </h1>

        <p class="mt-6">
          Powerful, self-service product and growth analytics to help you convert, engage, and retain more.
        </p>

      </div>

      <Herocarousel /> 
    </div>
  </section>

  <section class="trending-section">
    <h2 class="section-text">Trending</h2>

    <div class="flex flex-wrap gap-x-8 gap-y-16">
     {#each data.products as product }
        <Productcard product={product}/>
     {/each}
    </div>
  </section>