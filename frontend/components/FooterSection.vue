<template>
    <footer class="bg-moss text-white p-4 display: flex flex-col w-full items-center md:flex-row justify-between">
        <!-- Footer content -->
        <div class="w-36 md:w-32">
            <NuxtLink to="/">
                <FooterLogo />
            </NuxtLink>

        </div>
        <div class=" display: flex flex-col my-10 font-body font-bold text-2xl md:flex-row md:text-lg">
            <NavBar />
        </div>
        
        <div>
            <NuxtLink to="/">Impressum</NuxtLink>
        </div>

    </footer>
</template>

<script setup lang="ts">

</script>

<style lang="css" scoped></style>