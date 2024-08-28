

interface StrapiResponse {
    data: any[];
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const apiKey = config.strapiApiKey;
    const baseURL = config.public.strapiBaseURL || 'http://localhost:1337/api';

    // Fetch data from Strapi
    const response = await $fetch(`${baseURL}/api/impressum?populate=*`, {
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