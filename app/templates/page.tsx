'use client'
import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';

export default function QRTemplatesGallery() {
    const [selectedCategory, setSelectedCategory] = useState('all');

    const templates = [
        {
            id: 1,
            title: '레스토랑 메뉴',
            category: 'restaurant',
            description: '레스토랑과 카페를 위한 디지털 메뉴 QR 코드',
            image: '/templates/restaurant-menu.png',
            colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
            features: ['로고 포함', '컬러 커스터마이징', 'PNG/SVG 다운로드']
        },
        {
            id: 2,
            title: 'WiFi 연결',
            category: 'wifi',
            description: '간편한 WiFi 접속을 위한 QR 코드',
            image: '/templates/wifi-qr.png',
            colors: ['#667EEA', '#764BA2', '#F093FB'],
            features: ['암호 자동 입력', '네트워크 정보', '보안 설정']
        },
        {
            id: 3,
            title: '소셜미디어',
            category: 'social',
            description: 'Instagram, Facebook 등 소셜미디어 팔로우 유도',
            image: '/templates/social-media.png',
            colors: ['#E91E63', '#9C27B0', '#673AB7'],
            features: ['다중 플랫폼', '팔로우 버튼', '프로필 링크']
        },
        {
            id: 4,
            title: '연락처 정보',
            category: 'contact',
            description: '명함 대신 사용할 수 있는 vCard QR 코드',
            image: '/templates/contact-vcard.png',
            colors: ['#2196F3', '#03DAC6', '#FF9800'],
            features: ['연락처 저장', '자동 다이얼', '이메일 링크']
        },
        {
            id: 5,
            title: '이벤트 등록',
            category: 'event',
            description: '세미나, 컨퍼런스 등 이벤트 등록 QR 코드',
            image: '/templates/event-registration.png',
            colors: ['#4CAF50', '#8BC34A', '#CDDC39'],
            features: ['캘린더 추가', '위치 정보', '등록 폼']
        },
        {
            id: 6,
            title: '쇼핑몰 상품',
            category: 'ecommerce',
            description: '제품 상세페이지 및 구매 링크 QR 코드',
            image: '/templates/product-qr.png',
            colors: ['#FF5722', '#795548', '#607D8B'],
            features: ['상품 정보', '리뷰 링크', '할인 쿠폰']
        },
        {
            id: 7,
            title: 'YouTube 채널',
            category: 'media',
            description: 'YouTube 채널 구독 유도 QR 코드',
            image: '/templates/youtube-channel.png',
            colors: ['#FF0000', '#FF4081', '#E040FB'],
            features: ['구독 버튼', '최신 영상', '알림 설정']
        },
        {
            id: 8,
            title: '앱 다운로드',
            category: 'app',
            description: '모바일 앱 다운로드 링크 QR 코드',
            image: '/templates/app-download.png',
            colors: ['#009688', '#00BCD4', '#03A9F4'],
            features: ['자동 스토어 연결', '플랫폼 감지', '설치 추적']
        }
    ];

    const categories = [
        { id: 'all', name: '전체', icon: '🎯' },
        { id: 'restaurant', name: '레스토랑', icon: '🍽️' },
        { id: 'wifi', name: 'WiFi', icon: '📶' },
        { id: 'social', name: '소셜미디어', icon: '📱' },
        { id: 'contact', name: '연락처', icon: '👤' },
        { id: 'event', name: '이벤트', icon: '🎉' },
        { id: 'ecommerce', name: '쇼핑', icon: '🛒' },
        { id: 'media', name: '미디어', icon: '🎬' },
        { id: 'app', name: '앱', icon: '📲' }
    ];

    const filteredTemplates = selectedCategory === 'all'
        ? templates
        : templates.filter(template => template.category === selectedCategory);

    // 구조화된 데이터 (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "QR 코드 템플릿 갤러리",
        "description": "다양한 용도별 QR 코드 템플릿을 무료로 다운로드하세요. 레스토랑, WiFi, 소셜미디어, 이벤트 등 50+ 디자인 제공.",
        "url": "https://qrmake.kr/templates",
        "mainEntity": {
            "@type": "ItemList",
            "numberOfItems": templates.length,
            "itemListElement": templates.map((template, index) => ({
                "@type": "SoftwareApplication",
                "position": index + 1,
                "name": template.title,
                "description": template.description,
                "applicationCategory": "QR Code Template",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "KRW"
                }
            }))
        },
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "홈",
                    "item": "https://qrmake.co.kr"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "QR 코드 템플릿 갤러리",
                    "item": "https://qrmake.co.kr/templates"
                }
            ]
        }
    };

    return (
        <>
            <Head>
                {/* 기본 메타 태그 */}
                <title>QR 코드 템플릿 갤러리 - 무료 디자인 모음 | QR Make</title>
                <meta name="description" content="다양한 용도별 QR 코드 템플릿을 무료로 다운로드하세요. 레스토랑, WiFi, 소셜미디어, 이벤트 등 50+ 디자인 제공. 로고 포함, 컬러 커스터마이징 가능." />
                <meta name="keywords" content="QR코드 템플릿, QR코드 디자인, 무료 QR코드, QR코드 갤러리, 레스토랑 메뉴 QR, WiFi QR코드, 소셜미디어 QR, 이벤트 QR코드" />

                {/* 뷰포트 및 문자 인코딩 */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="utf-8" />

                {/* 언어 및 지역 */}
                <meta name="language" content="ko-KR" />
                <meta name="geo.region" content="KR" />
                <meta name="geo.country" content="Korea" />

                {/* 로봇 크롤링 지침 */}
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow" />

                {/* Open Graph (Facebook, 카카오톡) */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="QR 코드 템플릿 갤러리 - 무료 디자인 모음 | QR Make" />
                <meta property="og:description" content="다양한 용도별 QR 코드 템플릿을 무료로 다운로드하세요. 레스토랑, WiFi, 소셜미디어, 이벤트 등 50+ 디자인 제공." />
                <meta property="og:image" content="https://qrmake.co.kr/images/qr-templates-gallery.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content="https://qrmake.co.kr/templates" />
                <meta property="og:site_name" content="QR Make" />
                <meta property="og:locale" content="ko_KR" />

                {/* Twitter 카드 */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="QR 코드 템플릿 갤러리 - 무료 디자인 모음" />
                <meta name="twitter:description" content="다양한 용도별 QR 코드 템플릿을 무료로 다운로드하세요. 레스토랑, WiFi, 소셜미디어, 이벤트 등 50+ 디자인 제공." />
                <meta name="twitter:image" content="https://qrmake.kr/banner/QRbanner.png" />
                <meta name="twitter:site" content="@qrmake" />

                {/* 캐노니컬 URL */}
                <link rel="canonical" href="https://qrmake.co.kr/templates" />

                {/* 대체 언어 */}
                <link rel="alternate" hrefLang="ko" href="https://qrmake.kr/templates" />
                <link rel="alternate" hrefLang="en" href="https://qrmake.kr/en/templates" />
                <link rel="alternate" hrefLang="x-default" href="https://qrmake.kr/templates" />

                {/* 파비콘 */}
                <link rel="icon" href="/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/banner/QRbanner.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/banner/QRbanner.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/banner/QRbanner.png" />

                {/* 프리로드 중요 리소스 */}
                <link rel="preload" href="https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff" as="font" type="font/woff2" crossOrigin="anonymous" />

                {/* 구조화된 데이터 */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData)
                    }}
                />

                {/* 추가 SEO 메타 */}
                <meta name="author" content="QR Make" />
                <meta name="publisher" content="QR Make" />
                <meta name="theme-color" content="#2563eb" />
                <meta name="application-name" content="QR Make" />
                <meta name="format-detection" content="telephone=no" />

                {/* 모바일 웹앱 메타 */}
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="QR Make" />
            </Head>

            <div className="flex mx-auto w-full min-h-screen bg-background">
                {/* 모바일에서 사이드바 공간 확보 */}
                <div className="w-full transition-all duration-300">
                    <div className="px-4 py-8 pt-16 md:pt-8">
                        {/* 헤더 */}
                        <header className="text-center mb-8 md:mb-12">
                            <h1 className="text-2xl md:text-4xl font-bold mb-4">QR 코드 템플릿 갤러리</h1>
                            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                                비즈니스와 개인 용도에 맞는 다양한 QR 코드 템플릿을 찾아보세요.
                                모든 템플릿은 무료이며 브랜드에 맞게 커스터마이징할 수 있습니다.
                            </p>
                        </header>

                        {/* 카테고리 필터 - 모바일 스크롤 가능 */}
                        <div className="mb-8 md:mb-12">
                            <div className="flex overflow-x-auto gap-2 md:gap-4 pb-2 md:pb-0 md:flex-wrap md:justify-center scrollbar-hide">
                                {categories.map(category => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`flex-shrink-0 px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 text-sm md:text-base ${
                                            selectedCategory === category.id
                                                ? 'bg-blue-600 text-white shadow-lg'
                                                : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                                        }`}
                                    >
                                        <span className="mr-1 md:mr-2">{category.icon}</span>
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 템플릿 그리드 - 반응형 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
                            {filteredTemplates.map(template => (
                                <article key={template.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    {/* 템플릿 이미지 */}
                                    <div className="relative h-36 md:h-48 bg-gradient-to-br from-gray-100 to-gray-200">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg shadow-md flex items-center justify-center">
                                                <div className="w-16 h-16 md:w-24 md:h-24 bg-black rounded-md relative">
                                                    {/* QR 코드 패턴 시뮬레이션 */}
                                                    <div className="absolute top-0.5 left-0.5 md:top-1 md:left-1 w-4 h-4 md:w-6 md:h-6 bg-white rounded-sm"></div>
                                                    <div className="absolute top-0.5 right-0.5 md:top-1 md:right-1 w-4 h-4 md:w-6 md:h-6 bg-white rounded-sm"></div>
                                                    <div className="absolute bottom-0.5 left-0.5 md:bottom-1 md:left-1 w-4 h-4 md:w-6 md:h-6 bg-white rounded-sm"></div>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full" style={{backgroundColor: template.colors[0]}}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* 컬러 팔레트 */}
                                        <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 flex space-x-1">
                                            {template.colors.map((color, index) => (
                                                <div
                                                    key={index}
                                                    className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white shadow-sm"
                                                    style={{backgroundColor: color}}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 템플릿 정보 */}
                                    <div className="p-4 md:p-6">
                                        <h2 className="text-lg md:text-xl font-semibold mb-2">{template.title}</h2>
                                        <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base line-clamp-2">
                                            {template.description}
                                        </p>

                                        {/* 기능 목록 */}
                                        <div className="mb-3 md:mb-4">
                                            <p className="text-xs md:text-sm font-medium text-gray-700 mb-2">포함된 기능:</p>
                                            <div className="flex flex-wrap gap-1">
                                                {template.features.map((feature, index) => (
                                                    <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* 액션 버튼 */}
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <Link
                                                href={`/?template=${template.id}`}
                                                className="flex-1 bg-blue-600 text-white text-center py-2 px-3 md:px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                            >
                                                사용하기
                                            </Link>
                                            <button className="px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                                                미리보기
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* CTA 섹션 - 반응형 */}
                        <section className="mt-12 md:mt-20 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 md:py-16 px-6 md:px-8 rounded-2xl">
                            <h2 className="text-2xl md:text-3xl font-bold mb-4">나만의 QR 코드 만들기</h2>
                            <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90 max-w-2xl mx-auto">
                                마음에 드는 템플릿을 찾으셨나요? 지금 바로 무료로 QR 코드를 생성해보세요!
                            </p>
                            <Link
                                href="/"
                                className="inline-block bg-white text-blue-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors"
                            >
                                QR 코드 생성하기 →
                            </Link>
                        </section>

                        {/* 추가 정보 - 반응형 */}
                        <section className="mt-12 md:mt-16">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                                <div className="text-center p-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-xl md:text-2xl">✨</span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">완전 무료</h3>
                                    <p className="text-gray-600 text-sm md:text-base">모든 템플릿과 기능을 무료로 사용할 수 있습니다.</p>
                                </div>

                                <div className="text-center p-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-xl md:text-2xl">🎨</span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">커스터마이징</h3>
                                    <p className="text-gray-600 text-sm md:text-base">색상, 로고, 크기 등을 자유롭게 변경할 수 있습니다.</p>
                                </div>

                                <div className="text-center p-6">
                                    <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-xl md:text-2xl">📱</span>
                                    </div>
                                    <h3 className="text-lg md:text-xl font-semibold mb-2">모바일 최적화</h3>
                                    <p className="text-gray-600 text-sm md:text-base">모든 기기에서 완벽하게 스캔되도록 최적화되었습니다.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}