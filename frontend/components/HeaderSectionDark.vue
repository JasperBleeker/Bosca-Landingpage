<template>
    <header class="">
        <div class="grid items-center w-full grid-cols-12 px-4 mx-auto fixed bg-white">
            <div class="col-span-3">
                <NuxtLink to="/" class="h-24">
                    <LogoDark class="h-24 py-4" />
                </NuxtLink>
            </div>
            <div class="col-span-8">
                <NavBar class="hidden lg:block text-moss" />
            </div>


            <button title="Menu" class="col-span-1 lg:hidden" @click="mobileMenuOpen = true">
                <svg viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M28 1.95224C28 1.32762 27.5299 0.821266 26.95 0.821266H5.25C4.67012 0.821266 4.2 1.32762 4.2 1.95224C4.2 2.57685 4.67012 3.08321 5.25 3.08321H26.95C27.5299 3.08321 28 2.57685 28 1.95224ZM28 20.0478C28 19.4232 27.5299 18.9168 26.95 18.9168H9.45C8.87012 18.9168 8.4 19.4232 8.4 20.0478C8.4 20.6724 8.87012 21.1787 9.45 21.1787H26.95C27.5299 21.1787 28 20.6724 28 20.0478ZM26.95 9.86903C27.5299 9.86903 28 10.3754 28 11C28 11.6246 27.5299 12.131 26.95 12.131H1.05C0.470121 12.131 0 11.6246 0 11C0 10.3754 0.470121 9.86903 1.05 9.86903H26.95Z"
                        fill="#23291C" />
                </svg>

            </button>
        </div>
        <transition name="menu">
            <MobileMenu v-if="mobileMenuOpen" @close="mobileMenuOpen = false" />
        </transition>
    </header>
</template>

<script setup>
const mobileMenuOpen = ref(false);

</script>

<style>
.menu-enter-active,
.menu-leave-active {
    transition: opacity 0.5s ease;
}

.menu-enter-from,
.menu-leave-to {
    opacity: 0;
}
</style>