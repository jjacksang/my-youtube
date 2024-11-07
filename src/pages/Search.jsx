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
        setNextPageToken(null);

        // 배포 버전
        const fetchVideo = async () => {
            try {
                const { data, newNextPageToken: newNextPageToken } =
                    await fetchSearchVideo(searchId);
                setVideos(data.items);
                setNextPageToken(newNextPageToken);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetcing search results: ", error);
                setIsLoading(false);
            }
        };

        fetchVideo();
    }, [searchId]);

    console.log(videos);

    const handleLoadMore = async () => {
        try {
            const { data, nextPageToken: newNextPageToken } =
                await fetchSearchVideo(searchId, nextPageToken);

            console.log(data);
            setVideos((prev) => [...prev, ...data.items]);
            setNextPageToken(newNextPageToken);
        } catch (error) {
            console.error("VideoMore Error : ", error);
        }
    };

    return (
        <Main title="유투브 검색" description="유튜브 검색 결과 페이지입니다.">
            <section id="searchPage">
                <div className="video__inner search">
                    {isLoading ? (
                        <>
                            <SkeletonList count={24} />
                        </>
                    ) : (
                        <Suspense fallback={<div>Loading...........</div>}>
                            <VideoSearch videos={videos} />
                        </Suspense>
                    )}
                </div>
                <div className="video__more">
                    {nextPageToken && (
                        <button onClick={handleLoadMore}>더보기</button>
                    )}
                </div>
            </section>
        </Main>
    );
};

export default Search;
