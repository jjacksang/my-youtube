const axios = require("axios");

exports.handler = async (event, context) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    };

    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers,
            body: "",
        };
    }

    const api_key = process.env.YOUTUBE_API_KEY;
    const { q, videoId, channelId, searchType, nextPageToken } = event.queryStringParameters;
    console.log("여기다 여기 -------", api_key);
    console.log(process.env.YOUTUBE_API_KEY);

    if (!q && !videoId && !channelId) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: "Query parameter 'q' is required" }),
        };
    }

    try {
        let res;
        // 일단 검색
        if (q && !searchType) {
            res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    part: "snippet",
                    maxResults: (maxResults += 20),
                    q: q,
                    type: "video",
                    nextPageToken: nextPageToken || undefined,
                    key: api_key,
                },
            });

            // 비디오 검색 기능
        } else if (videoId) {
            res = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos`, {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    part: "snippet, statistics",
                    id: videoId,
                    key: api_key,
                },
            });

            // 채널 정보 조회
        } else if (channelId && !searchType) {
            res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels`, {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    part: "snippet, statistics",
                    id: channelId,
                    key: api_key,
                },
            });
        } else if (channelId && searchType === "playlist") {
            res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    part: "snippet",
                    channelId: channelId,
                    type: "playlist",
                    maxResults: (maxResults += 20),
                    order: "date",
                    nextPageToken: nextPageToken || undefined,
                    key: api_key,
                },
            });
        }

        console.log(res.data);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(res.data),
        };
    } catch (error) {
        console.error("API요청 오류", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                message: "Error fetching Data. from netlify",
                error: error.message,
                requestConfig: {
                    url: error.config?.url,
                    params: error.config?.params,
                },
            }),
        };
    }
};
