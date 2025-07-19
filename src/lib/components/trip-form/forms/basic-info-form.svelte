<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { countries, getFlagEmoji } from '$lib/utils.js';
	import type { FormTripData } from '../trip-form.types.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		change: { data: Partial<FormTripData> };
	}>();

	export let data: Partial<FormTripData> = {};
	export let mode: 'create' | 'edit' = 'create';

	// Watch for changes and dispatch them
	function handleChange() {
		dispatch('change', { data });
	}
</script>

<div class="space-y-4">
	<div class="grid grid-cols-2 gap-4">
		<div class="space-y-2">
			<Label for="title">Trip Title</Label>
			<Input
				type="text"
				id="title"
				name="title"
				placeholder="Summer in Greece"
				bind:value={data.title}
				oninput={handleChange}
				required
			/>
		</div>

		<div class="space-y-2">
			<Label for="slug">URL Slug</Label>
			<Input
				type="text"
				id="slug"
				name="slug"
				placeholder="summer-in-greece"
				bind:value={data.slug}
				oninput={handleChange}
				required
			/>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<div class="space-y-2">
			<Label for="destination">Destination</Label>
			<Input
				type="text"
				id="destination"
				name="destination"
				placeholder="Santorini, Greece"
				bind:value={data.destination}
				oninput={handleChange}
				required
			/>
		</div>

		<div class="space-y-2">
			<Label for="destinationCountryCode">Country</Label>
			<select
				id="destinationCountryCode"
				name="destinationCountryCode"
				class="w-full rounded-md border border-input bg-background px-3 py-2"
				bind:value={data.destinationCountryCode}
				onchange={handleChange}
				required
			>
				{#each countries as country}
					<option value={country.code}>
						{getFlagEmoji(country.code)} {country.name}
					</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="grid grid-cols-2 gap-4">
		<div class="space-y-2">
			<Label for="startDate">Start Date</Label>
			<Input
				type="date"
				id="startDate"
				name="startDate"
				bind:value={data.startDate}
				oninput={handleChange}
			/>
		</div>

		<div class="space-y-2">
			<Label for="endDate">End Date</Label>
			<Input
				type="date"
				id="endDate"
				name="endDate"
				bind:value={data.endDate}
				oninput={handleChange}
			/>
		</div>
	</div>

	<div class="space-y-2">
		<Label for="summary">Trip Summary</Label>
		<Textarea
			id="summary"
			name="summary"
			placeholder="Write a brief description of your trip..."
			bind:value={data.summary}
			oninput={handleChange}
			required
		/>
	</div>

	<div class="space-y-2">
		<Label for="headerImage">Header Image URL</Label>
		<Input
			type="text"
			id="headerImage"
			name="headerImage"
			placeholder="https://example.com/image.jpg"
			bind:value={data.headerImage}
			oninput={handleChange}
		/>
	</div>

	<div class="space-y-2">
		<Label for="accentColor">Accent Color</Label>
		<Input
			type="color"
			id="accentColor"
			name="accentColor"
			bind:value={data.accentColor}
			oninput={handleChange}
		/>
	</div>
</div> 