import React, { Suspense, useEffect, useState } from "react";
import Main from "../components/section/Main";
import { useParams } from "react-router-dom";
import VideoSearch from "../components/videos/VIdeoSearch";
import { fetchSearchVideo } from "../utils/api";

const Search = () => {
    const { searchId } = useParams();
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetchSearchVideo(searchId)
            .then((result) => {
                console.log(result.items);
                console.log(result);
                setVideos(result.items || []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("error fetching search results:", error);
                setIsLoading(false);
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
                    {isLoading ? (
                        <div>Loading... </div>
                    ) : (
                        <Suspense fallback={<div>Loading...........</div>}>
                            <VideoSearch videos={videos} />
                        </Suspense>
                    )}
                </div>
            </section>
        </Main>
    );
};

export default Search;
