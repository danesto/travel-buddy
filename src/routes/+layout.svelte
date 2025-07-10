<script lang="ts">
	import '../app.css';
	import hero from '$lib/assets/header.jpg';

	import { page } from '$app/stores';

	let { children } = $props();

	let currentPage = $derived($page.url.pathname);

	const isHomePage = $derived(currentPage === '/');
</script>

<!-- Hero Header with Background -->
<header
	class="relative flex w-full flex-col gap-30 bg-cover bg-center bg-no-repeat
	{isHomePage ? 'bg-transparent pt-10 pb-20' : 'bg-gradient-to-r from-blue-900 to-blue-800 pt-10'}
"
>
	<!-- Navigation Bar -->
	<nav class="bg-opacity-95 relative z-20 w-full {isHomePage && 'shadow-sm'} bg-transparent">
		<div
			class="mx-auto max-w-7xl rounded-full px-4 text-white {isHomePage &&
				'shadow-sm backdrop-blur-sm '} sm:px-6 lg:px-8"
		>
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<a href="/">
						<h1 class="text-2xl font-bold text-white">TravelBuddy</h1>
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
			<div class="w-full max-w-5xl">
				<div class="flex items-center rounded-4xl bg-white p-3 shadow-2xl">
					<input
						type="text"
						placeholder="Where to?"
						class="flex-1 border-none bg-transparent p-4 text-lg focus:ring-0 focus:outline-none"
					/>
					<div class="mx-2 h-12 w-px bg-gray-300"></div>
					<input
						type="date"
						placeholder="When?"
						class="flex-1 border-none bg-transparent p-4 text-lg focus:ring-0 focus:outline-none"
					/>
					<div class="mx-2 h-12 w-px bg-gray-300"></div>
					<input
						type="number"
						placeholder="Guests"
						class="flex-1 border-none bg-transparent p-4 text-lg focus:ring-0 focus:outline-none"
					/>
					<button
						class="cursor-pointer rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:from-sky-600 hover:to-blue-700 hover:shadow-lg"
					>
						Search
					</button>
				</div>
			</div>
		</div>
	{/if}
</header>

<!-- Main Content -->
<main class="relative z-10 mx-auto mt-10 max-w-7xl bg-gray-50">
	{@render children()}
</main>
