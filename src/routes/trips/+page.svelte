<script>
	import DestinationCard from '$lib/components/destination-card.svelte';

	const trips = [
		{
			title: 'Copenhagen City Trip',
			description: 'Discover the beautiful city of Copenhagen, Denmark',
			emoji: '🇩🇰',
			gradientFrom: '#06B6D4',
			gradientTo: '#06B6D4'
		},
		{
			title: 'Berlin City Trip',
			description: 'Discover the beautiful city of Berlin, Germany',
			emoji: '🇩🇪',
			gradientFrom: '#06B6D4',
			gradientTo: '#06B6D4'
		},
		{
			title: 'New Trip?',
			description: 'Click to start planning your next trip or to add previous ones!',
			emoji: '+ 🚀❔',
			gradientFrom: '#008000',
			gradientTo: '#008000',
			ctaText: 'Create New Trip'
		}
	];
</script>

<div class="max-w-7xl px-4">
	<div class="mb-12">
		<h1 class="mb-4 font-serif text-4xl font-bold text-gray-800">My Trips</h1>
		<p class="text-lg text-gray-600">Here you can see all of your upcoming or previous trips</p>
	</div>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-4">
		{#each trips as trip}
			<DestinationCard {...trip} />
		{/each}
	</div>

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
</div>
