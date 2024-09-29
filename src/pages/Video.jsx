import React, { useEffect, useState } from "react";
import Main from "../components/section/Main";
import { useParams } from "react-router-dom";
import { fetchYoutubeAPI } from "../utils/api";

const Video = () => {
    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);
    console.log(videoId);

    useEffect(() => {
        fetchYoutubeAPI().then((data) => {
            setVideoDetail(data.items[0]);
        });
    }, [videoId]);
    return (
        <Main title="유튜브 비디오 영상" description="유튜브 비디오 영상을 볼 수 있습니다.">
            <section>{videoDetail}</section>
        </Main>
    );
};

export default Video;
