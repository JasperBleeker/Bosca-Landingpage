<template>
    <div v-if="locationsData && locationsData.length > 0" class="bg-white text-moss">
        <div v-for="location in locationsData" :key="location.id"
            :class="location.attributes.is_highlight ? 'highlighted-section' : 'regular-section'"
            class="py-10 lg:flex lg:justify-between lg:px-28 lg:py-20">
            <div>
                <h2 class="font-heading-3 font-bold text-2xl lg:text-3xl text-center pt-10 pb-4 lg:text-left lg:pt-0">{{
                    location.attributes.title }}</h2>
                <p class="font-body px-8 pb-6 lg:max-w-xl lg:px-0 lg:text-lg">{{ location.attributes.description }}</p>
            </div>
            <div class="px-8 lg:w-1/2 grid grid-cols-2 gap-4">
                <div v-for="(picture, index) in location.attributes.locationpictures.data" :key="index"
                    :class="index === 0 ? 'col-span-2' : ''">
                    <img :src="`${baseURL}${picture.attributes.formats.medium.url}`" alt="picture of poi"
                        class="h-full w-full object-cover" />
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
    is_highlight: boolean;
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

<style scoped>
.highlighted-section {
    background-color:#23291C;
    color: white;
}

.regular-section {
    background-color: white;
    color: black;
}
</style>
