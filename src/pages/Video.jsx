import React, { useEffect, useState } from "react";
import Main from "../components/section/Main";
import { useParams } from "react-router-dom";
import { fetchFromAPI } from "../utils/api";
import ReactPlayer from "react-player";

const Video = () => {
    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);
    console.log(videoId);

    // 배포버전
    useEffect(() => {
        fetchFromAPI(`videos?part=snippet&id=${videoId}`).then((data) => {
            setVideoDetail(data);
            console.log(data);
        });
    }, [videoId]);
    return (
        <Main title="유튜브 비디오 영상" description="유튜브 비디오 영상을 볼 수 있습니다.">
            <section>
                {videoDetail && (
                    <div>
                        <div>
                            <ReactPlayer
                                playing={true}
                                url={`https://www.youtube.com/watch?v=${videoId}`}
                                width="100%"
                                height="100%"
                                style={{ position: "absolute", top: 0, left: 0 }}
                            />
                        </div>
                        <div>
                            <h2>{videoDetail.snippet.title}</h2>
                        </div>
                    </div>
                )}
            </section>
        </Main>
    );
};

export default Video;
