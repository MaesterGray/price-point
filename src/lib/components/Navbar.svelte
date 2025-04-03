<script lang='ts'>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
    import { signOut } from '$lib/auth/auth.client';

	const navIcons = [
		{ src: '/assets/icons/search.svg', alt: 'search' },
		{ src: '/assets/icons/black-heart.svg', alt: 'heart' },
		{ src: '/assets/icons/user.svg', alt: 'user' }
	];
	let {user} = $props();
	const handleDashoardNav = (index:number) => {
		let dashboardNavIndex;
		navIcons.find((element,index)=>{
			if(element.alt === 'user'){
				dashboardNavIndex = index;
			}
		})
		if(dashboardNavIndex === index){
			goto('/dashboard');
		}
	}
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
			{#if user && $page.url.pathname !== '/dashboard'}
			{#each navIcons as icon,i}
				<img
				 onclick={()=>{handleDashoardNav(i)}} 
				 src={icon.src} 
				 alt={icon.alt} 
				 width={28} 
				 height={28} 
				 class=" object-contain cursor-pointer" />
			{/each}
			{:else if !user && $page.url.pathname !=='/dashboard'}
				<a href="/signin" class=" bg-primary text-white px-4 py-2 rounded-md">Signin</a>
				<a href="/signup" class=" bg-red-400 text-white px-4 py-2 rounded-md">Signup</a>
			{/if}
			{#if $page.url.pathname === '/dashboard'}
				<Button 
				variant="destructive" 
				class=" bg-red-500 text-white px-4 py-2 rounded-md"
				onclick={()=>{
					signOut();
					goto('/signin');
				}}>
					Sign Out
				</Button>
			{/if}
		</div>
	</nav>
</header>
