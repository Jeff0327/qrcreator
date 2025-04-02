'use client'
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

declare global {
    interface Window {
        adsbygoogle: Array<Record<string, unknown>>;
    }
}

const SidebarAd = () => {
    // 개발 환경인지 확인
    const [isDevelopment, setIsDevelopment] = useState(true);
    const adContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 개발 환경과 프로덕션 환경 구분
        // Next.js 환경 변수나 호스트명을 기준으로 판단
        const hostname = window.location.hostname;
        const isDev = hostname === 'localhost' || hostname === '127.0.0.1';
        setIsDevelopment(isDev);

        // 프로덕션 환경에서만 AdSense 코드 실행
        if (!isDev) {
            // AdSense 스크립트가 아직 로드되지 않은 경우에만 스크립트 추가
            if (!document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
                const script = document.createElement('script');
                script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1622427124321210';
                script.async = true;
                script.crossOrigin = 'anonymous';
                document.head.appendChild(script);

                script.onload = () => {
                    // 스크립트 로드 완료 후 DOM이 완전히 렌더링되고
                    // 컨테이너 크기가 계산될 시간을 주기 위해 지연
                    setTimeout(() => {
                        if (adContainerRef.current && adContainerRef.current.offsetWidth > 0) {
                            try {
                                // AdSense 광고 삽입
                                (window.adsbygoogle = window.adsbygoogle || []).push({});
                            } catch (error) {
                                console.error('AdSense 광고 로드 실패:', error);
                            }
                        } else {
                            console.log('광고 컨테이너가 없거나 너비가 0입니다');
                        }
                    }, 2000); // 2초 지연
                };
            }
        }
    }, []);

    // 개발 환경에서는 플레이스홀더 표시, 프로덕션에서는 AdSense 광고 표시
    return (
        <Card>
            <CardContent className="p-0 overflow-hidden">
                {isDevelopment ? (
                    // 개발 환경 - 플레이스홀더
                    <div
                        className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500"
                        style={{ width: 'auto', height: '600px' }}
                    >
                        <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="3" rx="2" />
                                <path d="M3 9h18" />
                                <path d="M9 21V9" />
                            </svg>
                        </div>
                        <p className="text-center font-medium">광고 영역</p>
                        <p className="text-xs text-center mt-1">(개발 환경 플레이스홀더)</p>
                    </div>
                ) : (
                    // 프로덕션 환경 - 실제 AdSense 광고
                    <div
                        ref={adContainerRef}
                        style={{ width: 'auto', height: '600px' }}
                    >
                        <ins
                            className="adsbygoogle"
                            style={{ display: 'block', width: 'auto', height: '600px' }}
                            data-ad-client="ca-pub-1622427124321210"
                            data-ad-slot="7280737292"
                            data-ad-format="vertical"
                        ></ins>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default SidebarAd;