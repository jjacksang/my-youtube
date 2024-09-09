import React, { useEffect, useState } from "react";
import Main from "../components/section/Main";
import { useParams } from "react-router-dom";

const Search = () => {
    const { searchId } = useParams();
    const [video, setVideo] = useState([]);

    useEffect(() => {
        fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=48&q=${searchId}&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
        )
            .then((res) =>
                res.json().then((result) => {
                    console.log(result);
                    setVideo(result.items);
                })
            )
            .catch((error) => console.log(error));
    }, [searchId]);
    return (
        <Main title="유투브 검색" description="유튜브 검색 결과 페이지입니다.">
            Search
        </Main>
    );
};

export default Search;
