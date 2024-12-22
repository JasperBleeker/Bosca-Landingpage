<template>
    <div v-if="roomsData && roomsData.length > 0" class="text-moss bg-white">
      <div v-for="room in roomsData" :key="room.id" class="pb-8">
        <h2 class="font-heading-3 text-center text-3xl font-bold mb-6 pt-40">{{ room.attributes.title }}</h2>
        <div
          v-if="room.attributes.pictures.data.length > 0"
          class="m-auto grid grid-cols-2 gap-4 max-w-2xl grid-auto-rows-min"
        >
          <div
            v-for="(picture, index) in room.attributes.pictures.data"
            :key="index"
            :class="getImageClass(picture, index, room.attributes.pictures.data)"
            @click="openModal(room.attributes.pictures.data, index)"
            class="cursor-pointer"
          >
            <img
              :src="`${picture.attributes.formats.medium.url}`"
              :alt="picture.attributes.name"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
        <div v-else>
          <p>No image available for this room.</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  
    <!-- Modal for viewing images in full screen -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
    >
      <button @click="closeModal" class="absolute top-4 right-4 text-white text-3xl">
        <svg class="h-8" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.208717 0.431187L0.31179 0.31179C0.689722 -0.0661416 1.28111 -0.10049 1.69785 0.208717L1.81724 0.31179L11 9.49407L20.1828 0.31179C20.5985 -0.103925 21.2725 -0.103925 21.6882 0.31179C22.1039 0.727505 22.1039 1.40153 21.6882 1.81724L12.5059 11L21.6882 20.1828C22.0662 20.5606 22.1005 21.1521 21.7912 21.5688L21.6882 21.6882C21.3103 22.0662 20.7189 22.1005 20.3022 21.7912L20.1828 21.6882L11 12.5059L1.81724 21.6882C1.40153 22.1039 0.727505 22.1039 0.31179 21.6882C-0.103925 21.2725 -0.103925 20.5985 0.31179 20.1828L9.49407 11L0.31179 1.81724C-0.0661416 1.43931 -0.10049 0.847924 0.208717 0.431187Z"
            fill="white" />
        </svg>
      </button>
      <button
        @click="prevImage"
        class="absolute left-4 text-white text-3xl drop-shadow-lg"
        :disabled="currentIndex === 0"
      >
        ◀
      </button>
      <img
        :src="`${currentImage.attributes.formats.medium.url}`"
        :alt="currentImage.attributes.name"
        class="max-w-full max-h-full object-contain"
      />
      <button
        @click="nextImage"
        class="absolute right-4 text-white text-3xl drop-shadow-lg"
        :disabled="currentIndex === currentImages.length - 1"
      >
        ▶
      </button>
    </div>
  </template>
  

  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRuntimeConfig, useFetch } from '#app';
  
  interface PictureFormat {
    url: string;
    width: number;
    height: number;
  }
  
  interface RoomPicturesAttributes {
    name: string;
    formats: {
      medium: PictureFormat;
    };
  }
  
  interface RoomDataAttributes {
    title: string;
    pictures: {
      data: Array<{ attributes: RoomPicturesAttributes }>;
    };
  }
  
  interface RoomData {
    id: number;
    attributes: RoomDataAttributes;
  }
  
  const props = defineProps({
    apiUrl: {
      type: String,
      required: true,
    },
  });
  
  const roomsData = ref<RoomData[] | null>(null);
  
  const config = useRuntimeConfig();
  
  const { data, error } = await useFetch<RoomData[]>(props.apiUrl);
  
  if (error.value) {
    console.error('Error fetching room data:', error.value);
  } else if (data.value && data.value.length > 0) {
    roomsData.value = data.value;
  } else {
    console.error('Room data is empty or not in expected format');
  }
  
  // Function to determine if the image is portrait or landscape based on aspect ratio
  const isPortrait = (picture: RoomPicturesAttributes) => {
    return picture.formats.medium.height > picture.formats.medium.width;
  };
  
  // Function to determine the appropriate class based on image aspect ratio and its position
  const getImageClass = (
    picture: { attributes: RoomPicturesAttributes },
    index: number,
    pictures: Array<{ attributes: RoomPicturesAttributes }>
  ) => {
    const portrait = isPortrait(picture.attributes);
  
    // Create variations by index or randomly for a dynamic layout
    if (index === 0 || (index % 4 === 0 && !portrait)) {
      return 'col-span-2 row-span-2 aspect-w-2 aspect-h-1 relative';
    }
  
    if (index % 2 === 0) {
      return 'col-span-1 row-span-2 aspect-w-1 aspect-h-2 relative';
    }
  
    return 'col-span-1 aspect-w-1 aspect-h-1 relative';
  };
  
  // Modal state management
  const isModalOpen = ref(false);
  const currentImages = ref<Array<{ attributes: RoomPicturesAttributes }>>([]);
  const currentIndex = ref(0);
  
  const openModal = (images: Array<{ attributes: RoomPicturesAttributes }>, index: number) => {
    currentImages.value = images;
    currentIndex.value = index;
    isModalOpen.value = true;
  };
  
  const closeModal = () => {
    isModalOpen.value = false;
  };
  
  const prevImage = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--;
    }
  };
  
  const nextImage = () => {
    if (currentIndex.value < currentImages.value.length - 1) {
      currentIndex.value++;
    }
  };
  
  const currentImage = computed(() => currentImages.value[currentIndex.value]);
  </script>
  

<style scoped>
/* Add any custom styling here if necessary */
</style>
