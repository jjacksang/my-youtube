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
    const { q, videoId, channelId, searchType, pageToken } = event.queryStringParameters;
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
                    maxResults: event.queryStringParameters.maxResults || 24,
                    q: q,
                    type: "video",
                    pageToken: pageToken || "",
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
            console.log(">> This is pageToken: ", pageToken);

            res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    part: "snippet",
                    channelId: channelId,
                    // type: "playlist",
                    maxResults: event.queryStringParameters.maxResults || 24,
                    order: "date",
                    pageToken: pageToken || "",
                    key: api_key,
                },
            });
        }

        console.log(">> Response pageInfo: ", res.data.pageInfo);
        console.log(">> Response nextPageToken: ", res.data.nextPageToken);
        console.log(">> First items response: ", res.data.items[0]?.snippet?.title);
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
