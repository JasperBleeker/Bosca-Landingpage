<template>
    <div>
      <nav>
        
        <ul class="font-body font-bold text-xl flex flex-col items-center justify-end gap-6 lg:gap-20 text-center lg:flex-row">
          <li>
            <NuxtLink to="/" class="hover:text-shamrock transition-colors delay-100 duration-200 ease-in-out">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/haus" class="hover:text-shamrock transition-colors delay-100 duration-200 ease-in-out">Haus</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/standort" class="hover:text-shamrock transition-colors delay-100 duration-200 ease-in-out">Standort</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/ueber" class="hover:text-shamrock transition-colors delay-100 duration-200 ease-in-out">Über Mich</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/kontakt" class="hover:text-shamrock transition-colors delay-100 duration-200 ease-in-out">Kontakt</NuxtLink>
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
  