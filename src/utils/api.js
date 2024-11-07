import axios from "axios";

export const BASE_URL = "/.netlify/functions/fetchYoutubeData";

// 캐시데이터 저장
const cache = {
    searchCache: {},
    channelCache: {},
};

export const fetchSearchVideo = async (
    searchId,
    nextPageToken,
    maxResults = 24
) => {
    // 캐시 고유 키 생성
    const cacheKey = `search-${searchId}-${nextPageToken || ""}`;

    // 캐시값이 있으면 그대로 캐시값을 돌려줌
    if (cache.searchCache[cacheKey]) {
        console.log("Fetcing from cache: ", cacheKey);
        return cache.searchCache[cacheKey];
    }

    try {
        const res = await axios.get(
            `${BASE_URL}?q=${encodeURIComponent(searchId)}`,
            {
                params: {
                    q: searchId,
                    pageToken: nextPageToken || "",
                    maxResults: maxResults,
                },
            }
        );

        console.log("nextPageToken: ", nextPageToken);
        console.log("server : ", res.data.items);
        console.log("res: ", res);

        if (!res.data || !res.data.items) {
            console.error("Unexpected response structure:", res.data);
            throw new Error("Unexpected response structure");
        }

        // 캐시에 데이터 저장
        cache.searchCache[cacheKey] = res.data;

        // 일정 시간 이후 캐시 삭제
        setTimeout(() => {
            delete cache.searchCache[cacheKey];
            console.log(
                `Cache for ${cacheKey} has been removed after timeout.`
            );
        }, 60000);

        return res.data;
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

export const fetchChannelVideo = async (
    channelId,
    searchType,
    nextPageToken,
    maxResults = 24
) => {
    const cacheKey = `channel-${channelId}-${nextPageToken || ""}`;

    if (cache.channelCache[cacheKey]) {
        return cache.channelCache[cacheKey];
    }

    try {
        const res = await axios.get(`${BASE_URL}`, {
            params: {
                channelId: channelId,
                searchType: searchType,
                pageToken: nextPageToken || "",
                maxResults: maxResults,
                type: "video",
            },
        });
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error("Channel Data > Error fetching channel data: ", error);
        throw error;
    }
};
