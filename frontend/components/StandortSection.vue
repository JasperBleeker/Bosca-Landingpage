<template>
    <div class="bg-white grid px-8 py-20 lg:grid-cols-2 lg:px-40 md:px-20 lg:gap-x-32">
        <img :src="`${standortData?.attributes.locationimage.data?.attributes.formats.medium.url}`" alt="" class="order-2 pb-8 lg:col-span-1 lg:row-span-5 lg:order-1 md:w-60 lg:w-full md:mx-auto lg:mx-0">
        <h2 class="order-1 font-heading-3 text-center text-2xl font-bold pb-8 lg:text-3xl lg:col-span-1 lg:order-2 lg:text-left lg:row-span-2 self-end">{{ standortData?.attributes.name }}</h2>
        <p class="order-3 font-body pb-4 lg:col-span-1">{{ standortData?.attributes.description }}</p>

        <NuxtLink to="/standort" class="order-4 bg-shamrock text-white hover:bg-shamrockdark transition-colors delay-100 duration-200 ease-in-out block text-center py-2 w-40 mx-auto  rounded-full font-bold max-h-10 lg:mx-0 lg:col-span-1">
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