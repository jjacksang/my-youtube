import React from "react";
import Main from "../components/section/Main";
import VideoSlider from "../components/videos/VideoSlider";

import Today from "../components/content/Today";
import Developer from "../components/content/Developer";

import { webdText } from "../components/data/webd";
import { websiteText } from "../components/data/website";
import { gsapText } from "../components/data/gsap";
import { portfolioText } from "../components/data/portfolio";
import { youtubeText } from "../components/data/youtube";
import { developerText } from "../components/data/developer";
import { todayText } from "../components/data/today";

const Home = () => {
    return (
        <Main title="CHOP의 유튜브" description="CHOP의 유튜브 사이트에 오신 것을 환영합니다.">
            <Today videos={todayText} id="today" />
            <Developer videos={developerText} title="😪 추천 개발자를 소개합니다." id="developer" />
            <VideoSlider videos={webdText} title="📙 Next.js 관련 영상!" id="webd" />
            <VideoSlider
                videos={websiteText}
                title="😛 웹표준 사이트 만들기 기초 다지기"
                id="website"
            />
            <VideoSlider videos={gsapText} title="🤓 GSAP 패럴랙스 효과를 하고 싶다면!" id="gsap" />
            <VideoSlider
                videos={portfolioText}
                title="🤗 포트폴리오 만드는 방법을 공유합니다!"
                id="portfolio"
            />
            <VideoSlider videos={youtubeText} title="🍽 내가 좋아하는 먹방 유튜버!" id="youtube" />
        </Main>
    );
};

export default Home;
