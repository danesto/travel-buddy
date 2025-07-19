<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Plus from '@lucide/svelte/icons/plus';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import type { FormAccommodation } from '../trip-form.types.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		change: { data: FormAccommodation[] };
	}>();

	const { data } = $props<{ data?: FormAccommodation[] }>();
    
	const emptyItem: FormAccommodation = {
        name: '',
		type: '',
		location: '',
		checkIn: '',
		checkOut: '',
		roomType: '',
		amenities: [''],
		totalCost: '',
		currency: 'EUR'
	}
    
    let formData = $state(data.length ? [...data] : [{ ...emptyItem }]);
    
	function addAccommodationItem() {
		formData = [
			...formData,
			{
				name: '',
				type: '',
				location: '',
				checkIn: '',
				checkOut: '',
				roomType: '',
				amenities: [''],
				totalCost: '',
				currency: 'EUR'
			}
		];
		dispatch('change', { data });
	}

	function removeAccommodationItem(index: number) {
		formData = formData.filter((_, i) => i !== index);
		dispatch('change', { data });
	}

	function addAmenity(accommodationIndex: number) {
		formData[accommodationIndex].amenities = [...formData[accommodationIndex].amenities, ''];
		dispatch('change', { data });
	}

	function removeAmenity(accommodationIndex: number, amenityIndex: number) {
		formData[accommodationIndex].amenities = formData[accommodationIndex].amenities.filter(
			(_: string, i: number) => i !== amenityIndex
		);
		dispatch('change', { data });
	}

	function handleChange() {
		dispatch('change', { data: formData });
	}

	const accommodationTypes = [
		'Luxury Resort',
		'Hotel',
		'Boutique Hotel',
		'Apartment',
		'Villa',
		'Hostel',
		'Guesthouse',
		'Other'
	];

	const currencies = ['EUR', 'USD', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];
</script>

<div class="space-y-6">
	{#each formData as accommodation, index}
		<div class="rounded-lg border p-4">
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-lg font-semibold">Accommodation {index + 1}</h3>
				{#if index > 0}
					<Button
						type="button"
						variant="destructive"
						size="sm"
						onclick={() => removeAccommodationItem(index)}
					>
						<Trash2 class="h-4 w-4" />
					</Button>
				{/if}
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="name-{index}">Name</Label>
					<Input
						type="text"
						id="name-{index}"
						name="accommodations[{index}].name"
						placeholder="Santorini Palace Hotel"
						bind:value={accommodation.name}
						oninput={handleChange}
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="type-{index}">Type</Label>
					<select
						id="type-{index}"
						name="accommodations[{index}].type"
						class="border-input bg-background w-full rounded-md border px-3 py-2"
						bind:value={accommodation.type}
						onchange={handleChange}
						required
					>
						<option value="">Select a type</option>
						{#each accommodationTypes as type}
							<option value={type}>{type}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="mt-4 space-y-2">
				<Label for="location-{index}">Location</Label>
				<Input
					type="text"
					id="location-{index}"
					name="accommodations[{index}].location"
					placeholder="Fira, Santorini"
					bind:value={accommodation.location}
					oninput={handleChange}
					required
				/>
			</div>

			<div class="mt-4 grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="checkIn-{index}">Check-in Date</Label>
					<Input
						type="date"
						id="checkIn-{index}"
						name="accommodations[{index}].checkIn"
						bind:value={accommodation.checkIn}
						oninput={handleChange}
					/>
				</div>

				<div class="space-y-2">
					<Label for="checkOut-{index}">Check-out Date</Label>
					<Input
						type="date"
						id="checkOut-{index}"
						name="accommodations[{index}].checkOut"
						bind:value={accommodation.checkOut}
						oninput={handleChange}
					/>
				</div>
			</div>

			<div class="mt-4 space-y-2">
				<Label for="roomType-{index}">Room Type</Label>
				<Input
					type="text"
					id="roomType-{index}"
					name="accommodations[{index}].roomType"
					placeholder="Deluxe Double Room with Sea View"
					bind:value={accommodation.roomType}
					oninput={handleChange}
				/>
			</div>

			<div class="mt-4 grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="totalCost-{index}">Total Cost</Label>
					<Input
						type="number"
						id="totalCost-{index}"
						name="accommodations[{index}].totalCost"
						placeholder="0.00"
						step="0.01"
						min="0"
						bind:value={accommodation.totalCost}
						oninput={handleChange}
					/>
				</div>

				<div class="space-y-2">
					<Label for="currency-{index}">Currency</Label>
					<select
						id="currency-{index}"
						name="accommodations[{index}].currency"
						class="w-full rounded-md border border-input bg-background px-3 py-2"
						bind:value={accommodation.currency}
						onchange={handleChange}
						required
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>
				</div>
			</div>

			<div class="mt-4 space-y-4">
				<Label>Amenities</Label>
				{#each accommodation.amenities as amenity, amenityIndex}
					<div class="flex items-center gap-2">
						<Input
							type="text"
							name="accommodations[{index}].amenities[{amenityIndex}]"
							placeholder="Infinity Pool"
							bind:value={accommodation.amenities[amenityIndex]}
							oninput={handleChange}
							required
						/>
						{#if amenityIndex > 0}
							<Button
								type="button"
								variant="destructive"
								size="sm"
								onclick={() => removeAmenity(index, amenityIndex)}
							>
								<Trash2 class="h-4 w-4" />
							</Button>
						{/if}
					</div>
				{/each}
				<Button type="button" variant="outline" size="sm" onclick={() => addAmenity(index)}>
					<Plus class="mr-2 h-4 w-4" />
					Add Amenity
				</Button>
			</div>
		</div>
	{/each}

	<Button type="button" variant="outline" class="w-full" onclick={addAccommodationItem}>
		<Plus class="mr-2 h-4 w-4" />
		Add Accommodation
	</Button>
</div> 