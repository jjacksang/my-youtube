import React, { Suspense, useEffect, useState } from "react";
import Main from "../components/section/Main";
import { useParams } from "react-router-dom";
import VideoSearch from "../components/videos/VideoSearch";
import VideoSkeleton from "../components/skeleton/video-skeleton";
import { fetchSearchVideo } from "../utils/api";

// Skeleton 16개 기준 생성
const SkeletonList = ({ count }) => {
    return new Array(count)
        .fill(0)
        .map((_, idx) => <VideoSkeleton key={`video-skeleton-${idx}`} />);
};

const Search = () => {
    const { searchId } = useParams();
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        // 배포 버전
        fetchSearchVideo(searchId)
            .then((result) => {
                setVideos(result.data || []);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("error fetching search results:", error);
                setIsLoading(false);
            });
    }, [searchId]);

    console.log(videos);

    return (
        <Main title="유투브 검색" description="유튜브 검색 결과 페이지입니다.">
            <section id="searchPage">
                <div className="video__inner search">
                    {isLoading ? (
                        <>
                            <SkeletonList count={16} />
                        </>
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
