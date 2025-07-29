<script lang="ts">
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	let location = '';
	let date = '';
	let guests = 1;
	let loading = false;
	let flexible = false;

	import { enhance } from '$app/forms';
</script>

<form
	class="w-full max-w-5xl"
	method="POST"
	use:enhance={() => {
		loading = true;
		return async ({ result }) => {
			loading = false;
			if (result.type === 'success') {
				goto(`/trips/${result.data?.slug}`);
			} else {
				toast.error(result.status?.toString() || 'AI suggestion failed', {
					position: 'top-center'
				});
			}
		};
	}}
>
	<div class="flex items-center rounded-4xl bg-white p-3 shadow-2xl">
		<input
			type="text"
			placeholder="Where to?"
			class="flex-1 border-none bg-transparent p-4 text-lg focus:ring-0 focus:outline-none"
			bind:value={location}
			name="location"
			required
		/>
		<div class="mx-2 h-12 w-px bg-gray-300"></div>
		<input
			type="date"
			placeholder="When?"
			class="flex-1 border-none bg-transparent p-4 text-lg focus:ring-0 focus:outline-none"
			bind:value={date}
			name="date"
			required
		/>
		<div class="mx-2 h-12 w-px bg-gray-300"></div>
		<input
			type="number"
			placeholder="Guests"
			class="flex-1 border-none bg-transparent p-4 text-lg focus:ring-0 focus:outline-none"
			bind:value={guests}
			min="1"
			name="guests"
			required
		/>
		<div class="mx-2 h-12 w-px bg-gray-300"></div>
		<label class="flex items-center gap-2 text-sm text-gray-600">
			<input type="checkbox" bind:checked={flexible} name="flexible" /> Flexible
		</label>
		<button
			type="submit"
			class="cursor-pointer rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:from-sky-600 hover:to-blue-700 hover:shadow-lg disabled:opacity-60"
			disabled={loading}
		>
			{loading ? 'Searching...' : 'Search'}
		</button>
	</div>
</form>
