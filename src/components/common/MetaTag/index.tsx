import { useEffect } from "react";

// 메타 태그 파라미터의 타입 정의
interface MetaTags {
  title?: string; // 제목
  description?: string; // 설명
  imageUrl?: string; // 이미지 URL
}

const setMetaTags = ({
  title = "기본 타이틀",
  description = "기본 설명",
  imageUrl = "기본 사이트 이미지 경로",
}: MetaTags): void => {
  useEffect(() => {
    // DOM이 사용 가능한지 확인
    if (typeof window === "undefined" || !window.document) return;

    // 메타 태그 속성을 설정하는 헬퍼 함수
    const setMetaTagContent = (property: string, content: string) => {
      const metaTag = document.querySelector<HTMLMetaElement>(
        `meta[property="${property}"]`
      );

      if (metaTag) {
        // 메타 태그가 존재하면 content 속성 설정
        metaTag.setAttribute("content", content);
      } else {
        // 메타 태그가 없으면 생성 후 추가
        const newMetaTag = document.createElement("meta");
        newMetaTag.setAttribute("property", property);
        newMetaTag.setAttribute("content", content);
        document.head.appendChild(newMetaTag);
      }
    };

    // 페이지 타이틀 설정
    document.title = title;

    // 제목 설정
    setMetaTagContent("og:title", title);

    // 설명 설정
    setMetaTagContent("og:description", description);

    // 이미지 설정
    setMetaTagContent("og:image", imageUrl);

    // URL 설정
    setMetaTagContent("og:url", window.location.href);
  }, [title, description, imageUrl]);
  // 의존성 배열에 title, description, imageUrl 추가
};

export default setMetaTags;
