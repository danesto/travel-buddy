<script lang="ts">
	import DestinationCard from '$lib/components/destination-card.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton/index.js';
	import { getFlagEmoji } from '$lib/utils.js';

	import type { PageProps } from './$types.js';

	const { data }: PageProps = $props();
</script>

<div class="max-w-7xl px-4">
	<div class="mb-12">
		<h1 class="mb-4 font-serif text-4xl font-bold text-gray-800">My Trips</h1>
		<p class="text-lg text-gray-600">Here you can see all of your upcoming or previous trips</p>
	</div>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
		{#await data.trips}
			<Skeleton class="h-48 w-full" />
		{:then trips}
			{#if !trips.length}
				<div class="rounded-2xl bg-white p-8 text-center shadow-lg">
					<div class="mb-4 text-gray-400">
						<div class="mb-4 text-6xl">✈️</div>
						<p class="text-lg">No trips yet</p>
						<p class="text-sm">Start planning your next adventure!</p>
					</div>
					<button
						class="rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:from-sky-600 hover:to-blue-700 hover:shadow-lg"
					>
						Plan New Trip
					</button>
				</div>
			{/if}
			{#each trips as trip}
				<DestinationCard
					{...trip}
					gradientFrom={trip.accentColor}
					gradientTo={trip.accentColor}
					emoji={getFlagEmoji(trip.destinationCountryCode)}
				/>
			{/each}
		{:catch error}
			<p>error loading trips: {error.message}</p>
		{/await}
	</div>
</div>
