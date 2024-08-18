<template>
    <div>
      <nav>
        
        <ul class="font-body font-bold text-2xl text-white flex flex-col items-center justify-end gap-24 text-center md:flex-row">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/haus">Haus</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/standort">Standort</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/ueber">Über Mich</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/kontakt">Kontakt</NuxtLink>
          </li>
        </ul>
      </nav>
  
      
    </div>
  </template>
  
  <script setup lang="ts">


  
  </script>
  
  <style scoped>
  .router-link-active {
      @apply text-shamrock;
  }
  </style>
  