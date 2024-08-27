<template>
    <div>
        <div class="flex">
            <IconsPin />
            <p>{{ kontaktData?.attributes.adress }}</p>
        </div>
        <div class="flex">
            <IconsAt />
            <p>{{ kontaktData?.attributes.email }}</p>
        </div>
        <div class="flex">
            <IconsPhone />
            <p>{{ kontaktData?.attributes.phone }}</p>
        </div>
        

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRuntimeConfig, useFetch } from '#app';
import { data } from 'autoprefixer';

// Interface Setup for Kontakt Data
interface KontaktDataAttributes {
    adress: string;
    email: string;
    phone: string;
}

interface KontaktData {
    id: number;
    attributes: KontaktDataAttributes;
}

// Props Setup
const props = defineProps({
    kontaktUrl: {
        type: String,
        required: true,
    }
});

// Ref Setup
const kontakteData = ref<KontaktData | null>(null);

// Config Setup
const config = useRuntimeConfig();

// Kontakt Data Fetch
const { data: kontaktData, error: kontaktError } = await useFetch<KontaktData>(props.kontaktUrl);

if (kontaktError.value) {
    console.error('Error fetching kontakt data:', kontaktError.value);
} else if (kontaktData.value) {
    kontaktData.value = kontaktData.value;
} else {
    console.error('No kontakt data found.');
}



</script>

<style scoped></style>