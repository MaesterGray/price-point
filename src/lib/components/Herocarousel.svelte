<script>
	import * as Carousel from '$lib/components/ui/carousel/index';
    import Autoplay from "embla-carousel-autoplay";
	const heroImages = [
		{ imgUrl: '/assets/images/hero-1.svg', alt: 'smartwatch' },
		{ imgUrl: '/assets/images/hero-2.svg', alt: 'bag' },
		{ imgUrl: '/assets/images/hero-3.svg', alt: 'lamp' },
		{ imgUrl: '/assets/images/hero-4.svg', alt: 'air fryer' },
		{ imgUrl: '/assets/images/hero-5.svg', alt: 'chair' }
	];
</script>

<div class=" hero-carousel">
	<Carousel.Root
    plugins={[Autoplay({ delay: 2000 })]}
		class="carousel"
	>
		<Carousel.Content class="">
		{#each heroImages as image}
			<Carousel.Item class="">
				<img src={image.imgUrl} alt={image.alt} width={484} height={484} class="object-contain" />
			</Carousel.Item>
		{/each}
    </Carousel.Content>
	</Carousel.Root>

	
</div>
