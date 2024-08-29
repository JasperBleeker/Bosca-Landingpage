<template>
    <div class="bg-white md:pb-40 md:px-40 md:flex md:gap-28 md:justify-between">
        <div class="px-8 md:px-0 font-bold">
            <!-- Clickable Address -->
            <div v-if="kontaktData?.attributes?.adress" class="flex gap-4 pb-2 md:gap-10 align-center">
                <IconsPin />
                <p class="align-middle">
                    <a :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(kontaktData?.attributes.adress || '')}`"
                        target="_blank" rel="noopener noreferrer" class="text-moss hover:underline">
                        {{ kontaktData?.attributes.adress }}
                    </a>
                </p>
            </div>

            <!-- Clickable Email -->
            <div v-if="kontaktData?.attributes?.email" class="flex gap-4 md:gap-10 pb-2">
                <IconsAt />
                <p class="align-middle">
                    <a :href="`mailto:${kontaktData?.attributes.email || ''}`" class="text-moss hover:underline">
                        {{ kontaktData?.attributes.email }}
                    </a>
                </p>
            </div>

            <!-- Clickable Phone Number -->
            <div v-if="kontaktData?.attributes?.phone" class="flex gap-4 md:gap-10 pb-2">
                <IconsPhone />
                <p class="align-middle">
                    <a :href="`tel:${kontaktData?.attributes.phone || ''}`" class="text-moss hover:underline">
                        {{ kontaktData?.attributes.phone }}
                    </a>
                </p>
            </div>
        </div>

        <!-- Google Maps Embed -->
        <div class="py-20 w-full md:py-0">
            <iframe v-if="kontaktData?.attributes?.standort?.coordinates?.lat !== null && kontaktData?.attributes?.standort?.coordinates?.lng !== null"
                :src="`https://www.google.com/maps/embed/v1/place?key=${config.public.googleMapsApiKey}&q=${kontaktData?.attributes?.standort?.coordinates?.lat},${kontaktData?.attributes?.standort?.coordinates?.lng}`"
                width="100%" height="450" style="border:0;" allowfullscreen="true" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRuntimeConfig, useFetch } from '#app';

// Interface Setup for Kontakt Data
interface StandortCoordinates {
    lat: number | null;
    lng: number | null;
}

interface Standort {
    coordinates?: StandortCoordinates | null;
}

interface KontaktDataAttributes {
    adress?: string | null;
    email?: string | null;
    phone?: string | null;
    standort?: Standort | null;
}

interface KontaktData {
    id: number;
    attributes?: KontaktDataAttributes | null;
}

// Props Setup
const props = defineProps({
    kontaktUrl: {
        type: String,
        required: true,
    },
});

// Ref Setup
const kontaktData = ref<KontaktData | null>(null);

// Config Setup
const config = useRuntimeConfig();

// Kontakt Data Fetch
const { data: fetchedKontaktData, error: kontaktError } = await useFetch<KontaktData>(props.kontaktUrl);

if (kontaktError.value) {
    console.error('Error fetching kontakt data:', kontaktError.value);
} else if (fetchedKontaktData.value) {
    kontaktData.value = fetchedKontaktData.value;
} else {
    console.error('No kontakt data found.');
}
</script>

<style scoped></style>