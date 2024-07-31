import React, { useEffect, useState } from "react";
import Main from "../components/section/Main";
import { webdText } from "../components/data/webd";
import VideoCards from "../components/videos/VideoCards";

const Webd = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 300);
    }, []);

    const webdPageClass = loading ? "isLoading" : "isLoaded";

    return (
        <Main title="웹디자인 기능사" description="웹디자인 기능사 튜토리얼 강의입니다.">
            <section id="webdPage" className={webdPageClass}>
                <h2>😄 웹디자인기능사 한번에 따자!</h2>
                <div className="video__inner">
                    <VideoCards videos={webdText} />
                </div>
            </section>
        </Main>
    );
};

export default Webd;
