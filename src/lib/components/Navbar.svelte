<script>
	const navIcons = [
		{ src: '/assets/icons/search.svg', alt: 'search' },
		{ src: '/assets/icons/black-heart.svg', alt: 'heart' },
		{ src: '/assets/icons/user.svg', alt: 'user' }
	];
</script>

<header class=" w-full">
	<nav class=" nav">
		<a href="/" class=" flex items-center gap-1">
			<img alt="logo" src={'/assets/icons/logo.svg'} width={27} height={27} />
			<p class=" nav-logo">
				Price <span class=" text-primary">Point</span>
			</p>
		</a>
		<div class=" flex items-center gap-5">
			{#each navIcons as icon}
				<img src={icon.src} alt={icon.alt} width={28} height={28} class=" object-contain" />
			{/each}
		</div>
	</nav>
</header>
