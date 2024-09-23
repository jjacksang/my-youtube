import React from "react";
import { Link } from "react-router-dom";

const VideoSearch = ({ videos }) => {
    console.log(videos);
    return (
        <>
            {videos.map((video, index) => (
                <div className="video" key={index}>
                    <div className="video__thumb play__icon">
                        <Link
                            to={`/video/${video.items.id.videoId}`}
                            style={{
                                backgroundImage: `url(${video.items.snippet.thumbnails.high.url})`,
                            }}
                        ></Link>
                    </div>
                    <div className="video__info">
                        <div className="title">
                            <Link to={`/video.items/${video.items.id.videoId}`}>
                                {video.items.snippet.title}
                            </Link>
                        </div>
                        <div className="info">
                            <span className="author">
                                <Link to={`/channel/${video.items.snippet.channelId}`}>
                                    {video.items.snippet.channelTitle}
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default VideoSearch;
