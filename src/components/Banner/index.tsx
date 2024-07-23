import React from 'react';
import style from './style.module.scss';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

// 상수 정의
const IMAGE_SRC = 'https://via.placeholder.com/400x400';
const TOTAL_PAGES = 9;

/**
 * ArrowNavigation Component
 * @param {number} currentPage - 현재 페이지 번호
 * @returns {JSX.Element}
 * 화살표 네비게이션 컴포넌트를 렌더링합니다.
 */
const ArrowNavigation = ({ currentPage }: { currentPage: number }): JSX.Element => (
      <div className={style.navigation}>
            <IoIosArrowBack size={25} color={'var(--color-white)'} />
            <span>{`0${currentPage}`}</span>
            <span>/</span>
            <span>{`0${TOTAL_PAGES}`}</span>
            <IoIosArrowForward size={25} color={'var(--color-white)'} />
      </div>
);

/**
 * TextContent Component
 * @returns {JSX.Element}
 * 배너의 텍스트 콘텐츠를 렌더링합니다.
 */
const TextContent: React.FC = (): JSX.Element => (
      <article className={style.textContent}>
            <span className={style.category}>AI 캠프 오픈</span>
            <span className={style.title}>실무에서 쓰이는<br />AI는 어떻게 다를까</span>
      </article>
);

/**
 * Banner Component
 * @returns {JSX.Element}
 * 배너 전체를 렌더링합니다.
 */
const Banner: React.FC = (): JSX.Element => {
      return (
            <div className={style.banner}>
                  <div className={style.content}>
                        <div className={style.left}>
                              <TextContent />
                              <ArrowNavigation currentPage={5} />
                        </div>
                        <img src={IMAGE_SRC} alt="banner image" />
                  </div>
            </div>
      );
}

export default Banner;