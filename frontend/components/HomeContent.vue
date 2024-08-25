<template>
    <div class="bg-moss py-8 md:grid md:grid-cols-2 md:grid-rows-2 md:px-40">
        <div v-if="housesData" class="bg-moss text-white md:max-w-lg">
            <h2 class="text-center font-heading-3 text-2xl pt-10 font-bold md:text-left md:text-3xl">{{ housesData.attributes.title }}</h2>
            <p class="px-8 pt-4 md:px-0 md:pb-4">{{ housesData.attributes.description }}</p>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
        <RoomThumbnails thumbnailUrl="/api/rooms-fetch" class="md:max-w-xl row-span-2 md:mx-auto"/>
        <NuxtLink to="/haus"
            class="bg-shamrock text-white block text-center py-2 w-40 mx-auto  rounded-full font-bold max-h-10 md:mx-0">
            <div>
                <p>zum Haus</p>
            </div>
        </NuxtLink>
    </div>
    <div>
        <StandortSection standortUrl="/api/standort-fetch" />
    </div>
    <div>
        <UberSection uberUrl="/api/ueber-fetch" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRuntimeConfig, useFetch } from '#app';



// Interface Setup for Haus Data
interface HausDataAttributes {
    title: string;
    description: string;
}

interface HausData {
    id: number;
    attributes: HausDataAttributes;
}

// Props Setup
const props = defineProps({
    roomUrl: {
        type: String,
        required: true,
    },
    hausUrl: {
        type: String,
        required: true,
    }
});

// Ref Setup
const housesData = ref<HausData | null>(null);

// Config Setup
const config = useRuntimeConfig();
const baseURL = config.public.strapiBaseURL;


// Haus Data Fetch
const { data: hausData, error: hausError } = await useFetch<HausData>(props.hausUrl);

if (hausError.value) {
    console.error('Error fetching haus data:', hausError.value);
} else if (hausData.value) {
    housesData.value = hausData.value;
} else {
    console.error('No haus data found.');
}



</script>

<style scoped></style>
