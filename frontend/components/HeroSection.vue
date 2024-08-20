<template>
  <div>
    <div v-if="imageUrl">
      <img :src="imageUrl" :alt="pageData?.attributes.title || 'Hero Image'"
           class="-z-20 top-0 h-full w-full overflow-hidden fixed object-cover">
    </div>

    <div class="h-svh flex flex-col items-center justify-center">
      <h1 class="text-4xl font-heading-1 text-white text-center md:hidden">{{ pageData?.attributes.title }}</h1>
    </div>

    <!-- Slot for additional content on each page -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';
import { useFetch } from '#app';

const props = defineProps({
  apiUrl: {
    type: String,
    required: true,
  }
});

const imageUrl = ref('');
const pageData = ref(null);

const config = useRuntimeConfig(); // Access the runtime config
const baseURL = config.public.strapiBaseURL;

const { data, error } = await useFetch(props.apiUrl);

if (data.value) {
  pageData.value = data.value;

  const attributes = pageData.value.attributes;

  if (attributes?.heroimage?.data) {
    let heroImage;

    if (Array.isArray(attributes.heroimage.data)) {
      // If data is an array, use the first element
      heroImage = attributes.heroimage.data[0].attributes;
    } else {
      // If data is an object, use it directly
      heroImage = attributes.heroimage.data.attributes;
    }

    if (heroImage?.formats?.large?.url) {
      imageUrl.value = `${baseURL}${heroImage.formats.large.url}`;
    } else {
      console.error('Large format of the hero image not found.');
    }
  } else {
    console.error('Hero image data is not available.');
  }

} else {
  console.error('Error fetching page data:', error);
}
</script>

<style scoped>
/* Add any additional styles */
</style>
