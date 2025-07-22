<script lang="ts">
	import TripForm from '$lib/components/trip-form/trip-form.svelte';
	import { getFlagEmoji } from '$lib/utils.js';
	import type { PageData } from './$types.js';

	const { data }: { data: PageData } = $props();

	const trip = $derived(data.trip);

	// Convert database dates to form-friendly format
	let formData = $derived({
		...trip,
		startDate: trip.startDate ? new Date(trip.startDate) : null,
		endDate: trip.endDate ? new Date(trip.endDate) : null,
		itinerary: trip.itineraryItems ?? [],
		expenses: [],
		accommodations: [],
		transportation: []
	});

	$effect(() => {
		console.log('formData', trip);
	});
</script>

<svelte:head>
	<title>{trip?.title}</title>
</svelte:head>

<div class="min-h-screen">
	<!-- Header -->
	<div class="relative h-60 w-full rounded-sm" style="background-color: {trip?.accentColor}">
		<div class="relative z-10 flex h-full flex-col items-center justify-center px-4">
			<h1 class="mb-2 font-serif text-4xl text-white md:text-5xl">
				{getFlagEmoji(trip?.destinationCountryCode)}
				{trip?.title}
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
</div>
