<template>
    <div class="bg-moss pt-4 md:pt-10">
        <div v-if="filteredThumbnailsData.length" class="grid gap-4 pb-4 md:grid-cols-2">
            <div v-for="room in filteredThumbnailsData" :key="room.id">
                <img
                    v-if="room.attributes.thumbnail.data" 
                    :src="baseURL + room.attributes.thumbnail.data.attributes.formats.medium.url"
                    :alt="room.attributes.thumbnail.data.attributes.name"
                    class="px-8 max-h-60 w-full object-cover md:px-0 md:max-h-44"
                >
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
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

interface RoomThumbnailsAttributes {
    name: string;
    formats: {
        medium: PictureFormat;
    };
}

interface RoomThumbnailsDataAttributes {
    title: string;
    thumbnail: {
        data: {
            attributes: RoomThumbnailsAttributes;
        } | null;
    };
}

interface RoomThumbnailsData {
    id: number;
    attributes: RoomThumbnailsDataAttributes;
}

const props = defineProps({
    thumbnailUrl: {
        type: String,
        required: true,
    }
});

const thumbnailsData = ref<RoomThumbnailsData[] | null>(null);
const filteredThumbnailsData = ref<RoomThumbnailsData[]>([]);

const config = useRuntimeConfig();
const baseURL = config.public.strapiBaseURL;

try {
    const { data, error } = await useFetch<RoomThumbnailsData[]>(props.thumbnailUrl);

    if (error.value) {
        console.error('Error fetching room thumbnails data:', error.value);
    } else {
        console.log('Fetched room thumbnails data:', data.value);

        if (data.value && data.value.length > 0) {
            thumbnailsData.value = data.value;

            // Log the raw thumbnails data
            console.log('Raw thumbnails data:', thumbnailsData.value);

            // Filter out rooms that don't have a valid thumbnail
            filteredThumbnailsData.value = thumbnailsData.value.filter(room => {
                const thumbnailExists = room.attributes.thumbnail?.data;

                if (!thumbnailExists) {
                    console.warn(`Room with ID ${room.id} does not have a valid thumbnail. Skipping.`);
                }

                return thumbnailExists;
            });

            // Log the filtered thumbnails data
            console.log('Filtered thumbnails data:', filteredThumbnailsData.value);
        } else {
            console.warn('No room thumbnails data found in the response.');
        }
    }
} catch (fetchError) {
    console.error('Unexpected error during data fetching:', fetchError);
}

if (!filteredThumbnailsData.value.length) {
    console.warn('No valid thumbnails found to display.');
}
</script>

<style scoped>
/* Your styles here */
</style>
