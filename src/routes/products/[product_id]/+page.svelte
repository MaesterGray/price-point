<script lang="ts">
	import type { PageData } from './$types';
	import Priceinfocard from '$lib/components/Priceinfocard.svelte';
	import ProductCard from '$lib/components/Productcard.svelte';
	import { formatNumber } from '$lib/utils';
	import {Button} from '$lib/components/ui/button'
	import { toast } from 'svelte-sonner';
	import type { User } from '$lib/types';
	let { data ,form}= $props();
	import { enhance } from '$app/forms';
	if(form){
		if (form.error === 'Failed to scrape product') {
		  toast.error('Failed to scrape product')
		}else if(form.success){
		  toast.success('Product scraped successfully')
		}else{
		  toast.error('Server Error : check network settings')
		}}

		const userEmail = data.user.email
		let isTracking = $derived.by(()=>{
			if(data.product.users){
				return data.product.users?.some((user:User)=>user.email === userEmail)
			}
			return false
		})
		let loading = $state(false)
</script>

<div class="product-container">
	<div class="flex gap-28 xl:flex-row flex-col">
	  <div class="product-image">
		<img 
		  src={data.product.image}
		  alt={data.product.title}
		  width={580}
		  height={350}
		  class="mx-auto"
		/>
	  </div>

	  <div class="flex-1 flex flex-col">
		<div class="flex justify-between items-start gap-5 flex-wrap pb-6">
		  <div class="flex flex-col gap-3">
			<p class="text-[28px]  font-semibold">
			  {data.product.title}
			</p>

			<a
			  href={data.product.url}
			  target="_blank"
			  class="text-base text-black opacity-50"
			>
			  Visit Product
			</a>
		  </div>

		  <div class="flex items-center gap-3">
			<div class="product-hearts">
			  <img 
				src="/assets/icons/red-heart.svg"
				alt="heart"
				width={20}
				height={20}
			  />

			  <p class="text-base font-semibold text-[#D46F77]">
				{data.product.reviewsCount}
			  </p>
			</div>

			<div class="p-2 bg-white-200 rounded-10">
			  <img 
				src="/assets/icons/bookmark.svg"
				alt="bookmark"
				width={20}
				height={20}
			  />
			</div>

			<div class="p-2 bg-white-200 rounded-10">
			  <img 
				src="/assets/icons/share.svg"
				alt="share"
				width={20}
				height={20}
			  />
			</div>
		  </div>
		</div>

		<div class="product-info">
		  <div class="flex flex-col gap-2">
			<p class="text-[34px]  font-bold">
			  {data.product.currency} {formatNumber(data.product.currentPrice)}
			</p>
			<p class="text-[21px] text-black opacity-50 line-through">
			  {data.product.currency} {formatNumber(data.product.originalPrice)}
			</p>
		  </div>

		  <div class="flex flex-col gap-4">
			<div class="flex gap-3">
			  <div class="product-stars">
				<img 
				  src="/assets/icons/star.svg"
				  alt="star"
				  width={16}
				  height={16}
				/>
				<p class="text-sm text-primary-orange font-semibold">
				  {data.product.stars || '25'}
				</p>
			  </div>

			  <div class="product-reviews">
				<img 
				  src="/assets/icons/comment.svg"
				  alt="comment"
				  width={16}
				  height={16}
				/>
				<p class="text-sm text-secondary font-semibold">
				  {data.product.reviewsCount} Reviews
				</p>
			  </div>
			</div>

			<p class="text-sm text-black opacity-50">
			  <span class="text-primary-green font-semibold">93% </span> of
			  buyers have recommeded this.
			</p>
		  </div>
		</div>

		<div class="my-7 flex flex-col gap-5">
		  <div class="flex gap-5 flex-wrap">
			<Priceinfocard 
			  title="Current Price"
			  iconSrc="/assets/icons/price-tag.svg"
			  value={`${data.product.currency} ${formatNumber(data.product.currentPrice)}`}
			/>
			<Priceinfocard 
			  title="Average Price"
			  iconSrc="/assets/icons/chart.svg"
			  value={`${data.product.currency} ${formatNumber(data.product.averagePrice)}`}
			/>
			<Priceinfocard 
			  title="Highest Price"
			  iconSrc="/assets/icons/arrow-up.svg"
			  value={`${data.product.currency} ${formatNumber(data.product.highestPrice)}`}
			/>
			<Priceinfocard 
			  title="Lowest Price"
			  iconSrc="/assets/icons/arrow-down.svg"
			  value={`${data.product.currency} ${formatNumber(data.product.lowestPrice)}`}
			/>
		  </div>
		</div>
		<form 
		action={isTracking?'?/removeUserEmailFromProduct':' ?/addUserEmailToProduct'} 
		class="flex flex-col p-3" 
		method='post'
		use:enhance={()=>{
			loading = true
			return async ({update,result})=>{
				await update()
				loading = false
				if(result.data.success){
					toast.success(result.data.message)
				}else{
					toast.error(result.data.message)
				}
			}
		}}>
			{#if !data.user}
			<p class="text-sm text-red-500 opacity-50">You must be logged in to track a product</p>
			{/if}
			<Button type='submit' 
			disabled={!data.user||loading}>
			{isTracking ? loading?'Untracking...':'UnTrack' : loading?'Tracking...':'Track'}
		</Button>
		</form>
	  </div>
	</div>

	<div class="flex flex-col gap-16">
	  <div class="flex flex-col gap-5">
		<h3 class="text-2xl  font-semibold">
		  Product Description
		</h3>

		<div class="prose lg:prose-xl max-w-none">
		  {data.product?.description?.split('\n')}
		</div>
	  </div>

	  <button class="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
		<img 
		  src="/assets/icons/bag.svg"
		  alt="check"
		  width={22}
		  height={22}
		/>

		<a href="/" class="text-base text-white">
		  Buy Now
		</a>
	  </button>
	</div>

		{#if data.similarProducts && data.similarProducts.length > 0}
		<div class="py-14 flex flex-col gap-2 w-full">
			<p class="section-text">Similar Products</p>
	
			<div class="flex flex-wrap gap-10 mt-7 w-full">
				{#each data.similarProducts as product}
				  <ProductCard product={product} />
					
				{/each}
			  
			</div>
		  </div>
		{/if}
	
  </div>