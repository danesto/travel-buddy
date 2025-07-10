<script>
	let { title, description, emoji, gradientFrom, gradientTo, ctaText = undefined } = $props();

	let ctaLabel = ctaText ?? `Explore ${title.toLowerCase()} →`;

	const slug = title.toLowerCase().replace(/ /g, '-');
</script>

<a
	href={`/trips/${slug}`}
	class="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all
		hover:shadow-xl hover:outline-2 hover:outline-cyan-500
	"
>
	<div
		class="flex h-48 w-full items-center justify-center"
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
			<div class="font-medium text-cyan-600 transition-colors group-hover:text-cyan-800">
				{ctaLabel}
			</div>
		</div>
	</div>
</a>
