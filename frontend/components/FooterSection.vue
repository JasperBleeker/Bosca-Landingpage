<template>
    <footer class="bg-moss text-white p-4 flex flex-col w-full items-center lg:flex-row justify-between z-50">
        <!-- Footer content -->
        <div class="w-36 lg:w-32">
            <NuxtLink to="/">
                <FooterLogo />
            </NuxtLink>
        </div>
        <div class="flex flex-col my-10 font-body font-bold text-2xl lg:flex-row lg:text-lg">
            <NavBar />
        </div>
        <div class="pb-8 lg:pb-0">
            <NuxtLink to="/impressum">Impressum</NuxtLink>
        </div>
    </footer>

</template>

<script setup>

</script>

<style scoped></style>