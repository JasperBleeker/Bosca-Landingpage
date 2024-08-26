<template>
    <div class="bg-white">
      <div v-for="section in uberData?.attributes.AboutMeSection" :key="section.id" class="grid px-8 py-20 md:grid-cols-2">
        <h2 class="font-heading-3 text-center">{{ section.title }}</h2>
        <p>{{ section.description }}</p>
        <img :src="baseURL + section.image?.data.attributes.formats.medium.url" alt="">
        <!-- Assuming you want to link to a page using the section title or some other data -->
        <NuxtLink :to="`/section/${section.id}`">{{ section.title }}</NuxtLink>
      </div>
    </div>
  </template>
  

<script setup lang="ts">

import { ref } from 'vue'
import { useRuntimeConfig, useFetch } from '#app'

interface PictureFormat {
    url: string;
    width: number;
    height: number;
}

interface UberImageAttributes {
    name: string;
    formats: {
        medium: PictureFormat;
    };
}

interface UberImageData {
    id: number;
    attributes: UberImageAttributes;
}

interface UberDataAttributes {
    title: string;
    name: string;
    description: string;
    AboutMeSection: [{
        id: number;
        title: string;
        description: string;
        position: string;
        image: {
            data: UberImageData;
        } | null;
    }]
};

interface UberData {
    id: number;
    attributes: UberDataAttributes;
}

const props = defineProps({
    apiUrl: {
        type: String,
        required: true,
    }
});

const uberData = ref<UberData | null>(null);
const config = useRuntimeConfig();
const baseURL = config.public.strapiBaseURL;

try {
    const { data, error } = await useFetch<UberData>(props.apiUrl);

    if (error.value) {
        console.error('Error fetching uber data:', error.value);
    } else if (data.value) {
        uberData.value = data.value;
    }
} catch (error) {
    console.error(error);
}

console.log(uberData.value);

</script>

<style scoped></style>