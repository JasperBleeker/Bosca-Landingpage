<template>
    <div v-if="locationsData && locationsData.length > 0" class="bg-white text-moss">
        <div v-for="location in locationsData" :key="location.id" class="py-10 md:flex md:justify-between md:px-28 md:py-20">
            <div>
                <h2 class="font-heading-3 font-bold text-2xl md:text-3xl text-center pt-10 pb-4 md:text-left md:pt-0">{{ location.attributes.title }}</h2>
                <p class="font-body px-8 pb-6 md:max-w-xl md:px-0 md:text-lg">{{ location.attributes.description }}</p>
            </div>
            <div class="px-8 md:w-1/2 grid grid-cols-2 gap-4">
                <div
                    v-for="(picture, index) in location.attributes.locationpictures.data"
                    :key="index"
                    :class="index === 0 ? 'col-span-2' : ''"
                >
                    <img
                        :src="`${baseURL}${picture.attributes.formats.medium.url}`"
                        alt="picture of poi"
                        class="h-full w-full object-cover"
                    />
                </div>
            </div>
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

interface LocationPicturesAttributes {
    name: string;
    formats: {
        medium: PictureFormat;
    };
}

interface LocationDataAttributes {
    title: string;
    description: string;
    locationpictures: {
        data: Array<{ attributes: LocationPicturesAttributes }>;
    };
}

interface LocationData {
    id: number;
    attributes: LocationDataAttributes;
}

const props = defineProps({
    apiUrl: {
        type: String,
        required: true,
    }
});

const locationsData = ref<LocationData[] | null>(null);

const config = useRuntimeConfig();
const baseURL = config.public.strapiBaseURL;

const { data, error } = await useFetch<LocationData[]>(props.apiUrl);

console.log(data.value);

if (error.value) {
    console.error('Error fetching location data:', error.value);
} else if (data.value && data.value.length > 0) {
    locationsData.value = data.value;
} else {
    console.error('No location data found.');
}
</script>

<style scoped></style>
