<template>
  <div class="text-moss">
    <div v-if="imageUrl">
      <img :src="imageUrl" :alt="pageData?.attributes.title || 'Hero Image'"
        class="-z-20 top-0 h-full w-full overflow-hidden fixed object-cover">
    </div>

    <div class="h-svh flex flex-col items-center">
      <h1 class="text-4xl font-heading-1 text-white text-center mt-10 md:hidden">{{ pageData?.attributes.title }}</h1>
    </div>
    <div class="bg-white flex flex-col items-center">
      <h1 class="hidden md:block font-heading-1 text-6xl text-center pt-32">{{ pageData?.attributes.title }}</h1>
      <p class="font-body py-20 px-8 md:pt-6 md:w-3/5">{{ pageData?.attributes.description }}</p>
    </div>

    <!-- Slot for additional content on each page -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';
import { useFetch } from '#app';

interface HeroImageAttributes {
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
    data: HeroImageAttributes[] | { attributes: HeroImageAttributes };
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

const imageUrl = ref('');
const pageData = ref<PageData | null>(null);

const config = useRuntimeConfig(); 
const baseURL = config.public.strapiBaseURL;

const { data, error } = await useFetch(props.apiUrl);

if (data.value) {
  pageData.value = data.value as PageData;

  const attributes = pageData.value?.attributes;

  if (attributes?.heroimage?.data) {
    let heroImage;

    if (Array.isArray(attributes.heroimage.data)) {
      heroImage = attributes.heroimage.data[0].attributes;
    } else {
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
