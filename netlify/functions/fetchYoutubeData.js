const axios = require("axios");

exports.handler = async (event, context) => {
    const api_key = process.env.YOUTUBE_API_KEY;
    const { q } = JSON.parse(event.body);

    try {
        const res = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: "snippet",
                marResult: 48,
                q: q,
                type: "video",
                key: api_key,
            },
        });

        console.log(res.data);
        return {
            statusCode: 200,
            body: JSON.stringify(res.data),
        };
    } catch (error) {
        console.error("API요청 오류", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error fetching Data. from netlify",
                error: error.message,
            }),
        };
    }
};
