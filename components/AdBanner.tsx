'use client'
import { useEffect, useRef } from 'react';

const AdBanner = () => {
    const adContainerRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     // Google AdSense 스크립트가 로드되었는지 확인
    //     const isAdSenseLoaded = () => {
    //         return typeof window !== 'undefined' && typeof (window as any).adsbygoogle !== 'undefined';
    //     };
    //
    //     // AdSense 광고 로드
    //     const loadAd = () => {
    //         try {
    //             if (isAdSenseLoaded() && adContainerRef.current) {
    //
    //                 (window.adsbygoogle = window.adsbygoogle || []).push({});
    //             }
    //         } catch (error) {
    //             console.error('Error loading AdSense ad:', error);
    //         }
    //     };
    //
    //     // 컴포넌트가 마운트되면 광고 로드
    //     loadAd();
    //
    //     // Clean up function
    //     return () => {
    //         // 필요한 경우 여기에 정리 로직 추가
    //     };
    // }, []);

    return (
        <div className="ad-container" ref={adContainerRef}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // 실제 AdSense 계정 ID로 교체
                data-ad-slot="XXXXXXXXXX" // 실제 광고 슬롯 ID로 교체
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

export default AdBanner;