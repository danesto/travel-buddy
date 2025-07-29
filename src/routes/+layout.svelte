<script lang="ts">
	import '../app.css';
	import hero from '$lib/assets/header.jpg';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { toast } from 'svelte-sonner';

	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import SearchBox from '$lib/components/search-box.svelte';

	let { children } = $props();

	let currentPage = $derived($page.url.pathname);

	const isHomePage = $derived(currentPage === '/');

	$effect(() => {
		const toastType = $page.url.searchParams.get('toast');
		const message = $page.url.searchParams.get('message');

		if (toastType && message) {
			switch (toastType) {
				case 'success':
					toast.success(message, { position: 'top-center' });
					break;
				case 'error':
					toast.error(message, { position: 'top-center' });
					break;
				case 'info':
					toast.info(message, { position: 'top-center' });
					break;
				case 'warning':
					toast.warning(message, { position: 'top-center' });
					break;
			}

			const newUrl = new URL($page.url);

			newUrl.searchParams.delete('toast');
			newUrl.searchParams.delete('message');

			goto(newUrl.toString(), { replaceState: true });
		}
	});
</script>

<header
	class="relative flex w-full flex-col gap-30 bg-cover bg-center bg-no-repeat
	{isHomePage ? 'bg-transparent pt-10 pb-20' : 'bg-gradient-to-r from-green-900 to-green-800 pt-10'}
"
>
	<nav class="bg-opacity-95 relative z-20 w-full {isHomePage && 'shadow-sm'} bg-transparent">
		<div
			class="mx-auto max-w-7xl rounded-full px-4 text-white {isHomePage &&
				'shadow-sm backdrop-blur-sm '} sm:px-6 lg:px-8"
		>
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<a href="/">
						<h1 class="font-serif text-2xl font-bold text-white">travel buddy</h1>
					</a>
				</div>
				<div class="flex space-x-8">
					<a
						href="/"
						class="rounded-md px-3 py-2 font-medium tracking-wide text-white transition-all duration-200 hover:bg-cyan-50 hover:text-cyan-800"
						>Home</a
					>
					<a
						href="/trips"
						class="rounded-md px-3 py-2 font-medium tracking-wide text-white transition-all duration-200 hover:bg-cyan-50 hover:text-cyan-800"
						>My Trips</a
					>
					<a
						href="/trips"
						class="rounded-md px-3 py-2 font-medium tracking-wide text-white transition-all duration-200 hover:bg-cyan-50 hover:text-cyan-800"
						>AI Planner</a
					>
					<a
						href="/trips"
						class="rounded-md px-3 py-2 font-medium tracking-wide text-white transition-all duration-200 hover:bg-cyan-50 hover:text-cyan-800"
						>Expense Tracker</a
					>
					<a
						href="/trips"
						class="rounded-md px-3 py-2 font-medium tracking-wide text-white transition-all duration-200 hover:bg-cyan-50 hover:text-cyan-800"
						>Travel Diary</a
					>
				</div>
			</div>
		</div>
	</nav>

	<!-- Dark overlay for better text readability -->

	{#if isHomePage}
		<img src={hero} alt="Hero" class="absolute inset-0 h-full w-full object-cover brightness-60" />
	{/if}

	<!-- <div class="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-800 bg-opacity-50"></div> -->

	<!-- Hero Content -->
	{#if isHomePage}
		<div class="relative z-10 flex h-full flex-col items-center justify-center px-4">
			<div class="mb-8 px-2 py-2 text-center">
				<h1
					class="mb-4 font-serif text-5xl font-bold text-white underline decoration-orange-500 decoration-6 md:text-6xl"
				>
					Plan your next trip
				</h1>
				<p class="max-w-2xl text-xl text-white opacity-90 md:text-2xl">
					Plan your next trip with our AI-powered travel buddy
				</p>
			</div>

			<!-- Search Box -->
			<SearchBox />
		</div>
	{/if}
</header>

<!-- Main Content -->
<main class="relative z-10 mx-auto mt-10 max-w-7xl bg-[#fdf7f2]">
	<Toaster />
	{@render children()}
</main>
