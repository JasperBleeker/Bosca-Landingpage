<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-svh">
    <h1 class="text-4xl font-heading-1">{{ error.statusCode }}</h1>
    <h2 class="font-heading-3 text-2xl my-10">Hoppla! Etwas ist schief gelaufen...</h2>
    <p class="font-body my-10">{{ error?.statusMessage }}</p>
    <NuxtLink class="bg-shamrock text-white hover:bg-shamrockdark transition-colors delay-100 duration-200 ease-in-out py-2 w-40 mx-auto  rounded-full font-bold text-center" to="/">Zurück</NuxtLink>
  </div>
</template>
