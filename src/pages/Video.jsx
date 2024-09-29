import React, { useEffect, useState } from "react";
import Main from "../components/section/Main";
import { useParams } from "react-router-dom";
import { fetchYoutubeAPI } from "../utils/api";

const Video = () => {
    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);

    useEffect(() => {
        fetchYoutubeAPI(`videos?part=snippet,statistics&id=${videoId}`).then((data) => {
            console.log(data);
        });
    }, [videoId]);
    return (
        <Main title="유튜브 비디오 영상" description="유튜브 비디오 영상을 볼 수 있습니다.">
            <section></section>
        </Main>
    );
};

export default Video;
