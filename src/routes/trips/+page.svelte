<script lang="ts">
	import DestinationCard from '$lib/components/destination-card.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
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
				<DestinationCard
					href="/trips/create"
					title="Start planning your next adventure!"
					summary="No Trips Yet"
					gradientFrom="#4f46e5"
					gradientTo="#8b5cf6"
					emoji="🗺️"
				/>
			{/if}
			{#each trips as trip}
				<DestinationCard
					{...trip}
					gradientFrom={trip.accentColor}
					gradientTo={trip.accentColor}
					emoji={getFlagEmoji(trip.destinationCountryCode)}
				/>
			{/each}
			<DestinationCard
				href="/trips/create"
				title="Create New Trip"
				summary="Start planning your next adventure"
				gradientFrom="#4f46e5"
				gradientTo="#8b5cf6"
				emoji="🗺️"
				ctaText="Start Planning →"
			/>
		{:catch error}
			<p>error loading trips: {error.message}</p>
		{/await}
	</div>
</div>
