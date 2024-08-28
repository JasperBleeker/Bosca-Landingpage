<template>
    <footer class="bg-moss text-white p-4 display: flex flex-col w-full items-center md:flex-row justify-between z-50">
        <!-- Footer content -->
        <div class="w-36 md:w-32">
            <NuxtLink to="/">
                <FooterLogo />
            </NuxtLink>

        </div>
        <div class=" display: flex flex-col my-10 font-body font-bold text-2xl md:flex-row md:text-lg">
            <NavBar />
        </div>
        
        <div class="pb-8">
            <NuxtLink to="/impressum">Impressum</NuxtLink>
        </div>

    </footer>
</template>

<script setup>

</script>

<style scoped></style>