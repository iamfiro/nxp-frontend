import React from 'react';
import style from './style.module.scss';

// 상수 정의
const IMAGE_SRC = 'https://via.placeholder.com/400x400';

/**
 * TextContent Component
 * @returns {JSX.Element}
 * 배너의 텍스트 콘텐츠를 렌더링합니다.
 */
const TextContent: React.FC = (): JSX.Element => (
      <article className={style.textContent}>
          <div>
              <span className={style.category}>AI 캠프 오픈</span>
              <span className={style.title}>실무에서 쓰이는<br/>AI는 어떻게 다를까</span>
          </div>
          <p className={style.description}>
              AI 캠프에서는 실무에서 쓰이는 AI를 배울 수 있습니다. <br/>
              실제 문제를 해결해보세요.
          </p>
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
                        </div>
                        <img src={IMAGE_SRC} alt="banner image" />
                  </div>
            </div>
      );
}

export default Banner;