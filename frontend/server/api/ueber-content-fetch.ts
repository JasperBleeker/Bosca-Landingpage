import { computed } from "vue";

interface StrapiResponse {
    data: any[];
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const apiKey = config.strapiApiKey;
    const baseURL = config.public.strapiBaseURL;

    // Fetch data from Strapi
    const response = await $fetch(`${baseURL}/ueber?populate[0]=AboutMeSection&populate[1]=AboutMeSection.image&populate[2]=AboutMeSection.link`, {
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