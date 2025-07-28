<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { countries, getFlagEmoji } from '$lib/utils.js';
	import { toast } from 'svelte-sonner';
	import type { FormTripData } from '../trip-form.types.js';

	export let data: Partial<FormTripData> = {};
	export let mode: 'create' | 'edit' = 'create';
</script>

<form
	method="POST"
	action={`${mode === 'edit' ? '?/createOrEditBasicInfo' : ''}`}
	id="basic-info-form"
	use:enhance={() => {
		return async ({ update, result }) => {
			console.log('Form result:', result);
			if (mode === 'edit') {
				if (result.type === 'success') {
					await update({ reset: false, invalidateAll: true });
					toast.success('Trip data saved successfully', { position: 'top-center' });
				} else {
					toast.error('Failed to save trip data', { position: 'top-center' });
				}
			} else {
				await update({ reset: false, invalidateAll: true });
			}
		};
	}}
>
	<div class="space-y-4">
		<div class="grid grid-cols-1 gap-4">
			<div class="space-y-2">
				<Label for="title">Trip Title</Label>
				<Input
					type="text"
					id="title"
					name="title"
					placeholder="Summer in Greece"
					bind:value={data.title}
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
					required
				/>
			</div>

			<div class="space-y-2">
				<Label for="destinationCountryCode">Country</Label>
				<select
					id="destinationCountryCode"
					name="destinationCountryCode"
					class="border-input bg-background w-full rounded-md border px-3 py-2"
					bind:value={data.destinationCountryCode}
					required
				>
					{#each countries as country}
						<option value={country.code}>
							{getFlagEmoji(country.code)}
							{country.name}
						</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="grid grid-cols-2 gap-4">
			<div class="space-y-2">
				<Label for="startDate">Start Date</Label>
				<Input type="date" id="startDate" name="startDate" bind:value={data.startDate} />
			</div>

			<div class="space-y-2">
				<Label for="endDate">End Date</Label>
				<Input type="date" id="endDate" name="endDate" bind:value={data.endDate} />
			</div>
		</div>

		<div class="space-y-2">
			<Label for="summary">Trip Summary</Label>
			<Textarea
				id="summary"
				name="summary"
				placeholder="Write a brief description of your trip..."
				bind:value={data.summary}
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
			/>
		</div>

		<div class="space-y-2">
			<Label for="accentColor">Accent Color</Label>
			<Input type="color" id="accentColor" name="accentColor" bind:value={data.accentColor} />
		</div>
	</div>
</form>
