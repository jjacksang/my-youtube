import axios from "axios";

export const BASE_URL = "/.netlify/functions/fetchYoutubeData";
export const fetchYoutubeAPI = async (videoId) => {
    const res = await axios.get(`${BASE_URL}?id=${videoId}`);
    console.log(res);
    return res;
};

export const fetchSearchVideo = async (searchId, maxResults = 20, nextPageToken) => {
    try {
        const res = await axios.get(`${BASE_URL}?q=${encodeURIComponent(searchId)}`, {
            params: {
                q: searchId,
                maxResults: maxResults,
                nextPageToken: nextPageToken || undefined,
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

export const fetchVideoData = async (videoId) => {
    console.log(videoId);
    try {
        const res = await axios.get(`${BASE_URL}?videoId=${videoId}`);
        return res.data;
    } catch (error) {
        console.error("Video > Error fetching video data :", error);
        throw error;
    }
};

export const fetchChannel = async (channelId) => {
    try {
        const res = await axios.get(`${BASE_URL}`, {
            params: {
                channelId: channelId,
            },
        });

        return res.data;
    } catch (error) {
        console.error("Channel > Error fetching channel data: ", error);
        throw error;
    }
};

export const fetchChannelVideo = async (channelId, searchType, nextPageToken) => {
    try {
        const res = await axios.get(`${BASE_URL}`, {
            params: {
                channelId: channelId,
                searchType: searchType,
                nextPageToken: nextPageToken || undefined,
            },
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Channel Data > Error fetching channel data: ", error);
        throw error;
    }
};
