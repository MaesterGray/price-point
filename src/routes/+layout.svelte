<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { Toaster } from 'svelte-sonner';
	import 'nprogress/nprogress.css';
	import { afterNavigate,beforeNavigate } from '$app/navigation';
	import NProgress from 'nprogress';
	let { children ,data} = $props();
	
	beforeNavigate(() => {
		NProgress.start();
	});
	afterNavigate(() => {
		NProgress.done();
	});
	NProgress.configure({
		showSpinner: false
	});
	
</script>

<Toaster richColors/>
<div class=" font-Inter">
	<main class=" max-w-10xl mx-auto">
		<Navbar user={data.user}/>
		{@render children()}
	</main>
</div>
