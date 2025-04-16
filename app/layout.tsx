import type {Metadata, Viewport} from "next";
import {Inter} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import {Analytics} from '@vercel/analytics/react';

const inter = Inter({subsets: ["latin"]});

// 별도의 viewport 설정
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#3b82f6",
};

export const metadata: Metadata = {
    title: "무료 QR 코드 만들기",
    description: "무료로 QR 코드를 생성하세요. URL, 텍스트, 전화번호, SMS 등 다양한 정보를 담은 QR 코드를 즉시 만들고 저장할 수 있습니다. Create QR codes for free without registration. Generate and save QR codes instantly for URLs, text, phone numbers, SMS, and more.",
    keywords: "QR, qr코드, qr코드 생성기, 무료 qr코드, qr코드 만들기, qr코드 다운로드, 온라인 qr코드 메이커, qr코드 스캔, qr코드 생성 사이트, qr코드 만들기 무료, 무료 qr코드, QR코드, qr코드 리더, qr코드 스캐너, qr코드 제작, qr코드 제조기, qr코드 앱, 온라인 qr코드, qr코드 이미지, qr코드 url, qr코드 저장,QR, QR Generator,google, naver,네이버 QR,QR 네이버, qr code, qr code generator, free qr code, create qr code, qr code maker, qr code download, online qr code creator, qr code scanner, generate qr code, qr code free, qr code reader, qr code online, qr code maker free, qr code app, qr code url, qr code image, custom qr code, dynamic qr code, scan qr code, qr code generator free",
    alternates: {
        canonical: "https://www.qrmake.kr",
    },
    openGraph: {
        title: "무료 QR 코드 만들기",
        description: "무료로 QR 코드를 생성하세요. URL, 텍스트, 전화번호, SMS 등 다양한 정보를 담은 QR 코드를 즉시 만들고 저장할 수 있습니다. Create QR codes for free without registration.",
        url: "https://www.qrmake.kr",
        siteName: "무료 QR 코드 생성기 | Free QR Code Generator",
        locale: "ko_KR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "무료 QR 코드 만들기",
        description: "무료로 QR 코드를 생성하세요. URL, 텍스트, 전화번호, SMS 등. Create QR codes for free without registration.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    category: "기술",
    metadataBase: new URL("https://www.qrmake.kr"),
    manifest: "/manifest.json",
    authors: [{name: "QR 코드 생성기"}],
    creator: "QR 코드 생성기 Team",
    publisher: "QR 코드 생성기 Service",
    formatDetection: {
        telephone: true,
        address: true,
        email: true,
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
        <head>
            <meta charSet="utf-8"/>
            {/* Google AdSense 계정 태그 */}
            <meta name="google-adsense-account" content="ca-pub-1622427124321210"/>
            {/* Google Search Console 인증 태그 */}
            <meta name="google-site-verification" content="j9HyeLmKhlQr_-mJHAs1w-WDu7amEDPHJao-SKtgzMw"/>
            {/* Naver 웹마스터 도구 인증 태그 */}
            <meta name="naver-site-verification" content="48f26a171bfe01539897ff290ece5e8d75cd16ed"/>

            {/* 구글 애널리틱스 스크립트 */}
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-DYPWY7ZV1C"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-DYPWY7ZV1C');
                `}
            </Script>

            {/* 구글 AdSense 스크립트 */}
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1622427124321210"
                strategy="afterInteractive"
                crossOrigin="anonymous"
            />
        </head>
        <body className={inter.className}>
        {/* 구조화된 데이터 */}
        <Script
            id="schema-org"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    "name": "무료 QR 코드 생성기",
                    "description": "회원가입 없이 무료로 QR 코드를 생성하세요. URL, 텍스트, 전화번호, SMS 등 다양한 정보를 담은 QR 코드를 즉시 만들고 저장할 수 있습니다.",
                    "url": "https://www.qrmake.kr",
                    "applicationCategory": "UtilityApplication",
                    "operatingSystem": "Any",
                    "offers": {
                        "@type": "Offer",
                        "price": "0",
                        "priceCurrency": "KRW"
                    },
                    "featureList": "QR 코드 생성, QR 코드 다운로드, 회원가입 불필요, 완전 무료",
                    "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "ratingCount": "870",
                        "bestRating": "5",
                        "worstRating": "1"
                    }
                }),
            }}
        />
        {children}
        <Analytics/>
        </body>
        </html>
    );
}