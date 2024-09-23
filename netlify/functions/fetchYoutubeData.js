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
    const { q } = event.queryStringParameters;
    console.log("여기다 여기 -------", api_key);
    console.log(process.env.YOUTUBE_API_KEY);

    if (!q) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: "Query parameter 'q' is required" }),
        };
    }

    try {
        const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search`, {
            headers: {
                "Content-Type": "application/json",
            },

            params: {
                part: "snippet",
                maxResult: 48,
                q: q,
                type: "video",
                key: api_key,
            },
        });

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