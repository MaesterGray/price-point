<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { Toaster } from 'svelte-sonner';
	import 'nprogress/nprogress.css';
	import { navigating } from '$app/state';
	import { afterNavigate,beforeNavigate } from '$app/navigation';
	import NProgress from 'nprogress';
	import { browser } from '$app/environment';
	let { children } = $props();
	
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

<Toaster/>
<div class=" font-Inter">
	<main class=" max-w-10xl mx-auto">
		<Navbar />
		{@render children()}
	</main>
</div>
