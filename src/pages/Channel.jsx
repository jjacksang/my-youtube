import React, { useEffect, useState } from "react";
import Main from "../components/section/Main";
import { useParams } from "react-router-dom";
import { fetchChannel } from "../utils/api";

const Channel = () => {
    const { channelId } = useParams();
    const [channelDetail, setChannelDetail] = useState();

    console.log(channelId);

    useEffect(() => {
        fetchChannel(channelId).then((data) => {
            setChannelDetail(data.items[0]);
        });
    }, [channelId]);

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
                            <span>{channelDetail.statistics.subscriberCount}</span>
                            <span>{channelDetail.statistics.videoCount}</span>
                            <span>{channelDetail.statistics.viewCount}</span>
                        </div>
                    </div>
                </section>
            )}
        </Main>
    );
};

export default Channel;
