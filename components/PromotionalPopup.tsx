'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PromotionalPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 배너가 이미 표시됐는지 확인
        const hasSeenBanner = localStorage.getItem('hasSeenPromoBanner');

        if (!hasSeenBanner) {
            // 처음 방문한 경우에만 배너 표시
            setIsVisible(true);
        }
    }, []);

    const closeBanner = () => {
        setIsVisible(false);
        // 배너를 봤다는 정보를 로컬 스토리지에 저장
        localStorage.setItem('hasSeenPromoBanner', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bg-yellow-300 text-black py-3 px-4 z-50 shadow-md">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <span className="font-semibold mr-2">웹사이트 제작 의뢰는 여기로!</span>
                    <span className="hidden md:inline">QR코드를 포함한 온라인 명함, 웹사이트 제작이 필요하다면?</span>
                </div>

                <div className="flex items-center">
                    <Link href="https://seopseop.shop" passHref>
                        <button className="bg-white text-primary px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors mr-3">
                            방문하기
                        </button>
                    </Link>

                    <button
                        onClick={closeBanner}
                        className="text-white hover:text-gray-200"
                        aria-label="닫기"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}