<script>
	import TripForm from '$lib/components/trip-form.svelte';
	import { enhance } from '$app/forms';
</script>

<svelte:head>
	<title>Create New Trip</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<div class="relative h-60 w-full bg-gradient-to-br from-blue-600 to-cyan-600">
		<div class="relative z-10 flex h-full flex-col items-center justify-center px-4">
			<h1 class="mb-2 font-serif text-4xl font-bold text-white md:text-5xl">🌴 Create New Trip</h1>
			<p class="max-w-2xl text-center text-lg text-white opacity-90">
				Plan your perfect adventure with our comprehensive trip planner
			</p>
		</div>
	</div>

	<!-- Main Content -->
	<div class="relative z-10 mx-auto -mt-16 max-w-6xl px-4">
		<form method="POST" use:enhance>
			<TripForm mode="create" />
		</form>
	</div>
</div>
