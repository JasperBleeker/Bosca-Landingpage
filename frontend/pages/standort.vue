<template>
    <div>
        <div class="">
            <!-- Bind the image URL to the src attribute -->
            <img :src="imageUrl" alt="Hero Image" v-if="imageUrl" class="-z-20 top-0 h-full w-full overflow-hidden fixed object-cover">
        </div>

        <div class="h-svh flex flex-col items-center justify-center ">
            <h1 class="text-4xl font-heading-1 text-white text-center md:hidden">{{ pageData.attributes.title }}</h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

const { data: pageData, error } = await useFetch('/api/standort-fetch');
const config = useRuntimeConfig(); // Access the runtime config

// Log the structure to confirm
console.log(pageData);

const imageUrl = ref('');

// Access the base URL from runtime config
const baseURL = config.public.strapiBaseURL;

if (pageData && pageData.value) {
    const attributes = pageData.value.attributes;

    if (attributes && attributes.heroimage && attributes.heroimage.data && attributes.heroimage.data.attributes) {
        const heroImage = attributes.heroimage.data.attributes;

        if (heroImage && heroImage.formats && heroImage.formats.large) {
            imageUrl.value = `${baseURL}${heroImage.formats.large.url}`;
        } else {
            console.error('Large format of the hero image not found.');
        }
    } else {
        console.error('Hero image attributes not found.');
    }
} else {
    console.error('Error fetching page data:', error);
}

</script>

<style lang="scss" scoped></style>