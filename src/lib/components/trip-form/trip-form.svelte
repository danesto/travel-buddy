<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs/index.js';
	import Save from '@lucide/svelte/icons/save';
	import AlertCircle from '@lucide/svelte/icons/alert-circle';
	import { onMount } from 'svelte';
	import type { FormTripData, FormProps } from './trip-form.types.js';

	// Import form components
	import BasicInfoForm from './forms/basic-info-form.svelte';
	import ItineraryForm from './forms/itinerary-form.svelte';
	import ExpensesForm from './forms/expenses-form.svelte';
	import AccommodationsForm from './forms/accommodations-form.svelte';
	import TransportationForm from './forms/transportation-form.svelte';

	// Props
	let { defaultValues = {}, mode = 'create' }: FormProps = $props();

	// Form state with proper defaults
	let tripData: FormTripData = $state({
		slug: '',
		title: '',
		destination: '',
		summary: '',
		headerImage: null,
		destinationCountryCode: 'RS',
		startDate: null,
		accentColor: '#008000',
		endDate: null,
		itinerary: [],
		expenses: [],
		accommodations: [],
		transportation: [],
		...defaultValues
	});

	let activeTab = $state('basic-info');
	let originalData = $state<string>('');
	let isFormDirty = $state(false);

	// Initialize original data on mount
	onMount(() => {
		originalData = JSON.stringify(tripData);
	});

	// Watch for changes to determine if form is dirty
	$effect(() => {
		const currentData = JSON.stringify(tripData);
		isFormDirty = currentData !== originalData;
	});
</script>

<div
	class="mb-8 rounded-2xl {mode === 'edit'
		? 'border border-orange-500'
		: 'border border-black'} bg-white shadow-sm"
>
	<div class="p-8">
		<div class="mb-8 flex items-center justify-between">
			<div>
				<h2 class="mb-2 text-3xl font-bold text-gray-800">Trip Planning Form</h2>
				<p class="text-gray-600">Fill in the details for your upcoming adventure</p>

				{#if mode === 'edit'}
					{#if isFormDirty}
						<div class="mt-2 flex items-center gap-2 text-sm text-amber-600">
							<AlertCircle class="h-4 w-4" />
							<span>Unsaved changes</span>
						</div>
					{/if}
				{/if}
			</div>

			<div class="flex items-center gap-4">
				{#if mode === 'create'}
					<Button
						type="submit"
						class="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
						form="basic-info-form"
					>
						<Save class="mr-2 h-4 w-4" />
						Create Trip
					</Button>
				{:else}
					<Button
						type="submit"
						form="{activeTab}-form"
						class="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700"
					>
						{#if isFormDirty}
							<AlertCircle class="mr-2 h-4 w-4" />
							Save Trip
						{:else}
							<Save class="mr-2 h-4 w-4" />
							Save Trip
						{/if}
					</Button>
				{/if}
			</div>
		</div>

		<Tabs bind:value={activeTab} class="w-full">
			<TabsList class="mb-8 grid w-full grid-cols-5 [&>button]:cursor-pointer">
				<TabsTrigger value="basic-info">Basic Info</TabsTrigger>
				<TabsTrigger value="itinerary" disabled={mode === 'create'}>Itinerary</TabsTrigger>
				<TabsTrigger value="expenses" disabled={mode === 'create'}>Expenses</TabsTrigger>
				<TabsTrigger value="accommodations" disabled={mode === 'create'}>Accommodations</TabsTrigger
				>
				<TabsTrigger value="transportation" disabled={mode === 'create'}>Transportation</TabsTrigger
				>
			</TabsList>

			<TabsContent value="basic-info">
				<BasicInfoForm data={tripData} {mode} />
			</TabsContent>

			<TabsContent value="itinerary">
				<ItineraryForm data={tripData.itinerary} tripId={tripData.id} />
			</TabsContent>

			<TabsContent value="expenses">
				<ExpensesForm data={tripData.expenses} />
			</TabsContent>

			<TabsContent value="accommodations">
				<AccommodationsForm data={tripData.accommodations} />
			</TabsContent>

			<TabsContent value="transportation">
				<TransportationForm data={tripData.transportation} />
			</TabsContent>
		</Tabs>
	</div>
</div>
