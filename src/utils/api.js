import axios from "axios";

export const BASE_URL = "/.netlify/functions/fetchYoutubeData";
export const fetchYoutubeAPI = async (videoId) => {
    const res = await axios.get(`${BASE_URL}?id=${videoId}`);
    console.log(res);
    return res;
};

export const fetchSearchVideo = async (searchId, maxResults = 20) => {
    try {
        const res = await axios.get(`${BASE_URL}?q=${encodeURIComponent(searchId)}`, {
            params: {
                q: searchId,
                maxResults: maxResults,
            },
        });

        console.log(res);
        console.log("server : ", res.data.items);

        if (!res.data || !res.data.items) {
            console.error("Unexpected response structure:", res.data);
            throw new Error("Unexpected response structure");
        }
        return res;
    } catch (error) {
        console.error("Client : Error fetching data => ", error);
        throw error;
    }
};

export const fetchFromAPI = async (url) => {
    try {
        const res = await axios.get(`${BASE_URL}/${url}`);
        if (!res.ok) {
            throw new Error("Fetch Error");
        }
    } catch (error) {
        console.error(error);
    }
};
