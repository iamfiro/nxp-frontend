import { useState, useEffect } from 'react';
// import axios from 'axios';

interface Banner {
      imageUrl: string;
      link: string;
      title: string;
      category: string;
      backgroundColor: string;
}

/**
 * 배너 데이터를 가져오고 관리하기 위한 커스텀 훅.
 * @returns {Object} 현재 인덱스, 배너 리스트, 현재 배너, 배너를 탐색하는 함수들.
 */
export const useBanner = () => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
      /**
       * API에서 배너를 가져옵니다.
       */
        const fetchBanners = async () => {
            try {
                // const response = await axios.get<Banner[]>('/api/banners'); // API 엔드포인트로 교체하세요.
                // setBanners(response.data);
                setBanners([
                    {
                        id: 1,
                        imageUrl: 'https://via.placeholder.com/800x400',
                        link: 'https://www.example.com',
                        title: '배너1',
                        category: 'A'
                    },
                    {
                        id: 2,
                        imageUrl: 'https://via.placeholder.com/800x400',
                        link: 'https://www.example.com',
                        title: '배너2',
                        category: 'B'
                    },
                    {
                        id: 3,
                        imageUrl: 'https://via.placeholder.com/800x400',
                        link: 'https://www.example.com',
                        title: '배너3',
                        category: 'C'
                    }
                ])
            } catch (error) {
                console.error('배너를 가져오는 중 에러 발생:', error);
                alert('배너를 가져오는데 실패했습니다. 나중에 다시 시도해 주세요.');
            }
        };

        fetchBanners();
    }, []);

    /**
     * 다음 배너로 이동합니다.
     */
    const nextBanner = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    };

    /**
     * 이전 배너로 이동합니다.
     */
    const prevBanner = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + banners.length) % banners.length);
    };

    const currentBanner = banners[currentIndex];

    return {
        currentIndex,
        banners,
        currentBanner,
        nextBanner,
        prevBanner
    };
};