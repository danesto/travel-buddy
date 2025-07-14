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

	// Props for default values (useful for editing)
	// Merge all props into a single $props() destructure
	let {
		defaultValues = {
			title: '',
			location: '',
			dates: '',
			summary: '',
			headerImage: '',
			itinerary: [],
			expenses: [],
			accommodations: [],
			transportation: []
		},
		mode = 'edit'
	} = $props();

	// Form state
	let tripData = { ...defaultValues };
	let activeTab = $state('basic');

	// Dynamic arrays for form sections
	let itineraryItems =
		tripData.itinerary.length > 0
			? tripData.itinerary
			: [{ day: '', date: '', location: '', activities: [''], highlights: '' }];

	let expenseItems =
		tripData.expenses.length > 0
			? tripData.expenses
			: [{ category: '', description: '', amount: '', currency: 'EUR' }];

	let accommodationItems =
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
				];

	let transportationItems =
		tripData.transportation.length > 0
			? tripData.transportation
			: [
					{ type: 'Flight', route: '', date: '', time: '', provider: '', cost: '', currency: 'EUR' }
				];

	// Helper functions
	function addItineraryItem() {
		itineraryItems = [
			...itineraryItems,
			{ day: '', date: '', location: '', activities: [''], highlights: '' }
		];
	}

	function removeItineraryItem(index: number) {
		itineraryItems = itineraryItems.filter((_: any, i: number) => i !== index);
	}

	function addActivity(dayIndex: number) {
		itineraryItems[dayIndex].activities = [...itineraryItems[dayIndex].activities, ''];
	}

	function removeActivity(dayIndex: number, activityIndex: number) {
		itineraryItems[dayIndex].activities = itineraryItems[dayIndex].activities.filter(
			(_: any, i: number) => i !== activityIndex
		);
	}

	function addExpenseItem() {
		expenseItems = [
			...expenseItems,
			{ category: '', description: '', amount: '', currency: 'EUR' }
		];
	}

	function removeExpenseItem(index: number) {
		expenseItems = expenseItems.filter((_: any, i: number) => i !== index);
	}

	function addAccommodationItem() {
		accommodationItems = [
			...accommodationItems,
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
		accommodationItems = accommodationItems.filter((_: any, i: number) => i !== index);
	}

	function addAmenity(hotelIndex: number) {
		accommodationItems[hotelIndex].amenities = [...accommodationItems[hotelIndex].amenities, ''];
	}

	function removeAmenity(hotelIndex: number, amenityIndex: number) {
		accommodationItems[hotelIndex].amenities = accommodationItems[hotelIndex].amenities.filter(
			(_: any, i: number) => i !== amenityIndex
		);
	}

	function addTransportationItem() {
		transportationItems = [
			...transportationItems,
			{ type: 'Flight', route: '', date: '', time: '', provider: '', cost: '', currency: 'EUR' }
		];
	}

	function removeTransportationItem(index: number) {
		transportationItems = transportationItems.filter((_: any, i: number) => i !== index);
	}

	// pass this as the prop, since we need to handle the form submission differently for create and edit
	function handleSubmit(e: Event) {
		e?.preventDefault();
		// Prepare the complete trip data
		const completeTrip = {
			...tripData,
			itinerary: itineraryItems,
			expenses: expenseItems,
			accommodations: accommodationItems,
			transportation: transportationItems
		};

		console.log('Trip data to submit:', completeTrip);
		return null;
		// TODO: Handle form submission
	}
</script>

<form on:submit|preventDefault={mode === 'create' ? handleSubmit : undefined}>
	<div class="mb-8 rounded-2xl bg-white shadow-xl">
		<div class="p-8">
			<div class="mb-8 flex items-center justify-between">
				<div>
					<h2 class="mb-2 text-3xl font-bold text-gray-800">Trip Planning Form</h2>
					<p class="text-gray-600">Fill in the details for your upcoming adventure</p>
				</div>
				{#if mode === 'create'}
					<Button type="submit" class="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
						Create Trip
					</Button>
				{:else}
					<Button onclick={handleSubmit} class="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700">
						Save Trip
					</Button>
				{/if}
			</div>

			<Tabs bind:value={activeTab} class="w-full">
				<TabsList class="mb-8 grid w-full grid-cols-5">
					<TabsTrigger value="basic" class="flex items-center gap-2">
						<MapPin class="h-4 w-4" />
						Basic Info
					</TabsTrigger>
					<TabsTrigger value="itinerary" class="flex items-center gap-2" disabled={mode === 'create'}>
						<Calendar class="h-4 w-4" />
						Itinerary
					</TabsTrigger>
					<TabsTrigger value="expenses" class="flex items-center gap-2" disabled={mode === 'create'}>
						<DollarSign class="h-4 w-4" />
						Expenses
					</TabsTrigger>
					<TabsTrigger value="accommodations" class="flex items-center gap-2" disabled={mode === 'create'}>
						<Building class="h-4 w-4" />
						Hotels
					</TabsTrigger>
					<TabsTrigger value="transportation" class="flex items-center gap-2" disabled={mode === 'create'}>
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
									<Input id="title" name="title" bind:value={tripData.title} placeholder="Amazing Journey to..." required={mode === 'create'} />
								</div>
								<div class="space-y-2">
									<Label for="location">Location</Label>
									<Input id="location" name="location" bind:value={tripData.location} placeholder="Santorini, Greece" required={mode === 'create'} />
								</div>
							</div>
							<div class="space-y-2">
								<Label for="dates">Trip Dates</Label>
								<Input id="dates" name="dates" bind:value={tripData.dates} placeholder="June 15-22, 2024" required={mode === 'create'} />
							</div>
							<div class="space-y-2">
								<Label for="headerImage">Header Image URL</Label>
								<Input id="headerImage" name="headerImage" bind:value={tripData.headerImage} placeholder="https://..." />
							</div>
							<div class="space-y-2">
								<Label for="summary">Trip Summary</Label>
								<Textarea id="summary" name="summary" bind:value={tripData.summary} placeholder="Brief description of your trip..." rows={3} />
							</div>
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

						{#each itineraryItems as item, index}
							<Card>
								<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle class="text-base">Day {index + 1}</CardTitle>
									{#if itineraryItems.length > 1}
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

						{#each expenseItems as expense, index}
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
												<Input bind:value={expense.description} placeholder="Hotel stay (7 nights)" />
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
										{#if expenseItems.length > 1}
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

						{#each accommodationItems as hotel, index}
							<Card>
								<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle class="text-base">Accommodation {index + 1}</CardTitle>
									{#if accommodationItems.length > 1}
										<Button variant="outline" size="sm" onclick={() => removeAccommodationItem(index)}>
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
											<Input bind:value={hotel.checkIn} placeholder="June 15, 2024" />
										</div>
										<div class="space-y-2">
											<Label>Check-out Date</Label>
											<Input bind:value={hotel.checkOut} placeholder="June 22, 2024" />
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

						{#each transportationItems as transport, index}
							<Card>
								<CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle class="text-base">Transport {index + 1}</CardTitle>
									{#if transportationItems.length > 1}
										<Button variant="outline" size="sm" onclick={() => removeTransportationItem(index)}>
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
											<Input bind:value={transport.date} placeholder="June 15, 2024" />
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
