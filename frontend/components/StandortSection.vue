<template>
    <div class="bg-white grid px-8 py-20 md:grid-cols-2 md:grid-rows-5 md:px-40 md:gap-x-32">
        <img :src="`${baseURL}${standortData?.attributes.locationimage.data?.attributes.formats.medium.url}`" alt="" class="order-2 pb-8 md:col-span-1 md:row-span-5 md:order-1">
        <h2 class="order-1 font-heading-3 text-center text-2xl font-bold pb-8 md:text-3xl md:col-span-1 md:order-2 md:text-left md:row-span-2 self-end">{{ standortData?.attributes.name }}</h2>
        <p class="order-3 font-body pb-4 md:col-span-1">{{ standortData?.attributes.description }}</p>

        <NuxtLink to="/standort" class="order-4 bg-shamrock text-white block text-center py-2 w-40 mx-auto  rounded-full font-bold max-h-10 md:mx-0 md:col-span-1">
            <div>
                <p class="text-center">zum Standort</p>
            </div>
        </NuxtLink>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRuntimeConfig, useFetch } from '#app';

interface PictureFormat {
    url: string;
    width: number;
    height: number;
}

interface StandortPictureAttributes {
    name: string;
    formats: {
        medium: PictureFormat;
    };
}


interface StandortDataAttributes {
    title: string;
    name: string;
    description: string;
    locationimage: {
        data: {
            attributes: StandortPictureAttributes;
        } | null;
    };
}

interface StandortData {
    id: number;
    attributes: StandortDataAttributes;
}

const props = defineProps({
    standortUrl: {
        type: String,
        required: true,
    }
});

const standortData = ref<StandortData | null>(null);
const config = useRuntimeConfig();
const baseURL = config.public.strapiBaseURL;

try {
    const { data, error } = await useFetch<StandortData>(props.standortUrl);

    if (error.value) {
        console.error('Error fetching standort data:', error.value);
    } else {
        standortData.value = data.value;
    }
} catch (error) {
    console.error('Error fetching standort data:', error);
}


</script>

<style scoped></style>