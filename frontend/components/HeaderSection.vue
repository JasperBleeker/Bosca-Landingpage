<template>
  <header :class="{ 'bg-moss': isScrolled }"
    class="fixed top-0 left-0 w-full z-50 transition-colors ease-in-out duration-300 delay-150">
    <div class="grid items-center w-full grid-cols-12 px-4 mx-auto">
      <div class="col-span-3">
        <NuxtLink to="/" class="h-24">
          <Logo class="h-24 py-4" />
        </NuxtLink>
      </div>
      <div class="col-span-8">
        <NavBar class="hidden lg:block text-white" />
      </div>

      <button :title="mobileMenuOpen ? 'Close Menu' : 'Open Menu'"
        :aria-label="mobileMenuOpen ? 'Close Menu' : 'Open Menu'" class="col-span-1 lg:hidden"
        @click="mobileMenuOpen = !mobileMenuOpen" :aria-expanded="mobileMenuOpen.toString()"
        aria-controls="mobile-menu">
        <svg class="h-6" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M28 1.95226C28 1.32765 27.5299 0.821289 26.95 0.821289H5.25C4.67012 0.821289 4.2 1.32765 4.2 1.95226C4.2 2.57687 4.67012 3.08323 5.25 3.08323H26.95C27.5299 3.08323 28 2.57687 28 1.95226ZM28 20.0478C28 19.4232 27.5299 18.9168 26.95 18.9168H9.45C8.87012 18.9168 8.4 19.4232 8.4 20.0478C8.4 20.6724 8.87012 21.1788 9.45 21.1788H26.95C27.5299 21.1788 28 20.6724 28 20.0478ZM26.95 9.86905C27.5299 9.86905 28 10.3754 28 11C28 11.6246 27.5299 12.131 26.95 12.131H1.05C0.470121 12.131 0 11.6246 0 11C0 10.3754 0.470121 9.86905 1.05 9.86905H26.95Z"
            fill="white" />
        </svg>
      </button>

    </div>
    <transition name="menu">
      <MobileMenu v-if="mobileMenuOpen" @close="mobileMenuOpen = false" />
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

// Reactive state for managing the mobile menu and scroll state
const mobileMenuOpen = ref(false);
const isScrolled = ref(false);

// Function to handle scroll and detect when the header passes the hero section
const handleScroll = () => {
  const heroSection = document.querySelector('#hero-section');
  if (!heroSection) {
    console.warn('Hero section not found. Check the selector used.');
    return;
  }

  const heroBottom = heroSection.offsetHeight;
  isScrolled.value = window.scrollY > heroBottom;
};

// Debounce function to limit the rate of `handleScroll` execution
const debounce = (func, delay) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(func, delay);
  };
};

// Attach the debounced scroll handler
const debouncedHandleScroll = debounce(handleScroll, 50);

onMounted(() => {
  window.addEventListener('scroll', debouncedHandleScroll);
  handleScroll(); // Initial check if the page is already scrolled
});

onUnmounted(() => {
  window.removeEventListener('scroll', debouncedHandleScroll);
});

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