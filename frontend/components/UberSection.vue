<template>
    <div class="bg-white grid px-8 py-20 md:grid-cols-2 md:grid-rows-5 md:px-40 md:gap-x-32">
        <img :src="`${baseURL}${uberData?.attributes.locationimage.data?.attributes.formats.medium.url}`" alt=""
            class="order-1 pb-8 md:col-span-1 md:row-span-5 md:order-2">
        <h2
            class="order-2 font-heading-3 text-center text-2xl font-bold pb-8 md:text-3xl md:col-span-1 md:order-1 md:text-left self-end">
            {{ uberData?.attributes.title }}</h2>
        <p class="order-3 font-body pb-4 md:col-span-1 md:order-2">{{ uberData?.attributes.description }}</p>

        <NuxtLink to="/ueber"
            class="order-4 bg-shamrock hover:bg-shamrockdark transition-colors delay-100 duration-200 ease-in-out text-white block text-center py-2 w-40 mx-auto rounded-full font-bold max-h-10 md:mx-0 md:col-span-1 md:order-3">
            <div>
                <p class="text-center">Über mich</p>
            </div>
        </NuxtLink>

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

interface UberPictureAttributes {
    name: string;
    formats: {
        medium: PictureFormat;
    };
}

interface UberDataAttributes {
    title: string;
    name: string;
    description: string;
    locationimage: {
        data: {
            attributes: UberPictureAttributes;
        } | null;
    };
}

interface UberData {
    id: number;
    attributes: UberDataAttributes;
}

const props = defineProps({
    uberUrl: {
        type: String,
        required: true,
    }
});

const uberData = ref<UberData | null>(null);
const config = useRuntimeConfig();
const baseURL = config.public.strapiBaseURL;

try {
    const { data, error } = await useFetch<UberData>(props.uberUrl);

    if (error.value) {
        console.error('Error fetching uber data:', error.value);
    } else if (data.value) {
        uberData.value = data.value;
    }
} catch (error) {
    console.error(error);
}

</script>

<style scoped></style>