<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Plus from '@lucide/svelte/icons/plus';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import type { FormTransportation } from '../trip-form.types.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		change: { data: FormTransportation[] };
	}>();

	// Default empty item
	const emptyItem: FormTransportation = {
		type: 'Flight',
		route: '',
		date: '',
		time: '',
		provider: '',
		cost: '',
		currency: 'EUR'
	};

	// Props with default value ensuring at least one item
	const { data } = $props<{ data?: FormTransportation[] }>();
	let formData = $state(data.length ? [...data] : [{ ...emptyItem }]);

	// Watch for changes and dispatch them
	$effect(() => {
		dispatch('change', { data: formData });
	});

	function addTransportationItem() {
		formData = [...formData, { ...emptyItem }];
	}

	function removeTransportationItem(index: number) {
		// Only remove if there's more than one item
		if (formData.length > 1) {
			formData = formData.filter((_: FormTransportation, i: number) => i !== index);
		}
	}

	const transportationTypes = ['Flight', 'Car Rental', 'Train', 'Bus', 'Ferry', 'Other'];
	const currencies = ['EUR', 'USD', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];
</script>

<div class="space-y-6">
	{#each formData as transport, index}
		<div class="rounded-lg border p-4">
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-lg font-semibold">Transportation {index + 1}</h3>
				{#if formData.length > 1}
					<Button
						type="button"
						variant="destructive"
						size="sm"
						onclick={() => removeTransportationItem(index)}
					>
						<Trash2 class="h-4 w-4" />
					</Button>
				{/if}
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="type-{index}">Type</Label>
					<select
						id="type-{index}"
						name="transportation[{index}].type"
						class="w-full rounded-md border border-input bg-background px-3 py-2"
						bind:value={transport.type}
						required
					>
						{#each transportationTypes as type}
							<option value={type}>{type}</option>
						{/each}
					</select>
				</div>

				<div class="space-y-2">
					<Label for="provider-{index}">Provider</Label>
					<Input
						type="text"
						id="provider-{index}"
						name="transportation[{index}].provider"
						placeholder="Airline / Car Rental Company"
						bind:value={transport.provider}
					/>
				</div>
			</div>

			<div class="mt-4 space-y-2">
				<Label for="route-{index}">Route / Details</Label>
				<Input
					type="text"
					id="route-{index}"
					name="transportation[{index}].route"
					placeholder="London (LHR) → Santorini (JTR)"
					bind:value={transport.route}
					required
				/>
			</div>

			<div class="mt-4 grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="date-{index}">Date</Label>
					<Input
						type="date"
						id="date-{index}"
						name="transportation[{index}].date"
						bind:value={transport.date}
					/>
				</div>

				<div class="space-y-2">
					<Label for="time-{index}">Time</Label>
					<Input
						type="text"
						id="time-{index}"
						name="transportation[{index}].time"
						placeholder="06:30 - 12:45"
						bind:value={transport.time}
					/>
				</div>
			</div>

			{#if transport.type === 'Car Rental'}
				<div class="mt-4 grid grid-cols-2 gap-4">
					<div class="space-y-2">
						<Label for="pickupDate-{index}">Pickup Date</Label>
						<Input
							type="date"
							id="pickupDate-{index}"
							name="transportation[{index}].pickupDate"
							bind:value={transport.pickupDate}
						/>
					</div>

					<div class="space-y-2">
						<Label for="returnDate-{index}">Return Date</Label>
						<Input
							type="date"
							id="returnDate-{index}"
							name="transportation[{index}].returnDate"
							bind:value={transport.returnDate}
						/>
					</div>
				</div>

				<div class="mt-4 space-y-2">
					<Label for="vehicle-{index}">Vehicle</Label>
					<Input
						type="text"
						id="vehicle-{index}"
						name="transportation[{index}].vehicle"
						placeholder="Fiat Panda"
						bind:value={transport.vehicle}
					/>
				</div>
			{/if}

			<div class="mt-4 grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="cost-{index}">Cost</Label>
					<Input
						type="number"
						id="cost-{index}"
						name="transportation[{index}].cost"
						placeholder="0.00"
						step="0.01"
						min="0"
						bind:value={transport.cost}
					/>
				</div>

				<div class="space-y-2">
					<Label for="currency-{index}">Currency</Label>
					<select
						id="currency-{index}"
						name="transportation[{index}].currency"
						class="w-full rounded-md border border-input bg-background px-3 py-2"
						bind:value={transport.currency}
						required
					>
						{#each currencies as currency}
							<option value={currency}>{currency}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
	{/each}

	<Button type="button" variant="outline" class="w-full" onclick={addTransportationItem}>
		<Plus class="mr-2 h-4 w-4" />
		Add Transportation
	</Button>
</div> 