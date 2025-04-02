import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import ClientSidebarAd from "@/components/ClientSidebarAd";

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

            <main className="container mx-auto px-4 py-8">
                {/* Top ad banner */}
                {/*<Suspense fallback={<div className="ad-container skeleton" />}>*/}
                {/*    <AdBanner />*/}
                {/*</Suspense>*/}

                <div className="lg:flex lg:space-x-8">
                    <div className="lg:w-3/4">
                        <section className="mb-8">
                            <h1 className="text-4xl font-bold mb-4">무료 QR 코드 생성기</h1>
                            <h2 className="text-gray-800 text-2xl font-medium mb-4 text-muted-foreground">몇 초 만에 QR 코드 만들기</h2>
                            <p className="text-lg mb-6">
                                웹사이트, 텍스트, 연락처 등 다양한 정보를 담은 QR 코드를 무제한으로 생성하세요.
                                회원가입 없이 쉽고 완전 무료로 사용 가능합니다.
                            </p>
                        </section>

                        {/* QR Generator Component */}
                        <Suspense fallback={<div className="h-96 bg-muted animate-pulse rounded-lg" />}>
                            <QRCreator />
                        </Suspense>

                        {/* Features Section */}
                        <section id="features" className="mt-16 mb-8">
                            <h2 className="text-3xl font-bold mb-6">주요 기능</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 border rounded-lg shadow-sm">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <h3 className="text-xl font-semibold">다양한 QR 코드 유형</h3>
                                    </div>
                                    <p>URL, 텍스트, 전화번호, SMS 메시지 등 다양한 유형의 QR 코드를 생성할 수 있습니다.</p>
                                </div>

                                <div className="p-6 border rounded-lg shadow-sm">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <h3 className="text-xl font-semibold">커스터마이징</h3>
                                    </div>
                                    <p>QR 코드의 색상을 변경하여 브랜드나 디자인에 맞게 맞춤 설정할 수 있습니다.</p>
                                </div>

                                <div className="p-6 border rounded-lg shadow-sm">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <h3 className="text-xl font-semibold">저장 및 다운로드</h3>
                                    </div>
                                    <p>생성한 QR 코드를 로컬에 저장하고 PNG 이미지로 다운로드하여 프로젝트에 활용할 수 있습니다.</p>
                                </div>

                                <div className="p-6 border rounded-lg shadow-sm">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <h3 className="text-xl font-semibold">회원가입 불필요</h3>
                                    </div>
                                    <p>계정 생성 없이 즉시 QR 코드를 생성하고 사용할 수 있습니다.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar with ads */}
                    <aside className="lg:w-1/4 mt-8 lg:mt-0">
                        <div className="sticky top-4">
                            <Suspense fallback={<div className="ad-container-sidebar skeleton" />}>
                                <ClientSidebarAd />
                            </Suspense>
                        </div>
                    </aside>
                </div>
            </main>

            <footer className="bg-muted py-8 mt-12">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-xl font-bold mb-4">무료 QR 코드 생성기</h2>
                            <p>무제한으로 무료 QR 코드를 생성하세요.</p>
                        </div>
                    </div>
                    <div className="border-t border-border mt-6 pt-6 text-center">
                        <p>&copy; {new Date().getFullYear()} QR 코드 생성기. 모든 권리 보유.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}