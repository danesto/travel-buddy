<script>
	import DestinationCard from '$lib/components/destination-card.svelte';
</script>

<!-- Featured Destinations Section -->
<section class="mx-auto max-w-7xl px-4 py-10">
	<div class="mb-12 text-center">
		<h2 class="mb-4 font-serif text-4xl font-bold text-gray-800">Featured Destinations</h2>
		<p class="mx-auto max-w-2xl text-lg text-gray-600">
			Discover breathtaking locations around the world, carefully curated for your next adventure
		</p>
	</div>

	<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
		<DestinationCard
			title="Tropical Paradise"
			summary="Discover pristine beaches and crystal-clear waters in exotic locations around the world."
			emoji="🏖️"
			gradientFrom="#60A5FA"
			gradientTo="#06B6D4"
		/>

		<DestinationCard
			title="Mountain Adventures"
			summary="Experience breathtaking peaks, hiking trails, and alpine adventures in stunning mountain ranges."
			emoji="🏔️"
			gradientFrom="#38BDF8"
			gradientTo="#3B82F6"
		/>

		<DestinationCard
			title="Cultural Cities"
			summary="Immerse yourself in rich history, vibrant cultures, and amazing architecture in world-class cities."
			emoji="🏛️"
			gradientFrom="#06B6D4"
			gradientTo="#0EA5E9"
		/>
	</div>
</section>
