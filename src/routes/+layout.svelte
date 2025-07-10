<script lang="ts">
	import '../app.css';
	import hero from '$lib/assets/header.jpg';

	import { page } from '$app/stores';

	let { children} = $props();

	let currentPage = $derived($page.url.pathname);

	const isHomePage = $derived(currentPage === '/');
</script>

<!-- Hero Header with Background -->
<header class="relative w-full py-10 pb-20 bg-cover bg-center bg-no-repeat flex flex-col gap-30">
<!-- Navigation Bar -->
<nav class="relative z-20 w-full bg-opacity-95 shadow-sm bg-transparent">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent text-white rounded-full backdrop-blur-sm shadow-sm">
		<div class="flex justify-between items-center h-16">
			<div class="flex items-center">
				<a href="/">
					<h1 class="text-2xl font-bold text-white">TravelBuddy</h1>
				</a>
			</div>
			<div class="flex space-x-8">
				<a href="/" class="text-white hover:text-cyan-800 hover:bg-cyan-50 px-3 py-2 rounded-md font-medium tracking-wide transition-all duration-200">Home</a>
				<a href="/trips" class="text-white hover:text-cyan-800 hover:bg-cyan-50 px-3 py-2 rounded-md font-medium tracking-wide transition-all duration-200">My Trips</a>
				<a href="/trips" class="text-white hover:text-cyan-800 hover:bg-cyan-50 px-3 py-2 rounded-md font-medium tracking-wide transition-all duration-200">AI Planner</a>
				<a href="/trips" class="text-white hover:text-cyan-800 hover:bg-cyan-50 px-3 py-2 rounded-md font-medium tracking-wide transition-all duration-200">Expense Tracker</a>
				<a href="/trips" class="text-white hover:text-cyan-800 hover:bg-cyan-50 px-3 py-2 rounded-md font-medium tracking-wide transition-all duration-200">Travel Diary</a>
			</div>
		</div>
	</div>
</nav>


	<!-- Dark overlay for better text readability -->

		{#if isHomePage}
			<img src={hero} alt="Hero" class="absolute inset-0 w-full h-full object-cover brightness-60">
		{/if}

	<!-- <div class="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-800 bg-opacity-50"></div> -->
	
	<!-- Hero Content -->
	<div class="relative z-10 flex flex-col items-center justify-center h-full px-4">
		<div class="text-center mb-8 px-2 py-2">
			<h1 class="text-5xl md:text-6xl font-bold text-white font-serif mb-4 underline decoration-orange-500 decoration-6">
				Plan your next trip
			</h1>
			<p class="text-white text-xl md:text-2xl opacity-90 max-w-2xl">Plan your next trip with our AI-powered travel buddy</p>
		</div>
		
		<!-- Search Box -->
		<div class="w-full max-w-5xl">
			<div class="bg-white rounded-4xl shadow-2xl p-3 flex items-center">
				<input type="text" placeholder="Where to?" class="flex-1 p-4 text-lg border-none focus:outline-none focus:ring-0 bg-transparent" />
				<div class="h-12 w-px bg-gray-300 mx-2"></div>
				<input type="date" placeholder="When?" class="flex-1 p-4 text-lg border-none focus:outline-none focus:ring-0 bg-transparent" />
				<div class="h-12 w-px bg-gray-300 mx-2"></div>
				<input type="number" placeholder="Guests" class="flex-1 p-4 text-lg border-none focus:outline-none focus:ring-0 bg-transparent" />
				<button class="cursor-pointer bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg text-lg">
					Search
				</button>
			</div>
		</div>
	</div>
</header>

<!-- Main Content -->
<main class="relative z-10">
	{@render children()}
</main>
