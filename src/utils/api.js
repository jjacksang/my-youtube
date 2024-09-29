import axios from "axios";

export const BASE_URL = "/.netlify/functions/fetchYoutubeData";
export const fetchYoutubeAPI = async (url) => {
    const { data } = await axios.get(`${BASE_URL}/${url}`);
    console.log(data);
    return data;
};

export const fetchSearchVideo = async (searchId) => {
    try {
        const res = await axios.get(`${BASE_URL}?q=${encodeURIComponent(searchId)}`, {
            withCredentials: true,
        });

        console.log("server : ", res.data.items);
        return res;
    } catch (error) {
        console.error("Client : Error fetching data => ", error);
        throw error;
    }
};
