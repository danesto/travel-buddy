<script>
	let { title, description, emoji, gradientFrom, gradientTo } = $props();
</script>

<div
	class="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
>
	<div
		class="flex h-48 items-center justify-center"
		style="background: linear-gradient(to bottom right, {gradientFrom}, {gradientTo})"
	>
		<div class="text-center text-white">
			<div class="mb-2 text-6xl">{emoji}</div>
			<h3 class="text-xl font-semibold">{title}</h3>
		</div>
	</div>
	<div class="p-6">
		<p class="mb-4 text-gray-600">{description}</p>
		<div class="font-medium text-cyan-600 transition-colors group-hover:text-cyan-800">
			Explore {title.toLowerCase()} destinations →
		</div>
	</div>
</div>
