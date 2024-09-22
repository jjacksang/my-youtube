import axios from "axios";

// export const BASE_URL = axios.create({
//     baseURL: "https://www.googleapis.com/youtube/v3",
// });

// export const fetchSearchVideo = async (searchId, url) => {
//     const api_key = process.env.REACT_APP_YOUTUBE_API_KEY;
//     const { data } = await BASE_URL.get(
//         `/search?part=snippet&maxResults=48&q=${searchId}&type=video&key=${api_key}`
//     );

//     console.log(data);
//     return data;
// };

export const fetchSearchVideo = async (searchId) => {
    try {
        const res = await axios.get(
            `/netlify/functions/fetchYoutubeData?q=${encodeURIComponent(searchId)}`,
            {
                withCredentials: true,
            }
        );

        console.log("server : ", res);
        return res;
    } catch (error) {
        console.error("Client : Error fetching data => ", error);
        throw error;
    }
};
