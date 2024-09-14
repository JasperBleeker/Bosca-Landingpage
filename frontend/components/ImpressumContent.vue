<template>
    <div class="px-8 pb-20 pt-40 lg:px-80 min-h-svh">
      <h1 class="font-heading-1 font-bold text-4xl text-center pb-20">{{ impressumsData?.attributes.title }}</h1>
      <p>{{ impressumsData?.attributes.text }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useFetch } from '#app';
  
  interface ImpressulgataAttributes {
    title: string;
    text: string;
  }
  
  interface Impressulgata {
    id: number;
    attributes: ImpressulgataAttributes;
  }
  
  const props = defineProps({
    impressumUrl: {
      type: String,
      required: true,
    },
  });
  
  const impressumsData = ref<Impressulgata | null>(null);
  
  // Adjusting the type to match the response structure
  const { data, error } = await useFetch<Impressulgata>(props.impressumUrl);
  
  if (error.value) {
    console.error('Error fetching impressum data:', error.value);
  } else if (data.value) {
    impressumsData.value = data.value; // Directly assign the response object
  } else {
    console.error('No impressum data found.');
  }
  
  console.log(data.value);
  console.log(impressumsData.value);
  </script>
  
  <style scoped>
  /* Your styles here */
  </style>
  