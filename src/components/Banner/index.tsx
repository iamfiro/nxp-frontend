import React from 'react';
import style from './style.module.scss';

// 상수 정의
const IMAGE_SRC = 'https://via.placeholder.com/400x400';

interface TextContentProps {
    category: React.ReactNode;
    title: React.ReactNode;
    description: React.ReactNode;
}

/**
 * TextContent Component
 * @param {TextContentProps} props
 * @returns {JSX.Element}
 * 배너의 텍스트 콘텐츠를 렌더링합니다.
 */
const TextContent = ({ category, title, description }: TextContentProps): JSX.Element => (
      <article className={style.textContent}>
          <div>
              <span className={style.category}>{category}</span>
              <span
                  className={style.title}
                  dangerouslySetInnerHTML={{ __html: title || '' }}
              />
          </div>
          <p
              className={style.description}
              dangerouslySetInnerHTML={{ __html: description || '' }}
          />
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
                              <TextContent title={`실무에서 쓰이는<br/>AI는 어떻게 다를까`} category={'AI 캠프 오픈'} description={'AI 캠프에서는 실무에서 쓰이는 AI를 배울 수 있습니다. <br/> 실제 문제를 해결해보세요.'} />
                        </div>
                        <img src={IMAGE_SRC} alt="banner image" />
                  </div>
            </div>
      );
}

export default Banner;