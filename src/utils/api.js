import axios from "axios";

export const BASE_URL = axios.create({
    baseURL:"https://www.googleapis.com/youtube/v3",
})

export const fetchSearchVideo = async (searchId, url) => {
    const api_key = process.env.REACT_APP_YOUTUBE_API_KEY;
    const { data } = await axios.get(
        `${BASE_URL}/search?part=snippet&maxResults=48&q=${searchId}&type=video&key=${api_key}`
    );

    console.log(data);
    return data;
};

// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=48&q=${searchId}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}
