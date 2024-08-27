<template>
    <div class="bg-white">
      <div v-for="section in uberData?.attributes.AboutMeSection" :key="section.id"
        :class="section.is_highlight ? 'highlighted-section' : 'regular-section'"
        class="grid px-8 py-20 md:gap-8 md:grid-cols-2 md:px-40">
  
        <h2
          class="font-heading-3 text-center text-2xl font-bold pb-8 md:text-3xl md:col-span-1 md:text-left self-end"
          :class="section.position === 'Left' ? 'md:order-2' : 'md:order-1'">
          {{ section.title }}
        </h2>
  
        <p class="font-body pb-4 md:col-span-1"
          :class="section.position === 'Left' ? 'md:order-3' : 'md:order-3'">
          {{ section.description }}
        </p>
  
        <img :src="baseURL + section.image?.data.attributes.formats.medium.url" alt=""
          class="pb-8 md:col-span-1 md:row-span-5"
          :class="section.position === 'Left' ? 'md:order-1' : 'md:order-2'">
  
        <NuxtLink v-for="link in section.link" :key="link.id" :to="`/${link.url}`"
          class="order-4 bg-shamrock text-white block text-center py-2 w-40 mx-auto rounded-full font-bold max-h-10 md:mx-0 md:col-span-1"
          :class="section.position === 'Left' ? 'md:order-4' : 'md:order-3'">
          <div>
            <p class="text-center">{{ link.label }}</p>
          </div>
        </NuxtLink>
        
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
        is_highlight: boolean;
        image: {
            data: UberImageData;
        } | null;
        link: [{
            id: number;
            label: string;
            url: string;
        }];
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

<style scoped>
.highlighted-section {
    background-color: #23291C;
    color: white;
}

.regular-section {
    background-color: white;
    color: black;
}

.img-is-left {
    order: 1;
}

.img-is-right {
    order: 4;
}
</style>