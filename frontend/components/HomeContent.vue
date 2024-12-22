<template>
    <div class="bg-moss py-8 lg:grid md:grid lg:grid-cols-2 md:grid-cols-2 md:gap-2 lg:gap-2 lg:px-40 md:px-20">
        <div v-if="housesData" class="bg-moss text-white lg:max-w-lg">
            <h2 class="text-center font-heading-3 text-2xl pt-10 font-bold lg:text-left md:text-left lg:text-3xl">{{
                housesData.attributes.title }}</h2>
            <p class="px-8 pt-4 md:px-0 lg:pb-4">{{ housesData.attributes.description }}</p>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
        <RoomThumbnails thumbnailUrl="/api/rooms-fetch" class="lg:max-w-xl md:max-w-lg row-span-2 lg:mx-auto" />
        <NuxtLink to="/haus" class="bg-shamrock hover:bg-shamrockdark transition-colors delay-100 duration-200 ease-in-out
 text-white block text-center py-2 w-40 mx-auto  rounded-full font-bold max-h-10 lg:mx-0 md:mx-0">
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
