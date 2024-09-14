<template>
    <div class="bg-white grid px-8 py-20 lg:grid-cols-2 lg:px-40 md:px-20 lg:gap-x-32">
        <img :src="`${baseURL}${uberData?.attributes.locationimage.data?.attributes.formats.medium.url}`" alt=""
            class="order-1 pb-8 lg:col-span-1 lg:row-span-5 lg:order-2 md:mx-auto lg:mx-0 md:w-60 lg:w-full">
        <h2
            class="order-2 font-heading-3 text-center text-2xl font-bold pb-8 lg:text-3xl lg:col-span-1 lg:order-1 lg:text-left self-end">
            {{ uberData?.attributes.title }}</h2>
        <p class="order-3 font-body pb-4 lg:col-span-1 lg:order-2">{{ uberData?.attributes.description }}</p>

        <NuxtLink to="/ueber"
            class="order-4 bg-shamrock hover:bg-shamrockdark transition-colors delay-100 duration-200 ease-in-out text-white block text-center py-2 w-40 mx-auto rounded-full font-bold max-h-10 lg:mx-0 lg:col-span-1 lg:order-3">
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