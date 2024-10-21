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
            <section id="channel">
                <div className="channel__header" style={{ backgroundImage: `` }}>
                    <div className="circle">
                        <img />
                    </div>
                </div>
                <div className="channel__info">
                    <h3 className="title">title</h3>
                    <p className="desc">PPPPPP</p>
                    <div className="info">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </section>
        </Main>
    );
};

export default Channel;
