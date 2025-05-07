import dynamic from 'next/dynamic';
import {Suspense} from 'react';
import ClientSidebarAd from "@/components/ClientSidebarAd";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import QRTypeSidebar from "@/components/TabLink/QRTypeSidebar";
import QRFooterLinks from "@/components/TabLink/QRFooterLinks";
import QRStatistics from "@/components/QRStatistics";
import TitleSection from "@/components/aos/TitleSection";

// Dynamically import components with code splitting
const QRCreator = dynamic(() => import('@/components/QRCreator'), {
    loading: () => (
        <div className="p-6 rounded-lg shadow-md mb-8 animate-pulse">
            <div className="h-8 w-3/4 bg-muted rounded mb-4"></div>
            <div className="h-10 w-full bg-muted rounded mb-6"></div>
            <div className="h-10 w-32 bg-muted rounded"></div>
        </div>
    ),
});

export default function Home() {
    return (
        <div className="min-h-screen bg-background">

            {/* Schema.org FAQ 구조화 데이터 */}
            <Script
                id="faq-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "QR 코드 생성은 무료인가요?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "네, 저희 QR 코드 생성기는 완전 무료로 제공됩니다. 회원가입이나 결제 없이 무제한으로 QR 코드를 생성할 수 있습니다."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "어떤 종류의 QR 코드를 만들 수 있나요?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "URL, 텍스트, 전화번호, SMS, 이메일, WiFi, 위치 정보 등 다양한 형식의 QR 코드를 생성할 수 있습니다."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "생성된 QR 코드는 얼마나 오래 사용할 수 있나요?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "저희 서비스로 생성한 QR 코드는 영구적으로 사용 가능합니다. 다운로드한 QR 코드는 만료 기간이 없으며 계속해서 스캔 가능합니다."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "QR 코드를 스캔하려면 어떤 앱이 필요한가요?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "대부분의 최신 스마트폰은 기본 카메라 앱으로 QR 코드 스캔이 가능합니다. 별도의 QR 코드 스캐너 앱도 앱스토어에서 무료로 다운로드할 수 있습니다."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Is this QR code generator free to use?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes, our QR code generator is completely free to use with no limitations. You can create unlimited QR codes without registration or payment."
                                }
                            }
                        ]
                    })
                }}
            />

            <main className="container mx-auto px-4 py-8 mt-0 xl:mt-12">
                <div className="lg:flex lg:space-x-8">
                    <div className="lg:w-3/4">
                        <div className={'flex flex-col lg:flex-row justify-between items-center gap-4 mb-2 lg:mb-8'}>
                            <div className={'w-auto xl:w-1/2 h-80 rounded-xl'}>
                                <Image src={'/banner/QRbanner.png'} alt={'mainBanner'} width={1000} height={1000} className={'rounded-lg w-full h-full object-contain xl:object-cover'}/>
                            </div>
                            <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg"/>}>
                                <TitleSection/>
                            </Suspense>

                        </div>

                        {/* QR Generator Component */}
                        <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg"/>}>
                            <div id="qr-creator-tabs">
                                <QRCreator/>
                            </div>
                        </Suspense>

                        {/* Features Section */}
                        <section id="features" className="mt-16 mb-8" aria-labelledby="features-heading">
                            <h2 id="features-heading" className="text-3xl font-bold mb-6">주요 기능 | Key Features</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <article className="p-6 border rounded-lg shadow-sm">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <h3 className="text-xl font-semibold">다양한 QR 코드 유형 | Various QR Types</h3>
                                    </div>
                                    <p>URL, 텍스트, 전화번호, SMS 메시지, WiFi, 이메일, 위치 정보 등 다양한 유형의 QR 코드를 생성할 수 있습니다.</p>
                                </article>

                                <article className="p-6 border rounded-lg shadow-sm">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <h3 className="text-xl font-semibold">커스터마이징 | Customization</h3>
                                    </div>
                                    <p>QR 코드의 색상과 크기를 변경하여 브랜드나 디자인에 맞게 맞춤 설정할 수 있습니다. 보다 독특하고 멋진 QR 코드를 만들어보세요.</p>
                                </article>

                                <article className="p-6 border rounded-lg shadow-sm">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <h3 className="text-xl font-semibold">저장 및 다운로드 | Save & Download</h3>
                                    </div>
                                    <p>생성한 QR 코드를 고화질 PNG 이미지로 다운로드하여 인쇄물, 웹사이트, 디지털 마케팅 등 다양한 목적으로 활용할 수 있습니다.</p>
                                </article>

                                <article className="p-6 border rounded-lg shadow-sm">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2"
                                             fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M5 13l4 4L19 7"/>
                                        </svg>
                                        <h3 className="text-xl font-semibold">회원가입 불필요 | No Registration</h3>
                                    </div>
                                    <p>계정 생성, 이메일 입력, 개인 정보 제공 없이 즉시 QR 코드를 생성하고 사용할 수 있습니다. 100% 무료 서비스를 이용해보세요.</p>
                                </article>
                            </div>
                        </section>

                        <section id="use-cases" className="mt-16 mb-8" aria-labelledby="use-cases-heading">
                            <h2 id="use-cases-heading" className="text-3xl font-bold mb-6">이렇게 사용해보세요 | Use Cases</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                <article className="flex flex-col items-center">
                                    <h3 className="text-xl mb-2">전단지 | Flyers</h3>
                                    <div
                                        className="aspect-square w-[400px] md:w-[300px] lg:w-full overflow-hidden rounded-lg my-12 md:my-6">
                                        <Image
                                            src="/samples/sample_1.jpg"
                                            alt="전단지에 사용된 QR 코드 예시 - QR code on a flyer example"
                                            width={500}
                                            height={500}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <p className="mt-2 text-center">홍보 전단지에 QR 코드를 추가하여 웹사이트나 프로모션 페이지로 고객을 유도하세요.</p>
                                </article>
                                <article className="flex flex-col items-center">
                                    <h3 className="text-xl mb-2">명함 | Business Cards</h3>
                                    <div
                                        className="aspect-square w-[400px] md:w-[300px] lg:w-full overflow-hidden rounded-lg my-12 md:my-6">
                                        <Image
                                            src="/samples/sample_2.jpg"
                                            alt="명함에 사용된 QR 코드 예시 - QR code on a business card example"
                                            width={500}
                                            height={500}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <p className="mt-2 text-center">명함에 연락처 정보나 포트폴리오가 담긴 QR 코드를 넣어 전문적인 이미지를 더하세요.</p>
                                </article>
                                <article className="flex flex-col items-center">
                                    <h3 className="text-xl mb-2">포스터 | Posters</h3>
                                    <div
                                        className="aspect-square w-[400px] md:w-[300px] lg:w-full overflow-hidden rounded-lg my-12 md:my-6">
                                        <Image
                                            src="/samples/sample_3.jpg"
                                            alt="포스터에 사용된 QR 코드 예시 - QR code on a poster example"
                                            width={500}
                                            height={500}
                                            className="object-cover w-full h-full"
                                        />
                                    </div>
                                    <p className="mt-2 text-center">이벤트 포스터에 QR 코드를 추가하여 온라인 티켓 판매나 상세 정보 페이지로
                                        연결하세요.</p>
                                </article>
                            </div>
                        </section>

                        {/* QR 코드 정보 섹션 추가 */}
                        <section id="qr-info" className="mt-16 mb-8" aria-labelledby="qr-info-heading">
                            <h2 id="qr-info-heading" className="text-3xl font-bold mb-6">QR 코드란? | What is a QR
                                Code?</h2>
                            <div className="bg-muted/50 p-6 rounded-lg">
                                <p className="mb-4">
                                    QR 코드(Quick Response Code)는 1994년 일본의 덴소 웨이브(Denso Wave)에서 개발한 2차원 바코드입니다.
                                    기존 바코드보다 훨씬 많은 정보를 담을 수 있으며, 스마트폰 카메라로 빠르게 스캔할 수 있는 특징이 있습니다.
                                </p>
                                <p className="mb-4">
                                    QR codes (Quick Response Codes) are two-dimensional barcodes that can store various
                                    types of information.
                                    When scanned with a smartphone camera, they quickly connect users to websites,
                                    display text, share contact information, and more.
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">QR 코드 스캔 방법 | How to Scan</h3>
                                        <ol className="list-decimal list-inside ml-4">
                                            <li className="mb-2">스마트폰 카메라 앱을 실행합니다.</li>
                                            <li className="mb-2">QR 코드가 화면에 들어오도록 조준합니다.</li>
                                            <li className="mb-2">자동으로 인식된 링크를 탭하거나 화면의 안내를 따릅니다.</li>
                                            <li>최신 iOS 및 Android 기기는 별도의 앱 없이 기본 카메라로 스캔이 가능합니다.</li>
                                        </ol>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">QR 코드 활용 분야 | Applications</h3>
                                        <ul className="list-disc list-inside ml-4">
                                            <li className="mb-2">마케팅 및 광고 캠페인</li>
                                            <li className="mb-2">제품 정보 및 사용 설명서</li>
                                            <li className="mb-2">모바일 결제 및 전자 티켓</li>
                                            <li className="mb-2">명함 및 연락처 공유</li>
                                            <li>이벤트 체크인 및 방문자 관리</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* 자주 묻는 질문 섹션 추가 */}
                        <section id="faq" className="mt-16 mb-8" aria-labelledby="faq-heading">
                            <h2 id="faq-heading" className="text-3xl font-bold mb-6">자주 묻는 질문 | FAQ</h2>
                            <div className="space-y-4">
                                <details className="p-4 border rounded-lg">
                                    <summary className="font-semibold text-lg cursor-pointer">QR 코드 생성은 무료인가요?</summary>
                                    <div className="mt-2 pl-4">
                                        <p>네, 저희 QR 코드 생성기는 완전 무료로 제공됩니다. 회원가입이나 결제 없이 무제한으로 QR 코드를 생성할 수 있습니다.</p>
                                    </div>
                                </details>
                                <details className="p-4 border rounded-lg">
                                    <summary className="font-semibold text-lg cursor-pointer">어떤 종류의 QR 코드를 만들 수 있나요?
                                    </summary>
                                    <div className="mt-2 pl-4">
                                        <p>URL, 텍스트, 전화번호, SMS, 이메일, WiFi, 위치 정보 등 다양한 형식의 QR 코드를 생성할 수 있습니다.</p>
                                    </div>
                                </details>
                                <details className="p-4 border rounded-lg">
                                    <summary className="font-semibold text-lg cursor-pointer">생성된 QR 코드는 얼마나 오래 사용할 수
                                        있나요?
                                    </summary>
                                    <div className="mt-2 pl-4">
                                        <p>저희 서비스로 생성한 QR 코드는 영구적으로 사용 가능합니다. 다운로드한 QR 코드는 만료 기간이 없으며 계속해서 스캔 가능합니다.</p>
                                    </div>
                                </details>
                                <details className="p-4 border rounded-lg">
                                    <summary className="font-semibold text-lg cursor-pointer">QR 코드를 스캔하려면 어떤 앱이
                                        필요한가요?
                                    </summary>
                                    <div className="mt-2 pl-4">
                                        <p>대부분의 최신 스마트폰은 기본 카메라 앱으로 QR 코드 스캔이 가능합니다. 별도의 QR 코드 스캐너 앱도 앱스토어에서 무료로 다운로드할 수
                                            있습니다.</p>
                                    </div>
                                </details>
                                <details className="p-4 border rounded-lg">
                                    <summary className="font-semibold text-lg cursor-pointer">Is this QR code generator
                                        free to use?
                                    </summary>
                                    <div className="mt-2 pl-4">
                                        <p>Yes, our QR code generator is completely free to use with no limitations. You
                                            can create unlimited QR codes without registration or payment.</p>
                                    </div>
                                </details>
                            </div>
                        </section>

                        {/* 관련 자료 섹션 추가 */}
                        <section id="resources" className="mt-16 mb-8" aria-labelledby="resources-heading">
                            <h2 id="resources-heading" className="text-3xl font-bold mb-6">관련 자료 | Resources</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <article className="p-6 border rounded-lg shadow-sm">
                                    <h3 className="text-xl font-semibold mb-3">QR 코드 사용 가이드</h3>
                                    <p className="mb-4">효과적인 QR 코드 활용을 위한 팁과 모범 사례를 확인하세요.</p>
                                    <Link href="/guides/qr-usage" className="text-primary hover:underline">
                                        자세히 보기 →
                                    </Link>
                                </article>
                                <article className="p-6 border rounded-lg shadow-sm">
                                    <h3 className="text-xl font-semibold mb-3">QR 코드 디자인 팁</h3>
                                    <p className="mb-4">브랜드에 맞는 맞춤형 QR 코드를 디자인하는 방법을 알아보세요.</p>
                                    <Link href="/guides/qr-design" className="text-primary hover:underline">
                                        자세히 보기 →
                                    </Link>
                                </article>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar with ads */}
                    <aside className="lg:w-1/4 mt-8 lg:mt-0">
                        <div className="grid grid-cols-1 xl:grid-cols-1 gap-2 xl:flex-col xl:w-60 w-full">
                            {/* 인기 QR 코드 유형 사이드바 추가 - 클라이언트 컴포넌트로 분리 */}
                            <Suspense fallback={<div className="bg-muted animate-pulse rounded-lg mt-0 xl:mt-8"/>}>
                                <QRTypeSidebar/>
                            </Suspense>
                            <QRStatistics/>
                            <Suspense fallback={<div className="ad-container-sidebar skeleton"/>}>
                                <ClientSidebarAd/>
                            </Suspense>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="bg-muted py-8 mt-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-xl font-bold mb-4">무료 QR 코드 생성기 | Free QR Code Generator</h2>
                            <p>무제한으로 무료 QR 코드를 생성하세요. Create unlimited free QR codes.</p>
                        </div>
                        {/* 푸터 네비게이션 추가 - 클라이언트 컴포넌트로 분리 */}
                        <Suspense fallback={<div className="h-40 w-full md:w-1/2 bg-muted animate-pulse rounded-lg"/>}>
                            <QRFooterLinks/>
                        </Suspense>
                    </div>
                    <div className="border-t border-border mt-6 pt-6 text-center">
                        <p>&copy; {new Date().getFullYear()} QR 코드 생성기. 모든 권리 보유.</p>
                        <p className="mt-2">
                            <Link href="/privacy" className="text-sm hover:underline mx-2">개인정보처리방침</Link>
                            <Link href="/terms" className="text-sm hover:underline mx-2">이용약관</Link>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}