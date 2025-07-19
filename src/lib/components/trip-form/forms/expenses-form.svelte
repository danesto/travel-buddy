<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import Plus from '@lucide/svelte/icons/plus';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import type { FormExpense } from '../trip-form.types.js';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{
		change: { data: FormExpense[] };
	}>();

	// Default empty item
	const emptyItem: FormExpense = {
		category: '',
		description: '',
		amount: '',
		currency: 'EUR'
	};

	// Props with default value ensuring at least one item
	const { data } = $props<{ data?: FormExpense[] }>();
	let formData = $state(data.length ? [...data] : [{ ...emptyItem }]);

	// Watch for changes and dispatch them
	$effect(() => {
		dispatch('change', { data: formData });
	});

	function addExpenseItem() {
		formData = [...formData, { ...emptyItem }];
	}

	function removeExpenseItem(index: number) {
		// Only remove if there's more than one item
		if (formData.length > 1) {
			formData = formData.filter((_: FormExpense, i: number) => i !== index);
		}
	}

	const expenseCategories = [
		'Accommodation',
		'Flights',
		'Transportation',
		'Food & Dining',
		'Activities',
		'Shopping',
		'Other'
	];

	const currencies = ['EUR', 'USD', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR'];
</script>

<div class="space-y-6">
	{#each formData as expense, index}
		<div class="rounded-lg border p-4">
			<div class="mb-4 flex items-center justify-between">
				<h3 class="text-lg font-semibold">Expense {index + 1}</h3>
				{#if formData.length > 1}
					<Button
						type="button"
						variant="destructive"
						size="sm"
						onclick={() => removeExpenseItem(index)}
					>
						<Trash2 class="h-4 w-4" />
					</Button>
				{/if}
			</div>

			<div class="grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="category-{index}">Category</Label>
					<select
						id="category-{index}"
						name="expenses[{index}].category"
						class="border-input bg-background w-full rounded-md border px-3 py-2"
						bind:value={expense.category}
						required
					>
						<option value="">Select a category</option>
						{#each expenseCategories as category}
							<option value={category}>{category}</option>
						{/each}
					</select>
				</div>

				<div class="space-y-2">
					<Label for="description-{index}">Description</Label>
					<Input
						type="text"
						id="description-{index}"
						name="expenses[{index}].description"
						placeholder="Hotel stay for 3 nights"
						bind:value={expense.description}
						required
					/>
				</div>
			</div>

			<div class="mt-4 grid grid-cols-2 gap-4">
				<div class="space-y-2">
					<Label for="amount-{index}">Amount</Label>
					<Input
						type="number"
						id="amount-{index}"
						name="expenses[{index}].amount"
						placeholder="0.00"
						step="0.01"
						min="0"
						bind:value={expense.amount}
						required
					/>
				</div>

				<div class="space-y-2">
					<Label for="currency-{index}">Currency</Label>
					<select
						id="currency-{index}"
						name="expenses[{index}].currency"
						class="border-input bg-background w-full rounded-md border px-3 py-2"
						bind:value={expense.currency}
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

	<Button type="button" variant="outline" class="w-full" onclick={addExpenseItem}>
		<Plus class="mr-2 h-4 w-4" />
		Add Expense
	</Button>
</div>
