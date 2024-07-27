import React from "react";
import { Link } from "react-router-dom";

import { youtubeText } from "../data/youtube";
const Youtube = () => {
    return (
        <section id="website">
            <h2>😱 지금 이 코딩을 영상으로</h2>
            <div className="video__inner">
                {youtubeText.map((video, key) => (
                    <div className="video" key={key}>
                        <div className="video__thumb play__icon">
                            <Link to={`/video/${video.videoId}`}>
                                <img src={video.img} alt={video.title} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Youtube;
