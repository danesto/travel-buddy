<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card/index.js';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs/index.js';

	import Plus from '@lucide/svelte/icons/plus';
	import Trash2 from '@lucide/svelte/icons/trash-2';
	import MapPin from '@lucide/svelte/icons/map-pin';
	import Calendar from '@lucide/svelte/icons/calendar';
	import DollarSign from '@lucide/svelte/icons/dollar-sign';
	import Building from '@lucide/svelte/icons/building';
	import Plane from '@lucide/svelte/icons/plane';
	import Save from '@lucide/svelte/icons/save';
	import AlertCircle from '@lucide/svelte/icons/alert-circle';

	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import type {
		FormItineraryItem,
		FormExpense,
		FormAccommodation,
		FormTransportation,
		FormTripData,
		FormProps
	} from './trip-form.types.js';

	// Props
	let { defaultValues = {}, mode = 'create' }: FormProps = $props();

	// Form state with proper defaults
	let tripData: FormTripData = {
		slug: '',
		title: '',
		destination: '',
		summary: '',
		headerImage: null,
		destinationCountryCode: 'SR',
		startDate: null,
		gradientFrom: '#008000',
		gradientTo: '#008000',
		endDate: null,
		itinerary: [],
		expenses: [],
		accommodations: [],
		transportation: [],
		...defaultValues
	};

	let activeTab = $state('basic');
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

	// Dynamic arrays for form sections
	let itineraryFormItems: FormItineraryItem[] = $state(
		tripData.itinerary.length > 0
			? tripData.itinerary
			: [{ day: '', date: '', location: '', activities: [''], highlights: '' }]
	);

	let expenseFormItems: FormExpense[] = $state(
		tripData.expenses.length > 0
			? tripData.expenses
			: [{ category: '', description: '', amount: '', currency: 'EUR' }]
	);

	let accommodationFormItems: FormAccommodation[] = $state(
		tripData.accommodations.length > 0
			? tripData.accommodations
			: [
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
				]
	);

	let transportationFormItems: FormTransportation[] = $state(
		tripData.transportation.length > 0
			? tripData.transportation
			: [{ type: 'Flight', route: '', date: '', time: '', provider: '', cost: '', currency: 'EUR' }]
	);

	// Helper functions
	function addItineraryItem() {
		itineraryFormItems = [
			...itineraryFormItems,
			{ day: '', date: '', location: '', activities: [''], highlights: '' }
		];
	}

	function removeItineraryItem(index: number) {
		itineraryFormItems = itineraryFormItems.filter((_: any, i: number) => i !== index);
	}

	function addActivity(dayIndex: number) {
		itineraryFormItems[dayIndex].activities = [...itineraryFormItems[dayIndex].activities, ''];
	}

	function removeActivity(dayIndex: number, activityIndex: number) {
		itineraryFormItems[dayIndex].activities = itineraryFormItems[dayIndex].activities.filter(
			(_: any, i: number) => i !== activityIndex
		);
	}

	function addExpenseItem() {
		expenseFormItems = [
			...expenseFormItems,
			{ category: '', description: '', amount: '', currency: 'EUR' }
		];
	}

	function removeExpenseItem(index: number) {
		expenseFormItems = expenseFormItems.filter((_: any, i: number) => i !== index);
	}

	function addAccommodationItem() {
		accommodationFormItems = [
			...accommodationFormItems,
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
	}

	function removeAccommodationItem(index: number) {
		accommodationFormItems = accommodationFormItems.filter((_: any, i: number) => i !== index);
	}

	function addAmenity(hotelIndex: number) {
		accommodationFormItems[hotelIndex].amenities = [
			...accommodationFormItems[hotelIndex].amenities,
			''
		];
	}

	function removeAmenity(hotelIndex: number, amenityIndex: number) {
		accommodationFormItems[hotelIndex].amenities = accommodationFormItems[
			hotelIndex
		].amenities.filter((_: any, i: number) => i !== amenityIndex);
	}

	function addTransportationItem() {
		transportationFormItems = [
			...transportationFormItems,
			{ type: 'Flight', route: '', date: '', time: '', provider: '', cost: '', currency: 'EUR' }
		];
	}

	function removeTransportationItem(index: number) {
		transportationFormItems = transportationFormItems.filter((_: any, i: number) => i !== index);
	}
</script>

<form
	method="POST"
	use:enhance={() => {
		return async ({ update }) => {
			update({ reset: false });
		};
	}}
>
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
						>
							<Save class="mr-2 h-4 w-4" />
							Create Trip
						</Button>
					{:else}
						<Button
							type="submit"
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
				<TabsList class="mb-8 grid w-full grid-cols-5">
					<TabsTrigger value="basic" class="flex cursor-pointer items-center gap-2">
						<MapPin class="h-4 w-4" />
						Basic Info
					</TabsTrigger>
					<TabsTrigger
						value="itinerary"
						class="flex cursor-pointer items-center gap-2"
						disabled={mode === 'create'}
					>
						<Calendar class="h-4 w-4" />
						Itinerary
					</TabsTrigger>
					<TabsTrigger
						value="expenses"
						class="flex cursor-pointer items-center gap-2"
						disabled={mode === 'create'}
					>
						<DollarSign class="h-4 w-4" />
						Expenses
					</TabsTrigger>
					<TabsTrigger
						value="accommodations"
						class="flex cursor-pointer items-center gap-2"
						disabled={mode === 'create'}
					>
						<Building class="h-4 w-4" />
						Hotels
					</TabsTrigger>
					<TabsTrigger
						value="transportation"
						class="flex cursor-pointer items-center gap-2"
						disabled={mode === 'create'}
					>
						<Plane class="h-4 w-4" />
						Transport
					</TabsTrigger>
				</TabsList>

				<!-- Basic Information Tab -->
				<TabsContent value="basic" class="space-y-6">
					<Card>
						<CardHeader>
							<CardTitle>Basic Trip Information</CardTitle>
							<CardDescription>Enter the main details about your trip</CardDescription>
						</CardHeader>
						<CardContent class="space-y-4">
							<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div class="space-y-2">
									<Label for="title">Trip Title</Label>
									<Input
										id="title"
										name="title"
										bind:value={tripData.title}
										placeholder="Amazing Journey to..."
										required={mode === 'create'}
									/>
								</div>
								<div class="space-y-2">
									<Label for="destination">Destination</Label>
									<Input
										id="destination"
										name="destination"
										bind:value={tripData.destination}
										placeholder="Santorini, Greece"
										required={mode === 'create'}
									/>
								</div>
							</div>
							<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
								<div class="space-y-2">
									<Label for="startDate">Start Date</Label>
									<Input
										id="startDate"
										name="startDate"
										type="date"
										bind:value={tripData.startDate}
									/>
								</div>
								<div class="space-y-2">
									<Label for="endDate">End Date</Label>
									<Input id="endDate" name="endDate" type="date" bind:value={tripData.endDate} />
								</div>
							</div>
							<div class="space-y-2">
								<Label for="headerImage">Header Image URL</Label>
								<Input
									id="headerImage"
									name="headerImage"
									bind:value={tripData.headerImage}
									placeholder="https://..."
								/>
							</div>
							<div class="space-y-2">
								<Label for="summary">Trip Summary</Label>
								<Textarea
									id="summary"
									name="summary"
									bind:value={tripData.summary}
									placeholder="Brief description of your trip..."
									rows={3}
								/>
							</div>

							<!-- Hidden fields for additional trip data -->
							<input
								type="hidden"
								name="destinationCountryCode"
								bind:value={tripData.destinationCountryCode}
							/>
							<input type="hidden" name="gradientFrom" bind:value={tripData.gradientFrom} />
							<input type="hidden" name="gradientTo" bind:value={tripData.gradientTo} />
						</CardContent>
					</Card>
				</TabsContent>

				{#if mode === 'edit'}
					<!-- Itinerary Tab -->
					<TabsContent value="itinerary" class="space-y-6">
						<div class="flex items-center justify-between">
							<div>
								<h3 class="text-lg font-semibold">Day-by-Day Itinerary</h3>
								<p class="text-sm text-gray-600">Plan your daily activities and highlights</p>
							</div>
							<Button onclick={addItineraryItem} variant="outline" size="sm">
								<Plus class="mr-2 h-4 w-4" />
								Add Day
							</Button>
						</div>

						{#each itineraryFormItems as item, index}
							<Card>
								<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle class="text-base">Day {index + 1}</CardTitle>
									{#if itineraryFormItems.length > 1}
										<Button variant="outline" size="sm" onclick={() => removeItineraryItem(index)}>
											<Trash2 class="h-4 w-4" />
										</Button>
									{/if}
								</CardHeader>
								<CardContent class="space-y-4">
									<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
										<div class="space-y-2">
											<Label>Day Label</Label>
											<Input bind:value={item.day} placeholder="Day 1" />
										</div>
										<div class="space-y-2">
											<Label>Date</Label>
											<Input bind:value={item.date} placeholder="June 15" />
										</div>
										<div class="space-y-2">
											<Label>Location</Label>
											<Input bind:value={item.location} placeholder="Fira" />
										</div>
									</div>

									<div class="space-y-2">
										<div class="flex items-center justify-between">
											<Label>Activities</Label>
											<Button variant="outline" size="sm" onclick={() => addActivity(index)}>
												<Plus class="mr-1 h-4 w-4" />
												Add
											</Button>
										</div>
										{#each item.activities as activity, activityIndex}
											<div class="flex gap-2">
												<Input
													bind:value={item.activities[activityIndex]}
													placeholder="Activity description"
													class="flex-1"
												/>
												{#if item.activities.length > 1}
													<Button
														variant="outline"
														size="sm"
														onclick={() => removeActivity(index, activityIndex)}
													>
														<Trash2 class="h-4 w-4" />
													</Button>
												{/if}
											</div>
										{/each}
									</div>

									<div class="space-y-2">
										<Label>Day Highlight</Label>
										<Textarea
											bind:value={item.highlights}
											placeholder="What made this day special?"
											rows={2}
										/>
									</div>
								</CardContent>
							</Card>
						{/each}
					</TabsContent>

					<!-- Expenses Tab -->
					<TabsContent value="expenses" class="space-y-6">
						<div class="flex items-center justify-between">
							<div>
								<h3 class="text-lg font-semibold">Trip Expenses</h3>
								<p class="text-sm text-gray-600">Track your spending across different categories</p>
							</div>
							<Button onclick={addExpenseItem} variant="outline" size="sm">
								<Plus class="mr-2 h-4 w-4" />
								Add Expense
							</Button>
						</div>

						{#each expenseFormItems as expense, index}
							<Card>
								<CardContent class="pt-6">
									<div class="flex items-start gap-4">
										<div class="grid flex-1 grid-cols-1 gap-4 md:grid-cols-4">
											<div class="space-y-2">
												<Label>Category</Label>
												<Input bind:value={expense.category} placeholder="Accommodation" />
											</div>
											<div class="space-y-2">
												<Label>Description</Label>
												<Input
													bind:value={expense.description}
													placeholder="Hotel stay (7 nights)"
												/>
											</div>
											<div class="space-y-2">
												<Label>Amount</Label>
												<Input bind:value={expense.amount} type="number" placeholder="1680" />
											</div>
											<div class="space-y-2">
												<Label>Currency</Label>
												<Input bind:value={expense.currency} placeholder="EUR" />
											</div>
										</div>
										{#if expenseFormItems.length > 1}
											<Button
												variant="outline"
												size="sm"
												onclick={() => removeExpenseItem(index)}
												class="mt-8"
											>
												<Trash2 class="h-4 w-4" />
											</Button>
										{/if}
									</div>
								</CardContent>
							</Card>
						{/each}
					</TabsContent>

					<!-- Accommodations Tab -->
					<TabsContent value="accommodations" class="space-y-6">
						<div class="flex items-center justify-between">
							<div>
								<h3 class="text-lg font-semibold">Accommodations</h3>
								<p class="text-sm text-gray-600">Where you'll be staying during your trip</p>
							</div>
							<Button onclick={addAccommodationItem} variant="outline" size="sm">
								<Plus class="mr-2 h-4 w-4" />
								Add Hotel
							</Button>
						</div>

						{#each accommodationFormItems as hotel, index}
							<Card>
								<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle class="text-base">Accommodation {index + 1}</CardTitle>
									{#if accommodationFormItems.length > 1}
										<Button
											variant="outline"
											size="sm"
											onclick={() => removeAccommodationItem(index)}
										>
											<Trash2 class="h-4 w-4" />
										</Button>
									{/if}
								</CardHeader>
								<CardContent class="space-y-4">
									<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
										<div class="space-y-2">
											<Label>Hotel Name</Label>
											<Input bind:value={hotel.name} placeholder="Santorini Princess Spa Hotel" />
										</div>
										<div class="space-y-2">
											<Label>Type</Label>
											<Input bind:value={hotel.type} placeholder="Luxury Resort" />
										</div>
										<div class="space-y-2">
											<Label>Location</Label>
											<Input bind:value={hotel.location} placeholder="Imerovigli" />
										</div>
										<div class="space-y-2">
											<Label>Room Type</Label>
											<Input bind:value={hotel.roomType} placeholder="Suite with Caldera View" />
										</div>
										<div class="space-y-2">
											<Label>Check-in Date</Label>
											<Input bind:value={hotel.checkIn} type="date" />
										</div>
										<div class="space-y-2">
											<Label>Check-out Date</Label>
											<Input bind:value={hotel.checkOut} type="date" />
										</div>
										<div class="space-y-2">
											<Label>Total Cost</Label>
											<Input bind:value={hotel.totalCost} type="number" placeholder="1680" />
										</div>
										<div class="space-y-2">
											<Label>Currency</Label>
											<Input bind:value={hotel.currency} placeholder="EUR" />
										</div>
									</div>

									<div class="space-y-2">
										<div class="flex items-center justify-between">
											<Label>Amenities</Label>
											<Button variant="outline" size="sm" onclick={() => addAmenity(index)}>
												<Plus class="mr-1 h-4 w-4" />
												Add
											</Button>
										</div>
										{#each hotel.amenities as amenity, amenityIndex}
											<div class="flex gap-2">
												<Input
													bind:value={hotel.amenities[amenityIndex]}
													placeholder="Infinity Pool"
													class="flex-1"
												/>
												{#if hotel.amenities.length > 1}
													<Button
														variant="outline"
														size="sm"
														onclick={() => removeAmenity(index, amenityIndex)}
													>
														<Trash2 class="h-4 w-4" />
													</Button>
												{/if}
											</div>
										{/each}
									</div>
								</CardContent>
							</Card>
						{/each}
					</TabsContent>

					<!-- Transportation Tab -->
					<TabsContent value="transportation" class="space-y-6">
						<div class="flex items-center justify-between">
							<div>
								<h3 class="text-lg font-semibold">Transportation</h3>
								<p class="text-sm text-gray-600">Flights, car rentals, and other transport</p>
							</div>
							<Button onclick={addTransportationItem} variant="outline" size="sm">
								<Plus class="mr-2 h-4 w-4" />
								Add Transport
							</Button>
						</div>

						{#each transportationFormItems as transport, index}
							<Card>
								<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle class="text-base">Transport {index + 1}</CardTitle>
									{#if transportationFormItems.length > 1}
										<Button
											variant="outline"
											size="sm"
											onclick={() => removeTransportationItem(index)}
										>
											<Trash2 class="h-4 w-4" />
										</Button>
									{/if}
								</CardHeader>
								<CardContent class="space-y-4">
									<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
										<div class="space-y-2">
											<Label>Type</Label>
											<select
												bind:value={transport.type}
												class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
											>
												<option value="Flight">Flight</option>
												<option value="Car Rental">Car Rental</option>
												<option value="Train">Train</option>
												<option value="Bus">Bus</option>
											</select>
										</div>
										<div class="space-y-2">
											<Label>Provider/Airline</Label>
											<Input bind:value={transport.provider} placeholder="Aegean Airlines" />
										</div>

										{#if transport.type === 'Flight'}
											<div class="space-y-2">
												<Label>Route</Label>
												<Input
													bind:value={transport.route}
													placeholder="London (LHR) → Santorini (JTR)"
												/>
											</div>
											<div class="space-y-2">
												<Label>Time</Label>
												<Input bind:value={transport.time} placeholder="06:30 - 12:45" />
											</div>
										{:else}
											<div class="space-y-2">
												<Label>Vehicle/Details</Label>
												<Input bind:value={transport.route} placeholder="Fiat Panda" />
											</div>
											<div class="space-y-2">
												<Label>Duration</Label>
												<Input bind:value={transport.time} placeholder="7 days" />
											</div>
										{/if}

										<div class="space-y-2">
											<Label>Date</Label>
											<Input bind:value={transport.date} type="date" />
										</div>
										<div class="space-y-2">
											<Label>Cost</Label>
											<Input bind:value={transport.cost} type="number" placeholder="260" />
										</div>
										<div class="space-y-2">
											<Label>Currency</Label>
											<Input bind:value={transport.currency} placeholder="EUR" />
										</div>
									</div>
								</CardContent>
							</Card>
						{/each}
					</TabsContent>
				{/if}
			</Tabs>
		</div>
	</div>
</form>
