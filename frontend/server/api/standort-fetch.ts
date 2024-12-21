import { computed } from "vue";

interface StrapiResponse {
    data: any[];
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const apiKey = config.strapiApiKey;
    const baseURL = config.public.strapiBaseURL;

    // Fetch data from Strapi
    const response = await $fetch(`${baseURL}/standort?populate=*`, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
    });

    // Assert the response type
    
    const data = response as StrapiResponse;

    // Return the data array
    return data.data;
});