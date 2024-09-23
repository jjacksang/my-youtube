import React, { Suspense, useEffect, useState } from "react";
import Main from "../components/section/Main";
import { useParams } from "react-router-dom";
import VideoSearch from "../components/videos/VIdeoSearch";
import { fetchSearchVideo } from "../utils/api";

const Search = () => {
    const { searchId } = useParams();
    const [videos, setVideos] = useState([]);
    // const [nextPageToken, setNextPageToken] = useState(null);

    useEffect(() => {
        fetchSearchVideo(searchId)
            .then((result) => setVideos(result.items || []))
            .catch((error) => {
                console.error("error fetching search results:", error);
            });
    }, [searchId]);

    console.log(videos);

    // const fetchMoreVideo = (query, pageToken) => {
    //     fetchSearchVideo();
    // };
    return (
        <Main title="유투브 검색" description="유튜브 검색 결과 페이지입니다.">
            <section id="searchPage">
                <div className="video__inner search">
                    <Suspense fallback={<div>Loading...........</div>}>
                        <VideoSearch videos={videos} />
                    </Suspense>
                </div>
            </section>
        </Main>
    );
};

export default Search;
