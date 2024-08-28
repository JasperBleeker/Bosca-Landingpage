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
              :src="`${baseURL}${picture.attributes.formats.medium.url}`"
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
      <button @click="closeModal" class="absolute top-4 right-4 text-white text-3xl">✖</button>
      <button
        @click="prevImage"
        class="absolute left-4 text-white text-3xl"
        :disabled="currentIndex === 0"
      >
        ◀
      </button>
      <img
        :src="`${baseURL}${currentImage.attributes.formats.medium.url}`"
        :alt="currentImage.attributes.name"
        class="max-w-full max-h-full object-contain"
      />
      <button
        @click="nextImage"
        class="absolute right-4 text-white text-3xl"
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
  const baseURL = config.public.strapiBaseURL;
  
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
