<template>
  <div class="text-moss">
    <div v-if="heroImageUrl">
      <img :src="heroImageUrl" :alt="pageData?.attributes.title || 'Hero Image'"
        class="-z-20 top-0 h-full w-full overflow-hidden fixed object-cover">
    </div>

    <div class="h-svh flex flex-col items-center">
      <h1 class="text-4xl font-heading-1 text-white text-center mt-10 md:hidden px-4">{{ pageData?.attributes.title }}</h1>
    </div>
    <div class="bg-white flex flex-col items-center md:flex-row py-20 px-8 md:py-40 md:px-40 md:items-start">
      <div class="md:w-3/4">
        <h1 class="font-heading-1 text-3xl md:text-6xl">{{ pageData?.attributes.title }}</h1>
        <p class="font-body py-4 md:pt-6 md:w-3/5">{{ pageData?.attributes.description }}</p>
      </div>
      <div v-if="locationImageUrl" class="max-w-2xl">
        <img :src="locationImageUrl" :alt="pageData?.attributes.title || 'Location Image'">
      </div>
    </div>



    <!-- Slot for additional content on each page -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';
import { useFetch } from '#app';

interface ImageAttributes {
  formats: {
    large: {
      url: string;
    };
  };
}

interface PageDataAttributes {
  title: string;
  description: string;
  heroimage: {
    data: {
      attributes: ImageAttributes
    };
  };
  locationimage: {
    data: {
      attributes: ImageAttributes
    } | null;
  };
}

interface PageData {
  attributes: PageDataAttributes;
}

const props = defineProps({
  apiUrl: {
    type: String,
    required: true,
  }
});

const heroImageUrl = ref<string>('');
const locationImageUrl = ref<string>('');
const pageData = ref<PageData | null>(null);

const config = useRuntimeConfig();
const baseURL = config.public.strapiBaseURL;

const { data, error } = await useFetch(props.apiUrl);

if (data.value) {
  pageData.value = data.value as PageData;
  const attributes = pageData.value?.attributes;

  // Handling hero image
  if (attributes?.heroimage?.data) {
    const heroImage = Array.isArray(attributes.heroimage.data)
      ? attributes.heroimage.data[0].attributes
      : attributes.heroimage.data.attributes;

    if (heroImage?.formats?.large?.url) {
      heroImageUrl.value = `${baseURL}${heroImage.formats.large.url}`;
    } else {
      console.error('Large format of the hero image not found.');
    }
  } else {
    console.error('Hero image data is not available.');
  }

  // Handling location image
  if (attributes?.locationimage?.data) {
    const locationImage = Array.isArray(attributes.locationimage.data)
      ? attributes.locationimage.data[0].attributes
      : attributes.locationimage.data.attributes;

    if (locationImage?.formats?.large?.url) { // Adjust format as needed
      locationImageUrl.value = `${baseURL}${locationImage.formats.large.url}`;
    } else {
      console.warn('Large format of the location image not found, using fallback or ignoring.');
    }
  } else {
    console.warn('Location image data is not available, which may be expected.');
  }

} else {
  console.error('Error fetching page data:', error);
}

</script>

<style scoped>
/* Add any additional styles */
</style>