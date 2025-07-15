<script lang="ts">
	import TripForm from '$lib/components/trip-form/trip-form.svelte';
	import { Toast } from '$lib/components/ui/toast/index.js';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from './$types.js';

	const { data }: { data: PageData } = $props();

	const { trip } = data;

	let showCreatedToast = $state(false);

	// Convert database dates to form-friendly format
	const formData = {
		...trip,
		startDate: trip.startDate ? new Date(trip.startDate) : null,
		endDate: trip.endDate ? new Date(trip.endDate) : null,
		itinerary: [],
		expenses: [],
		accommodations: [],
		transportation: []
	};

	onMount(() => {
		// Check if user just created the trip
		if ($page.url.searchParams.get('created') === 'true') {
			showCreatedToast = true;

			// Clean up the URL by removing the query parameter
			const newUrl = new URL($page.url);
			newUrl.searchParams.delete('created');
			goto(newUrl.toString(), { replaceState: true });
		}
	});

	function handleToastClose() {
		showCreatedToast = false;
	}

	console.log('Trip data:', trip);
	console.log('Form data:', formData);
</script>

<svelte:head>
	<title>Edit {trip?.title}</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header -->
	<div class="relative h-60 w-full bg-gradient-to-br from-blue-600 to-cyan-600">
		<div class="relative z-10 flex h-full flex-col items-center justify-center px-4">
			<h1 class="mb-2 font-serif text-4xl font-bold text-white md:text-5xl">
				🌴 Edit {trip?.title}
			</h1>
			<p class="max-w-2xl text-center text-lg text-white opacity-90">
				{trip?.destination}
			</p>
		</div>
	</div>

	<!-- Main Content -->
	<div class="relative z-10 mx-auto -mt-16 max-w-6xl px-4">
		<TripForm mode="edit" defaultValues={formData} />
	</div>

	<!-- Toast Notification -->
	{#if showCreatedToast}
		<Toast
			type="success"
			title="Trip Created! 🎉"
			description="Your trip has been successfully created. Continue adding more details like itinerary, expenses, and accommodations."
			duration={6000}
			onClose={handleToastClose}
			show={showCreatedToast}
		/>
	{/if}
</div>
