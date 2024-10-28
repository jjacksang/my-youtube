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
    const [nextPageToken, setNextPageToken] = useState(null);

    useEffect(() => {
        setVideos([]);
        setIsLoading(true);

        // 배포 버전
        fetchSearchVideo(searchId)
            .then((result) => {
                setVideos((prev) => [...prev, ...result.items]);
                setIsLoading(false);
                setNextPageToken(result.nextPageToken);
            })
            .catch((error) => {
                console.error("error fetching search results:", error);
                setIsLoading(false);
            });
    }, [searchId]);

    console.log(videos);

    const handleLoadMore = async () => {
        if (nextPageToken) {
            try {
                const videoData = await fetchSearchVideo(searchId, nextPageToken);

                console.log(videoData);
                if (videoData?.items) {
                    setVideos((prev) => [...prev, ...videoData.items]);
                    setNextPageToken(videoData.nextPageToken);
                    console.log(videoData.nextPageToken);
                }
            } catch (error) {
                console.error("VideoMore Error : ", error);
            }
        }
    };

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
                <div className="video__more">
                    {nextPageToken && <button onClick={handleLoadMore}>더보기</button>}
                </div>
            </section>
        </Main>
    );
};

export default Search;
