<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import Plus from '@lucide/svelte/icons/plus';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import type { FormItineraryItem } from '../trip-form.types.js';
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';

	const dispatch = createEventDispatcher<{
		change: { data: FormItineraryItem[] };
	}>();

	// Default empty item
	const emptyItem: FormItineraryItem = {
		id: undefined, // use undefined for new items
		day: '',
		date: '',
		location: '',
		activities: [
			{
				name: '',
				itineraryItemId: 0,
				order: 0
			}
		],
		highlights: ''
	};

	// Props with default value ensuring at least one item
	let { data, tripId } = $props<{ data?: FormItineraryItem[]; tripId?: number }>();
	let formData = $state([...data, { ...emptyItem }]);

	console.log('data', data);

	// Watch for changes and dispatch them
	$effect(() => {
		dispatch('change', { data: formData });
	});

	function addItineraryItem() {
		formData = [...formData, { ...emptyItem }];
	}

	function removeItineraryItem(index: number) {
		// Only remove if there's more than one item
		if (formData.length > 1) {
			formData = formData.filter((_: FormItineraryItem, i: number) => i !== index);
		}
	}

	function addActivity(dayIndex: number) {
		formData[dayIndex].activities = [
			...formData[dayIndex].activities,
			{
				name: '',
				itineraryItemId: 0,
				order: formData[dayIndex].activities.length // set order to next index
			}
		];
	}

	function removeActivity(dayIndex: number, activityIndex: number) {
		// Only remove if there's more than one activity
		if (formData[dayIndex].activities.length > 1) {
			formData[dayIndex].activities = formData[dayIndex].activities.filter(
				(_: any, i: number) => i !== activityIndex
			);
		}
	}
</script>

<!-- TODO: Think of submittin the data as an array of objects stored inside the hidden input -->
<form
	method="POST"
	action="?/createOrEditItinerary"
	id="itinerary-form"
	use:enhance={() => {
		return async ({ update, result }) => {
			console.log('Form result:', result);
			if (result.type === 'success') {
				await update({ reset: false, invalidateAll: true });
				toast.success('Itinerary saved successfully', { position: 'top-center' });
			} else {
				toast.error('Failed to save itinerary', { position: 'top-center' });
			}
		};
	}}
>
	<div class="space-y-6">
		{#each formData as item, dayIndex}
			<div class="rounded-lg border p-4">
				<div class="mb-4 flex items-center justify-between">
					<h3 class="text-lg font-semibold">Day {dayIndex + 1}</h3>
					{#if formData.length > 1}
						<Button
							type="button"
							variant="destructive"
							size="sm"
							onclick={() => removeItineraryItem(dayIndex)}
						>
							<Trash2 class="h-4 w-4" />
						</Button>
					{/if}
				</div>
				<input type="hidden" name="itinerary[{dayIndex}].id" value={item.id} />
				<div class="grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="day-{dayIndex}">Day Label</Label>
						<Input
							type="text"
							id="day-{dayIndex}"
							name="itinerary[{dayIndex}].day"
							placeholder="Day 1"
							bind:value={item.day}
							required
						/>
					</div>

					<div class="space-y-2">
						<Label for="date-{dayIndex}">Date</Label>
						<Input
							type="text"
							id="date-{dayIndex}"
							name="itinerary[{dayIndex}].date"
							placeholder="June 15"
							bind:value={item.date}
							required
						/>
					</div>
				</div>

				<div class="mt-4 space-y-2">
					<Label for="location-{dayIndex}">Location</Label>
					<Input
						type="text"
						id="location-{dayIndex}"
						name="itinerary[{dayIndex}].location"
						placeholder="Fira, Santorini"
						bind:value={item.location}
						required
					/>
				</div>

				<div class="mt-4 space-y-4">
					<Label>Activities</Label>
					{#each item.activities as activity, activityIndex}
						<div class="flex items-center gap-2">
							<Input
								type="text"
								name="itinerary[{dayIndex}].activities[{activityIndex}].name"
								placeholder="Visit the Caldera"
								bind:value={item.activities[activityIndex].name}
								required
							/>
							{#if item.activities.length > 1}
								<Button
									type="button"
									variant="destructive"
									size="sm"
									onclick={() => removeActivity(dayIndex, activityIndex)}
								>
									<Trash2 class="h-4 w-4" />
								</Button>
							{/if}
						</div>
					{/each}
					<Button type="button" variant="outline" size="sm" onclick={() => addActivity(dayIndex)}>
						<Plus class="mr-2 h-4 w-4" />
						Add Activity
					</Button>
				</div>

				<div class="mt-4 space-y-2">
					<Label for="highlights-{dayIndex}">Highlights</Label>
					<Textarea
						id="highlights-{dayIndex}"
						name="itinerary[{dayIndex}].highlights"
						placeholder="Special moments or notes for the day..."
						bind:value={item.highlights}
					/>
				</div>
			</div>
		{/each}

		<input type="hidden" name="tripId" value={tripId} />

		<Button type="button" variant="outline" class="w-full" onclick={addItineraryItem}>
			<Plus class="mr-2 h-4 w-4" />
			Add Day
		</Button>
	</div>
</form>
