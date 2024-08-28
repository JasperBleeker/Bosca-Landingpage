<template>
    
        <div>
            <ImpressumContent impressumUrl="/api/impressum-fetch" />

        </div>
    
</template>

<script setup lang="ts">
// You don't need to import NuxtLayout; just set the layout directly in the page metadata.
definePageMeta({
  layout: 'impressum-layout', // Replace with your desired layout name
});
</script>

<style scoped></style>