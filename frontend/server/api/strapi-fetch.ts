// /server/api/strapi-fetch.ts

interface MenuOption {
    id: number;
    link: string;
    menu: boolean;
    footer: boolean;
}

interface PageAttributes {
    Name: string;
    MenuOptionen: MenuOption;
}

interface Page {
    id: number;
    attributes: PageAttributes;
}

interface StrapiResponse {
    data: Page[];
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const apiKey = config.strapiApiKey;
    const baseURL = config.public.strapiBaseURL || 'http://localhost:1337/api';

    // Fetch data from Strapi
    const response = await $fetch(`${baseURL}/pages?fields[0]=Name&populate[0]=MenuOptionen`, {
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
