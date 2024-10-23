import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChannel, fetchChannelVideo } from "../utils/api";

import Main from "../components/section/Main";
import VideoSearch from "../components/videos/VideoSearch";

import { CiRead, CiBadgeDollar, CiMedal } from "react-icons/ci";

const Channel = () => {
    const { channelId } = useParams();
    const [channelDetail, setChannelDetail] = useState();
    const [channelVideos, setChannelVideos] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null);

    console.log(channelId);

    useEffect(() => {
        fetchChannel(channelId)
            .then((data) => {
                setChannelDetail(data.items[0]);

                return fetchChannelVideo(channelId, "playlist");
            })
            .then((videoData) => {
                setChannelVideos(videoData.data);
                setNextPageToken(videoData.data?.nextPageToken);
            });
    }, [channelId]);

    console.log(nextPageToken);

    const loadMoreVideo = async () => {
        if (nextPageToken) {
            try {
                const videoData = await fetchChannelVideo(channelId, "playlist", nextPageToken);

                if (videoData?.data?.items) {
                    setChannelVideos((prev) => {
                        const prevItems = Array.isArray(prev) ? prev : [];
                        return [...prevItems, ...videoData.data.items];
                    });
                }
            } catch (error) {
                console.error("PrevItems is not defiend", error);
            }
        }
    };

    return (
        <Main title="유튜브 채널" description="유튜브 채널페이지입니다.">
            {channelDetail && (
                <section id="channel">
                    <div
                        className="channel__header"
                        style={{
                            backgroundImage: `url(${channelDetail.snippet.thumbnails.medium.url})`,
                        }}
                    >
                        <div className="circle">
                            <img
                                src={channelDetail.snippet.thumbnails.high.url}
                                alt={channelDetail.snippet.title}
                            />
                        </div>
                    </div>
                    <div className="channel__info">
                        <h3 className="title">{channelDetail.snippet.title}</h3>
                        <p className="desc">{channelDetail.snippet.description}</p>
                        <div className="info">
                            <span>
                                <CiBadgeDollar />
                                {channelDetail.statistics.subscriberCount}
                            </span>
                            <span>
                                <CiMedal />
                                {channelDetail.statistics.videoCount}
                            </span>
                            <span>
                                <CiRead />
                                {channelDetail.statistics.viewCount}
                            </span>
                        </div>
                    </div>
                    <div className="channel__video video__inner search">
                        <VideoSearch videos={channelVideos} />
                    </div>
                    <div className="channel__more">
                        {nextPageToken && <button onClick={loadMoreVideo}>더 보기</button>}
                    </div>
                </section>
            )}
        </Main>
    );
};

export default Channel;
