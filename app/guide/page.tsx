import Head from 'next/head';
import Link from 'next/link';

export default function QRUsageGuide() {
    // 구조화된 데이터 (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "QR 코드 완전 사용 가이드 - 효과적인 활용법",
        "description": "비즈니스와 개인 용도로 QR 코드를 효과적으로 활용하는 방법, 모범 사례, 마케팅 전략 등을 상세히 알아보세요.",
        "image": "https://qrmake.kr/banner/QRbanner.png",
        "author": {
            "@type": "Organization",
            "name": "QR Make"
        },
        "publisher": {
            "@type": "Organization",
            "name": "QR Make",
            "logo": {
                "@type": "ImageObject",
                "url": "https://qrmake.kr/banner/QRbanner.png"
            }
        },
        "datePublished": "2024-01-01",
        "dateModified": "2024-01-01",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://qrmake.kr/guide"
        },
        "articleSection": "Technology Guide",
        "wordCount": "3000",
        "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "홈",
                    "item": "https://qrmake.kr"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "QR 코드 사용 가이드",
                    "item": "https://qrmake.kr/guide"
                }
            ]
        }
    };

    // FAQ 구조화된 데이터
    const faqStructuredData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "QR 코드란 무엇인가요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "QR(Quick Response) 코드는 1994년 일본에서 개발된 2차원 바코드로, 기존 바코드보다 더 많은 정보를 저장할 수 있으며 빠른 스캔이 가능합니다."
                }
            },
            {
                "@type": "Question",
                "name": "QR 코드를 비즈니스에서 어떻게 활용할 수 있나요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "레스토랑의 디지털 메뉴, 소매업의 제품 정보 제공, 이벤트 등록, WiFi 접속, 연락처 공유 등 다양한 용도로 활용할 수 있습니다."
                }
            },
            {
                "@type": "Question",
                "name": "QR 코드 사용 시 보안에 주의해야 할 점은 무엇인가요?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "신뢰할 수 있는 출처의 QR 코드만 스캔하고, URL 미리보기를 확인하며, 의심스러운 사이트 접근 시 즉시 종료해야 합니다."
                }
            }
        ]
    };

    return (
        <>
            <Head>
                {/* 기본 메타 태그 */}
                <title>QR 코드 사용 가이드 - 효과적인 활용법 완전 정리 | QR Make</title>
                <meta name="description" content="QR 코드를 효과적으로 활용하는 방법, 비즈니스 모범 사례, 마케팅 전략, 보안 고려사항을 상세히 알아보세요. 레스토랑, 소매업, 교육 등 다양한 분야별 활용법 제공." />
                <meta name="keywords" content="QR코드 사용법, QR코드 마케팅, QR코드 활용, 비즈니스 QR코드, QR코드 모범사례, QR코드 보안, 디지털 메뉴, WiFi QR코드" />

                {/* 뷰포트 및 문자 인코딩 */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />

                {/* 언어 및 지역 */}
                <meta name="language" content="ko-KR" />
                <meta name="geo.region" content="KR" />
                <meta name="geo.country" content="Korea" />

                {/* 로봇 크롤링 지침 */}
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow" />

                {/* Open Graph (Facebook, 카카오톡) */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content="QR 코드 사용 가이드 - 효과적인 활용법 완전 정리" />
                <meta property="og:description" content="QR 코드를 효과적으로 활용하는 방법, 비즈니스 모범 사례, 마케팅 전략, 보안 고려사항을 상세히 알아보세요." />
                <meta property="og:image" content="https://qrmake.co.kr/images/qr-usage-guide-og.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content="https://qrmake.co.kr/guide" />
                <meta property="og:site_name" content="QR Make" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="article:author" content="QR Make" />
                <meta property="article:section" content="Technology" />
                <meta property="article:tag" content="QR코드" />
                <meta property="article:tag" content="마케팅" />
                <meta property="article:tag" content="비즈니스" />

                {/* Twitter 카드 */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="QR 코드 사용 가이드 - 효과적인 활용법 완전 정리" />
                <meta name="twitter:description" content="QR 코드를 효과적으로 활용하는 방법, 비즈니스 모범 사례, 마케팅 전략, 보안 고려사항을 상세히 알아보세요." />
                <meta name="twitter:image" content="https://qrmake.co.kr/images/qr-usage-guide-og.jpg" />
                <meta name="twitter:site" content="@qrmake" />

                {/* 캐노니컬 URL */}
                <link rel="canonical" href="https://qrmake.co.kr/guide" />

                {/* 대체 언어 */}
                <link rel="alternate" hrefLang="ko" href="https://qrmake.co.kr/guide" />
                <link rel="alternate" hrefLang="en" href="https://qrmake.co.kr/en/guide" />
                <link rel="alternate" hrefLang="x-default" href="https://qrmake.co.kr/guide" />

                {/* 파비콘 */}
                <link rel="icon" href="/favicon.ico" />

                {/* 구조화된 데이터 */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData)
                    }}
                />

                {/* FAQ 구조화된 데이터 */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(faqStructuredData)
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

                {/* 추가적인 검색 엔진 최적화 */}
                <meta name="revisit-after" content="7 days" />
                <meta name="rating" content="general" />
                <meta name="distribution" content="global" />

                {/* 소셜 미디어 메타 */}
                <meta property="fb:app_id" content="your-facebook-app-id" />
                <meta name="pinterest" content="nopin" />
            </Head>

            <div className="flex mx-auto min-h-screen bg-background">
                {/* 모바일에서 사이드바 공간 확보 */}
                <div className="w-full mx-auto transition-all duration-300">
                    <div className="mx-auto px-4 py-8 pt-16 md:pt-8">
                        {/* 브레드크럼 - 모바일 최적화 */}
                        <nav className="text-sm text-gray-600 mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide" aria-label="breadcrumb">
                            <Link href="/" className="hover:text-blue-600">홈</Link>
                            <span className="mx-2" aria-hidden="true">›</span>
                            <span className="text-gray-900">QR 코드 사용 가이드</span>
                        </nav>

                        <article className="max-w-4xl mx-auto">
                            {/* 헤더 - 반응형 */}
                            <header className="mb-8 md:mb-12 text-center md:text-left">
                                <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                                    QR 코드 완전 사용 가이드
                                </h1>
                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                                    비즈니스와 개인 용도로 QR 코드를 효과적으로 활용하는 방법
                                </p>
                                <div className="mt-4 text-sm text-gray-500">
                                    <time dateTime="2024-01-01">2024년 1월 1일 업데이트</time>
                                    <span className="mx-2">•</span>
                                    <span>15분 읽기</span>
                                </div>
                            </header>

                            {/* 본문 내용 */}
                            <section id="what-is-qr" className="mb-8 md:mb-12 scroll-mt-20">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">1. QR 코드란 무엇인가?</h2>
                                <div className="prose max-w-none">
                                    <p className="text-base md:text-lg mb-4 leading-relaxed">
                                        QR(Quick Response) 코드는 1994년 일본의 덴소 웨이브(Denso Wave)에서 개발한 2차원 바코드입니다.
                                        기존 바코드보다 더 많은 정보를 저장할 수 있으며, 빠른 스캔이 가능한 것이 특징입니다.
                                    </p>

                                    <h3 className="text-xl md:text-2xl font-semibold mb-4 mt-6 md:mt-8">QR 코드의 주요 특징</h3>
                                    <div className="bg-blue-50 p-4 md:p-6 rounded-lg mb-6">
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-3 mt-1" aria-hidden="true">📊</span>
                                                <div>
                                                    <strong className="block md:inline">대용량 정보 저장:</strong>
                                                    <span className="block md:inline md:ml-2">최대 4,296자의 영숫자를 저장 가능</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-3 mt-1" aria-hidden="true">⚡</span>
                                                <div>
                                                    <strong className="block md:inline">빠른 스캔:</strong>
                                                    <span className="block md:inline md:ml-2">360도 어느 방향에서든 빠르게 인식</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-3 mt-1" aria-hidden="true">🛡️</span>
                                                <div>
                                                    <strong className="block md:inline">오류 복구:</strong>
                                                    <span className="block md:inline md:ml-2">최대 30%까지 손상되어도 읽기 가능</span>
                                                </div>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-blue-600 mr-3 mt-1" aria-hidden="true">🔀</span>
                                                <div>
                                                    <strong className="block md:inline">다양한 데이터 타입:</strong>
                                                    <span className="block md:inline md:ml-2">텍스트, URL, 연락처, WiFi 정보 등</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section id="business-uses" className="mb-8 md:mb-12 scroll-mt-20">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">2. 비즈니스에서의 QR 코드 활용</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                        <div className="flex items-center mb-4">
                                            <span className="text-2xl mr-3" aria-hidden="true">🍽️</span>
                                            <h3 className="text-lg md:text-xl font-semibold">레스토랑 & 카페</h3>
                                        </div>
                                        <ul className="space-y-2 text-sm md:text-base">
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                디지털 메뉴 제공
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                주문 및 결제 시스템 연동
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                고객 리뷰 수집
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                소셜미디어 팔로우 유도
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                        <div className="flex items-center mb-4">
                                            <span className="text-2xl mr-3" aria-hidden="true">🏢</span>
                                            <h3 className="text-lg md:text-xl font-semibold">소매업</h3>
                                        </div>
                                        <ul className="space-y-2 text-sm md:text-base">
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                제품 상세 정보 제공
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                할인 쿠폰 배포
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                재고 관리
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                멤버십 포인트 적립
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                        <div className="flex items-center mb-4">
                                            <span className="text-2xl mr-3" aria-hidden="true">🎓</span>
                                            <h3 className="text-lg md:text-xl font-semibold">교육 기관</h3>
                                        </div>
                                        <ul className="space-y-2 text-sm md:text-base">
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                출석 체크
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                학습 자료 공유
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                설문조사 실시
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                이벤트 등록
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                        <div className="flex items-center mb-4">
                                            <span className="text-2xl mr-3" aria-hidden="true">🏥</span>
                                            <h3 className="text-lg md:text-xl font-semibold">의료 기관</h3>
                                        </div>
                                        <ul className="space-y-2 text-sm md:text-base">
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                환자 정보 관리
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                예약 시스템
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                처방전 확인
                                            </li>
                                            <li className="flex items-center">
                                                <span className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0" aria-hidden="true"></span>
                                                건강 정보 제공
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section id="best-practices" className="mb-8 md:mb-12 scroll-mt-20">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">4. QR 코드 사용 모범 사례</h2>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                                    <div className="bg-green-50 p-4 md:p-6 rounded-lg">
                                        <h3 className="text-lg md:text-xl font-semibold text-green-700 mb-4 flex items-center">
                                            <span className="text-2xl mr-2" aria-hidden="true">✅</span>
                                            좋은 사례
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="text-green-600 mr-3 mt-1 text-sm" aria-hidden="true">✓</span>
                                                <span className="text-sm md:text-base">명확한 행동 지침 제공</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-green-600 mr-3 mt-1 text-sm" aria-hidden="true">✓</span>
                                                <span className="text-sm md:text-base">적절한 크기 (최소 2x2cm)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-green-600 mr-3 mt-1 text-sm" aria-hidden="true">✓</span>
                                                <span className="text-sm md:text-base">충분한 대비 (어두운 QR 코드, 밝은 배경)</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-green-600 mr-3 mt-1 text-sm" aria-hidden="true">✓</span>
                                                <span className="text-sm md:text-base">테스트 후 배포</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-green-600 mr-3 mt-1 text-sm" aria-hidden="true">✓</span>
                                                <span className="text-sm md:text-base">가치 있는 콘텐츠 제공</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-red-50 p-4 md:p-6 rounded-lg">
                                        <h3 className="text-lg md:text-xl font-semibold text-red-700 mb-4 flex items-center">
                                            <span className="text-2xl mr-2" aria-hidden="true">❌</span>
                                            피해야 할 사례
                                        </h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start">
                                                <span className="text-red-600 mr-3 mt-1 text-sm" aria-hidden="true">✗</span>
                                                <span className="text-sm md:text-base">너무 작은 크기</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-red-600 mr-3 mt-1 text-sm" aria-hidden="true">✗</span>
                                                <span className="text-sm md:text-base">접근하기 어려운 위치</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-red-600 mr-3 mt-1 text-sm" aria-hidden="true">✗</span>
                                                <span className="text-sm md:text-base">모바일 최적화되지 않은 페이지</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-red-600 mr-3 mt-1 text-sm" aria-hidden="true">✗</span>
                                                <span className="text-sm md:text-base">설명 없는 QR 코드</span>
                                            </li>
                                            <li className="flex items-start">
                                                <span className="text-red-600 mr-3 mt-1 text-sm" aria-hidden="true">✗</span>
                                                <span className="text-sm md:text-base">불필요한 앱 설치 요구</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section id="design-tips" className="mb-8 md:mb-12 scroll-mt-20">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">5. 효과적인 QR 코드 디자인</h2>

                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 md:p-8 rounded-lg">
                                    <h3 className="text-xl md:text-2xl font-semibold mb-6 text-center">디자인 원칙</h3>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="text-center">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span className="text-xl md:text-2xl" aria-hidden="true">🎨</span>
                                            </div>
                                            <h4 className="text-base md:text-lg font-semibold mb-2">시각적 조화</h4>
                                            <p className="text-sm md:text-base text-gray-600">브랜드 색상과 조화롭게 디자인하되, 가독성을 우선시하세요.</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span className="text-xl md:text-2xl" aria-hidden="true">📐</span>
                                            </div>
                                            <h4 className="text-base md:text-lg font-semibold mb-2">적절한 크기</h4>
                                            <p className="text-sm md:text-base text-gray-600">인쇄물에서는 최소 2x2cm, 디지털에서는 충분한 해상도를 유지하세요.</p>
                                        </div>

                                        <div className="text-center">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <span className="text-xl md:text-2xl" aria-hidden="true">🔍</span>
                                            </div>
                                            <h4 className="text-base md:text-lg font-semibold mb-2">명확성</h4>
                                            <p className="text-sm md:text-base text-gray-600">복잡한 디자인보다는 스캔하기 쉬운 심플한 디자인을 선택하세요.</p>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section id="security" className="mb-8 md:mb-12 scroll-mt-20">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">6. QR 코드 보안 고려사항</h2>

                                <div className="space-y-6">
                                    <div className="bg-red-50 border-l-4 border-red-400 p-4 md:p-6">
                                        <h3 className="text-lg md:text-xl font-semibold mb-4 text-red-800 flex items-center">
                                            <span className="mr-2" aria-hidden="true">⚠️</span>
                                            보안 위험 요소
                                        </h3>
                                        <ul className="space-y-2 text-red-700 text-sm md:text-base">
                                            <li className="flex items-start">
                                                <span className="mr-2 mt-1 text-red-600" aria-hidden="true">•</span>
                                                악성 사이트로의 리디렉션
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2 mt-1 text-red-600" aria-hidden="true">•</span>
                                                개인정보 탈취 시도
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2 mt-1 text-red-600" aria-hidden="true">•</span>
                                                멀웨어 다운로드 유도
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2 mt-1 text-red-600" aria-hidden="true">•</span>
                                                피싱 공격
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="bg-green-50 border-l-4 border-green-400 p-4 md:p-6">
                                        <h3 className="text-lg md:text-xl font-semibold mb-4 text-green-800 flex items-center">
                                            <span className="mr-2" aria-hidden="true">🛡️</span>
                                            보안 대책
                                        </h3>
                                        <ul className="space-y-2 text-green-700 text-sm md:text-base">
                                            <li className="flex items-start">
                                                <span className="mr-2 mt-1 text-green-600" aria-hidden="true">•</span>
                                                신뢰할 수 있는 출처의 QR 코드만 스캔
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2 mt-1 text-green-600" aria-hidden="true">•</span>
                                                QR 코드 스캐너 앱에서 URL 미리보기 확인
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2 mt-1 text-green-600" aria-hidden="true">•</span>
                                                의심스러운 사이트 접근 시 즉시 종료
                                            </li>
                                            <li className="flex items-start">
                                                <span className="mr-2 mt-1 text-green-600" aria-hidden="true">•</span>
                                                정기적인 보안 업데이트 실시
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* 관련 도구 - 모바일 최적화 */}
                            <section className="bg-gray-50 p-6 md:p-8 rounded-lg mt-8 md:mt-12">
                                <h2 className="text-xl md:text-2xl font-bold mb-6 text-center md:text-left">관련 도구 및 서비스</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <Link href="/" className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow block">
                                        <h3 className="text-lg md:text-xl font-semibold mb-2">무료 QR 코드 생성기</h3>
                                        <p className="text-gray-600 text-sm md:text-base">로고가 포함된 고품질 QR 코드를 무료로 생성하세요.</p>
                                    </Link>
                                    <Link href="/templates" className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow block">
                                        <h3 className="text-lg md:text-xl font-semibold mb-2">QR 코드 템플릿 갤러리</h3>
                                        <p className="text-gray-600 text-sm md:text-base">다양한 용도별 템플릿을 확인하고 활용해보세요.</p>
                                    </Link>
                                </div>
                            </section>
                        </article>
                    </div>
                </div>
            </div>
        </>
    );
}