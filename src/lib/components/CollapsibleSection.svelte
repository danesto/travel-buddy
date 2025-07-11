<script>
	let { title, icon, isCollapsed = false, children } = $props();

	function toggleCollapse() {
		isCollapsed = !isCollapsed;
	}
</script>

<div class="mb-8 rounded-2xl border bg-white p-8">
	<div class="mb-6 flex items-center gap-10">
		<h2 class="text-2xl font-bold text-gray-800">
			{#if icon}{icon}{/if}
			{title}
		</h2>
		<button
			class="flex items-center gap-1 text-sm text-gray-600 transition-colors duration-200 hover:text-gray-800"
			onclick={toggleCollapse}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="size-5 transition-transform duration-200"
				class:rotate-180={isCollapsed}
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
			</svg>
			{isCollapsed ? 'Expand' : 'Collapse'}
		</button>
	</div>

	{#if !isCollapsed}
		<div class="transition-all duration-300 ease-in-out">
			{@render children()}
		</div>
	{/if}
</div>
