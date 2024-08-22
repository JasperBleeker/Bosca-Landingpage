<template>
    <div v-if="roomsData && roomsData.length > 0" class="text-moss bg-white">
        <div v-for="room in roomsData" :key="room.id" class="pb-8">
            <h2 class="font-heading-3 text-center text-3xl font-bold mb-6 pt-40">{{ room.attributes.title }}</h2>
            <div v-if="room.attributes.pictures.data.length > 0"  :class="getGridClass(room.attributes.pictures.data.length)">
                <div v-for="(picture, index) in room.attributes.pictures.data" :key="index" :class="getImageClass(index, room.attributes.pictures.data.length)">
                    <img :src="`${baseURL}${picture.attributes.formats.medium.url}`" :alt="picture.attributes.name"
                        class="w-full h-auto object-cover">
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRuntimeConfig, useFetch } from '#app';

interface PictureFormat {
    url: string;
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
    }
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

// Function to determine the grid class based on the number of images
const getGridClass = (imageCount: number) => {
    return imageCount === 1 ? 'grid grid-cols-1' : 'grid grid-cols-2 gap-4';
};

// Function to determine if an image should span across two columns
const getImageClass = (index: number, imageCount: number) => {
    if (imageCount === 1) {
        return 'col-span-1';
    }
    if (imageCount === 2) {
        return index === 0 ? 'col-span-2' : 'col-span-1';
    }
    if (imageCount > 2) {
        return index === 0 ? 'col-span-2' : 'col-span-1';
    }
    return '';
};
</script>

<style scoped>
/* Add any custom styling here */
</style>