import api from "@/lib/axios";

export const getPageData = async (slug: string | undefined) => {
    const response = await api.get(`/menu/pages-users/${slug}/`);
    return response.data;
};