# 나만의 유튜브 사이트 만들기

이 강의는 React 프레임워크와 YouTube API를 이용하여 자신만의 간단한 영상 사이트를 만듭니다. React의 기본 개념을 이해하고, 컴포넌트를 구조화하고 상태를 관리하는 방법을 학습하며,
YouTube Data API를 활용하여 외부 데이터를 가져오는 방법을 익히고, API 응답을 처리하여 사용자에게 의미 있는 정보를 제공하는 방법을 이해합니다.

## 만났던 문제점 -> 해결

1. Netlify를 이용한 배포환경에서 테스트 도중 maxResults값이 기본으로 제공되는 5로 설정되어 검색에 대한 정보가 5개밖에 나오지 않는 상황 발생

**해결 과정**

-   utils/api.js 파일 내에 예외 처리문 추가 작성
-   netlify/functions/fetchYoutubeData.js에 작성되어 있는 maxResult => maxResults로 오타 수정

2. style.scss에 **skeleton.scss를 적용 이후 **channel.scss를 추가하니 모듈을 추가할 수 없는 오류 발생

**해결 과정**

-   skeleton.scss에 있는 코드를 \_\_video.scss로 옮김
-   주석을 통해 skeleton에 적용될 코드를 분리

## 완성작 보기

미리보기 :

## 사용스택

## 프로젝트 실행

-   react를 설치합니다. `npx create-react-app 타이틀`
-   react-router-dom을 설치합니다. `npm install react-router-dom`
-   axios를 설치합니다. `npm install axios`
-   react-icons을 설치합니다. `npm install react-icons`
-   react-player를 설치합니다. `npm install react-player`
-   sass를 설치합니다. `npm install sass`
-   react-helmet-async를 설치합니다. `npm install react-helmet-async`
-   swiper를 설치합니다. `npm install swiper`
