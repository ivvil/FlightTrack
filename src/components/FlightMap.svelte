<script lang="ts">
	import { onMount } from "svelte";
	import L from "leaflet";
	import "leaflet/dist/leaflet.css";
	import "../styles/global.css";

	let { origin, destination, apiKey } = $props();

	let mapElement: HTMLElement;
	let originInfo: any;
	let destinationInfo: any;
	let loading = true;
	let error = false;

	async function fetchAirportData(airportCode: string) {
		const url = `https://aiport-data.p.rapidapi.com/getAirportByIATA?iataCode=${airportCode}`;
		const options = {
			method: "GET",
			headers: {
				"x-rapidapi-key": apiKey,
				"x-rapidapi-host": "aiport-data.p.rapidapi.com",
			},
		};
		try {
			const response = await fetch(url, options);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			return data[0]; // Access the first element of the array
		} catch (err) {
			console.error("Error fetching airport data:", err);
			error = true;
			loading = false;
			return null;
		}
	}

	async function initializeMap() {
		originInfo = await fetchAirportData(origin);
		destinationInfo = await fetchAirportData(destination);

		if (originInfo && destinationInfo) {
			const originLatitude = originInfo.latitude_deg;
			const originLongitude = originInfo.longitude_deg;
			const destinationLatitude = destinationInfo.latitude_deg;
			const destinationLongitude = destinationInfo.longitude_deg;

			const map = L.map(mapElement).setView(
				[originLatitude, originLongitude],
				2,
			);

			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			}).addTo(map);

			L.marker([originLatitude, originLongitude])
				.addTo(map)
				.bindPopup(`Origin: ${originInfo.name}`)
				.openPopup();

			L.marker([destinationLatitude, destinationLongitude])
				.addTo(map)
				.bindPopup(`Destination: ${destinationInfo.name}`)
				.openPopup();
		}

		loading = false;
	}

	onMount(() => {
		initializeMap();
	});
</script>

<div bind:this={mapElement} style="height: 500px;"></div>
