<script>
	import { page } from '$app/stores';
	import CollapsibleSection from '$lib/components/collapsible-section.svelte';
	import { Button } from '$lib/components/ui/button/index.js';

	// Hardcoded trip data - in real app this would come from a database
	const tripData = {
		title: 'Amazing Journey to Santorini',
		slug: $page.params.slug,
		headerImage:
			'https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fHRyYXZlbHxlbnwwfDB8MHx8fDI%3D',
		dates: 'June 15-22, 2024',
		location: 'Santorini, Greece',
		summary:
			'An incredible week exploring the beautiful island of Santorini with its stunning sunsets, white-washed buildings, and crystal blue waters.',
		content: `# Day 1: Arrival and First Impressions

The flight to Santorini was smooth, and stepping off the plane, I was immediately greeted by the warm Mediterranean breeze. The island's unique beauty became apparent during the drive from the airport - dramatic cliffs, traditional Cycladic architecture, and the endless blue of the Aegean Sea.

## Exploring Fira

Our first stop was Fira, the island's bustling capital. The narrow cobblestone streets were lined with boutique shops, cozy cafes, and restaurants with breathtaking caldera views. We spent the evening watching our first Santorini sunset - absolutely magical!

# Day 2: Oia and the Famous Sunsets

No trip to Santorini is complete without visiting Oia. This picturesque village with its iconic blue-domed churches and whitewashed buildings is even more stunning in person than in photos.

## The Sunset Experience

We secured a perfect spot at one of the cliffside restaurants to watch the sunset. The golden hour light transformed the entire landscape, and when the sun finally dipped below the horizon, the crowd erupted in applause - a truly unforgettable moment.

# Day 3-4: Beach Days and Wine Tasting

The next couple of days were dedicated to relaxation. We visited the famous Red Beach and Perissa Beach, each offering unique volcanic sand and crystal-clear waters. 

The wine tasting tour was a highlight - learning about the island's unique viticulture and sampling some exceptional Assyrtiko wines with views of the caldera.

# Day 5-6: Cultural Exploration

We explored the ancient site of Akrotiri, a well-preserved Minoan Bronze Age settlement. The archaeological site provided fascinating insights into the island's rich history.

The local markets in Fira offered wonderful opportunities to buy authentic Greek products - olive oil, local wines, and beautiful handmade ceramics.

# Day 7: Farewell

Our last day was bittersweet. We took a final walk through the streets of Fira, had lunch at our favorite taverna, and watched one last sunset before heading to the airport.

Santorini exceeded all expectations - it's a place that captures your heart and soul.`
	};

	const itinerary = [
		{
			day: 'Day 1',
			date: 'June 15',
			location: 'Fira',
			activities: ['Airport arrival', 'Hotel check-in', 'Fira exploration', 'Sunset viewing'],
			highlights: 'First Santorini sunset from Fira cliffs'
		},
		{
			day: 'Day 2',
			date: 'June 16',
			location: 'Oia',
			activities: [
				'Morning walk to Oia',
				'Blue dome photography',
				'Lunch at Ammoudi Bay',
				'Famous Oia sunset'
			],
			highlights: 'Iconic Oia sunset experience'
		},
		{
			day: 'Day 3',
			date: 'June 17',
			location: 'Red Beach & Akrotiri',
			activities: [
				'Red Beach visit',
				'Akrotiri archaeological site',
				'Beach relaxation',
				'Seafood dinner'
			],
			highlights: 'Ancient Minoan ruins at Akrotiri'
		},
		{
			day: 'Day 4',
			date: 'June 18',
			location: 'Perissa Beach',
			activities: ['Black sand beach', 'Water sports', 'Beachside lunch', 'Evening in Fira'],
			highlights: 'Volcanic black sand beach experience'
		},
		{
			day: 'Day 5',
			date: 'June 19',
			location: 'Wine Tour',
			activities: ['Santo Wines visit', 'Venetsanos Winery', 'Wine tasting', 'Vineyard tour'],
			highlights: 'Assyrtiko wine tasting with caldera views'
		},
		{
			day: 'Day 6',
			date: 'June 20',
			location: 'Fira & Shopping',
			activities: ['Local market visit', 'Souvenir shopping', 'Museum visit', 'Final sunset'],
			highlights: 'Authentic Greek products and local crafts'
		},
		{
			day: 'Day 7',
			date: 'June 21',
			location: 'Departure',
			activities: ['Hotel checkout', 'Final breakfast', 'Airport departure'],
			highlights: 'Farewell to paradise'
		}
	];

	const expenses = [
		{
			category: 'Accommodation',
			description: 'Hotel stay (7 nights)',
			amount: 1680,
			currency: 'EUR'
		},
		{ category: 'Flights', description: 'Round-trip flights', amount: 520, currency: 'EUR' },
		{
			category: 'Food & Dining',
			description: 'Restaurants and meals',
			amount: 420,
			currency: 'EUR'
		},
		{
			category: 'Transportation',
			description: 'Car rental and fuel',
			amount: 280,
			currency: 'EUR'
		},
		{
			category: 'Activities',
			description: 'Tours and entrance fees',
			amount: 180,
			currency: 'EUR'
		},
		{
			category: 'Shopping',
			description: 'Souvenirs and local products',
			amount: 150,
			currency: 'EUR'
		},
		{
			category: 'Miscellaneous',
			description: 'Tips and other expenses',
			amount: 70,
			currency: 'EUR'
		}
	];

	const accommodations = [
		{
			name: 'Santorini Princess Spa Hotel',
			type: 'Luxury Resort',
			location: 'Imerovigli',
			checkIn: 'June 15, 2024',
			checkOut: 'June 22, 2024',
			nights: 7,
			roomType: 'Suite with Caldera View',
			amenities: ['Infinity Pool', 'Spa Access', 'Balcony', 'Sea View', 'Breakfast Included'],
			rating: 4.8,
			totalCost: 1680,
			currency: 'EUR'
		}
	];

	const transportation = [
		{
			type: 'Flight',
			route: 'London (LHR) → Santorini (JTR)',
			date: 'June 15, 2024',
			time: '06:30 - 12:45',
			airline: 'Aegean Airlines',
			cost: 260,
			currency: 'EUR'
		},
		{
			type: 'Flight',
			route: 'Santorini (JTR) → London (LHR)',
			date: 'June 22, 2024',
			time: '14:20 - 17:35',
			airline: 'Aegean Airlines',
			cost: 260,
			currency: 'EUR'
		},
		{
			type: 'Car Rental',
			provider: 'Hertz',
			vehicle: 'Fiat Panda',
			duration: '7 days',
			pickupDate: 'June 15, 2024',
			returnDate: 'June 22, 2024',
			cost: 280,
			currency: 'EUR'
		}
	];

	const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
</script>

<svelte:head>
	<title>{tripData.title} - Trip Diary</title>
</svelte:head>

<div class="min-h-screen bg-gray-50">
	<!-- Header Image -->
	<div
		class="relative h-80 w-full bg-cover bg-center bg-no-repeat"
		style="background-image: url('{tripData.headerImage}');"
	></div>

	<!-- Main Content -->
	<div class="relative z-10 mx-auto -mt-20 max-w-4xl px-4">
		<!-- Title Card -->
		<div class="mb-8 rounded-2xl bg-white p-8">
			<div class="mb-6 flex items-start justify-between">
				<div>
					<div class="flex items-center justify-between gap-4">
						<h1 class="mb-2 text-4xl font-bold text-gray-800">{tripData.title}</h1>
						<div class="flex">
							<a
								href={`/trips/${tripData.slug}/edit`}
								class="rounded-lg px-4 py-2 font-medium text-orange-600 duration-200 hover:bg-orange-100"
							>
								✏️ Edit Trip
							</a>
						</div>
					</div>
					<div class="flex items-center gap-4 pb-4">
						<Button
							variant="link"
							size="sm"
							href={`/trips/${tripData.slug}/itinerary`}
							class="text-green-700"
						>
							Itenirary
						</Button>
						<Button
							variant="link"
							size="sm"
							href={`/trips/${tripData.slug}/diary`}
							class="text-green-700"
						>
							Trip Diary
						</Button>
						<Button
							variant="link"
							size="sm"
							href={`/trips/${tripData.slug}/diary`}
							class="text-green-700"
						>
							Expenses
						</Button>
					</div>
					<div class="flex items-center gap-4 text-gray-600">
						<span class="flex items-center gap-1">
							📅 {tripData.dates}
						</span>
						<span class="flex items-center gap-1">
							📍 {tripData.location}
						</span>
					</div>
				</div>
			</div>
			<p class="text-lg leading-relaxed text-gray-600">{tripData.summary}</p>
		</div>

		<!-- Trip Itinerary -->
		<CollapsibleSection title="Trip Itinerary" icon="🗺️">
			{#snippet children()}
				<div class="space-y-6">
					{#each itinerary as day}
						<div class="border-l-4 border-cyan-500 pb-6 pl-6">
							<div class="mb-3 flex items-center gap-3">
								<h3 class="text-lg font-semibold text-gray-800">{day.day}</h3>
								<span class="text-sm text-gray-500">{day.date}</span>
								<span class="rounded-full bg-cyan-100 px-3 py-1 text-sm font-medium text-cyan-700"
									>{day.location}</span
								>
							</div>
							<div class="mb-3">
								<h4 class="mb-2 font-medium text-gray-700">Activities:</h4>
								<ul class="flex flex-wrap gap-2">
									{#each day.activities as activity}
										<li class="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
											{activity}
										</li>
									{/each}
								</ul>
							</div>
							<div class="text-sm text-gray-600">
								<strong>Highlight:</strong>
								{day.highlights}
							</div>
						</div>
					{/each}
				</div>
			{/snippet}
		</CollapsibleSection>

		<!-- Expenses -->
		<CollapsibleSection title="Trip Expenses" icon="💰">
			{#snippet children()}
				<div class="overflow-x-auto">
					<table class="w-full">
						<thead>
							<tr class="border-b border-gray-200">
								<th class="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
								<th class="px-4 py-3 text-left font-semibold text-gray-700">Description</th>
								<th class="px-4 py-3 text-right font-semibold text-gray-700">Amount</th>
							</tr>
						</thead>
						<tbody>
							{#each expenses as expense}
								<tr class="border-b border-gray-100 hover:bg-gray-50">
									<td class="px-4 py-3 font-medium text-gray-800">{expense.category}</td>
									<td class="px-4 py-3 text-gray-600">{expense.description}</td>
									<td class="px-4 py-3 text-right font-semibold text-gray-800">
										{expense.amount}
										{expense.currency}
									</td>
								</tr>
							{/each}
						</tbody>
						<tfoot>
							<tr class="border-t-2 border-gray-200 bg-gray-50">
								<td colspan="2" class="px-4 py-3 font-bold text-gray-800">Total</td>
								<td class="px-4 py-3 text-right text-lg font-bold text-gray-800">
									{totalExpenses} EUR
								</td>
							</tr>
						</tfoot>
					</table>
				</div>
			{/snippet}
		</CollapsibleSection>

		<!-- Accommodations -->
		<CollapsibleSection title="Accommodations" icon="🏨">
			{#snippet children()}
				{#each accommodations as hotel}
					<div class="rounded-xl border border-gray-200 p-6">
						<div class="mb-4 flex items-start justify-between">
							<div>
								<h3 class="mb-1 text-xl font-semibold text-gray-800">{hotel.name}</h3>
								<p class="text-gray-600">{hotel.type} • {hotel.location}</p>
							</div>
							<div class="flex items-center gap-1">
								<span class="text-yellow-500">⭐</span>
								<span class="font-semibold text-gray-700">{hotel.rating}</span>
							</div>
						</div>
						<div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
							<div>
								<p class="mb-1 text-sm text-gray-600">Check-in/Check-out</p>
								<p class="font-medium text-gray-800">{hotel.checkIn} - {hotel.checkOut}</p>
							</div>
							<div>
								<p class="mb-1 text-sm text-gray-600">Duration</p>
								<p class="font-medium text-gray-800">{hotel.nights} nights</p>
							</div>
							<div>
								<p class="mb-1 text-sm text-gray-600">Room Type</p>
								<p class="font-medium text-gray-800">{hotel.roomType}</p>
							</div>
							<div>
								<p class="mb-1 text-sm text-gray-600">Total Cost</p>
								<p class="font-semibold text-gray-800">{hotel.totalCost} {hotel.currency}</p>
							</div>
						</div>
						<div>
							<p class="mb-2 text-sm text-gray-600">Amenities</p>
							<div class="flex flex-wrap gap-2">
								{#each hotel.amenities as amenity}
									<span class="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700"
										>{amenity}</span
									>
								{/each}
							</div>
						</div>
					</div>
				{/each}
			{/snippet}
		</CollapsibleSection>

		<!-- Transportation -->
		<CollapsibleSection title="Transportation" icon="🚗">
			{#snippet children()}
				<div class="space-y-4">
					{#each transportation as transport}
						<div class="rounded-xl border border-gray-200 p-6">
							<div class="mb-4 flex items-start justify-between">
								<div>
									<h3 class="mb-1 text-lg font-semibold text-gray-800">
										{transport.type === 'Flight' ? '✈️' : '🚗'}
										{transport.type}
									</h3>
									{#if transport.type === 'Flight'}
										<p class="mb-1 text-gray-600">{transport.route}</p>
										<p class="text-sm text-gray-500">{transport.date} • {transport.time}</p>
										<p class="text-sm text-gray-500">{transport.airline}</p>
									{:else}
										<p class="mb-1 text-gray-600">{transport.provider} • {transport.vehicle}</p>
										<p class="text-sm text-gray-500">{transport.duration}</p>
										<p class="text-sm text-gray-500">
											{transport.pickupDate} - {transport.returnDate}
										</p>
									{/if}
								</div>
								<div class="text-right">
									<p class="font-semibold text-gray-800">{transport.cost} {transport.currency}</p>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/snippet}
		</CollapsibleSection>

		<!-- Trip Content/Diary -->
		<CollapsibleSection title="Trip Diary" icon="📝">
			{#snippet children()}
				<div class="prose prose-gray max-w-none">
					<div class="leading-relaxed whitespace-pre-wrap text-gray-700">
						{@html tripData.content
							.split('\n')
							.map((line) => {
								if (line.startsWith('# ')) {
									return `<h1 class="text-2xl font-bold text-gray-800 mt-8 mb-4">${line.substring(2)}</h1>`;
								} else if (line.startsWith('## ')) {
									return `<h2 class="text-xl font-semibold text-gray-800 mt-6 mb-3">${line.substring(3)}</h2>`;
								} else if (line.trim() === '') {
									return '<br>';
								} else {
									return `<p class="mb-4">${line}</p>`;
								}
							})
							.join('')}
					</div>
				</div>
			{/snippet}
		</CollapsibleSection>
	</div>
</div>
