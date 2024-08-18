<template>
    <div>
      <nav v-if="menuItems.length">
        
        <ul class="flex flex-col items-center justify-end gap-24 text-center md:flex-row">
          <li v-for="item in menuItems" :key="item.id" class="font-body font-bold text-2xl text-white">
            <nuxt-link :to="item.attributes.MenuOptionen.link">
              {{ item.attributes.Name }}
            </nuxt-link>
          </li>
        </ul>
      </nav>
  
      <div v-else-if="error">Error: {{ error.message }}</div>
      <div v-else>Loading...</div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  // Fetching navigation items
  const { data: navigationItems, error } = await useFetch('/api/strapi-fetch')
  
  // Computed property to filter items for the main menu
  const menuItems = computed(() =>
    navigationItems.value?.filter(item => item.attributes.MenuOptionen.menu) || []
  )
  </script>
  
  <style scoped>
  .router-link-active {
      @apply text-shamrock;
  }
  </style>
  