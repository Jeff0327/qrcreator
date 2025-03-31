'use client'
import { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        adsbygoogle: Array<Record<string, unknown>>;
    }
}
const AdBanner = () => {
    const adContainerRef = useRef<HTMLDivElement>(null);
    const [isDevelopment, setIsDevelopment] = useState(true);

    useEffect(() => {
        // 개발 환경 확인
        const hostname = window.location.hostname;
        const isDev = hostname === 'localhost' || hostname === '127.0.0.1';
        setIsDevelopment(isDev);

        // 개발 환경에서는 광고 로드 건너뜀
        if (isDev) {
            return;
        }

        // 광고 로드 시도 (프로덕션 환경에서만)
        let attemptCount = 0;
        const maxAttempts = 3;

        const loadAd = () => {
            if (!adContainerRef.current || !adContainerRef.current.offsetWidth) {
                if (attemptCount < maxAttempts) {
                    attemptCount++;
                    // 일정 시간 후 다시 시도
                    setTimeout(loadAd, 1000);
                }
                return;
            }

            try {
                const isAdSenseLoaded = typeof window.adsbygoogle !== 'undefined';

                if (isAdSenseLoaded) {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                } else {
                    // AdSense 스크립트가 없으면 추가
                    const script = document.createElement('script');
                    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1622427124321210';
                    script.async = true;
                    script.crossOrigin = 'anonymous';
                    document.head.appendChild(script);

                    script.onload = () => {
                        setTimeout(() => {
                            (window.adsbygoogle = window.adsbygoogle || []).push({});
                        }, 1000);
                    };
                }
            } catch (error) {
                console.error('Error loading AdSense ad:', error);
            }
        };

        // 페이지가 완전히 로드된 후 광고 로드 시도
        if (document.readyState === 'complete') {
            setTimeout(loadAd, 1000);
        } else {
            window.addEventListener('load', () => setTimeout(loadAd, 1000));
            return () => window.removeEventListener('load', loadAd);
        }
    }, []);

    return (
        <>
            {isDevelopment ? (
                // 개발 환경 - 플레이스홀더
                <div className="w-full h-20 mb-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-500">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                            <rect width="18" height="18" x="3" y="3" rx="2" />
                            <path d="M3 9h18" />
                        </svg>
                        <span>배너 광고 영역 (728 x 90)</span>
                    </div>
                </div>
            ) : (
                // 프로덕션 환경 - 실제 광고
                <div className="ad-container mb-8" ref={adContainerRef}>
                    <ins
                        className="adsbygoogle"
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '90px',
                            minHeight: '90px'
                        }}
                        data-ad-client="ca-pub-1622427124321210"
                        data-ad-slot="7280737292"
                        data-ad-format="horizontal"
                        data-full-width-responsive="true"
                    ></ins>
                </div>
            )}
        </>
    );
};

export default AdBanner;