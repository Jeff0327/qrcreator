import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';
const inter = Inter({ subsets: ["latin"] });

// 별도의 viewport 설정
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#3b82f6",
};

export const metadata: Metadata = {
    title: "무료 QR 코드 생성기 - 쉽고 빠른 QR 코드 만들기",
    description: "회원가입 없이 무료로 QR 코드를 생성하세요. URL, 텍스트, 전화번호, SMS 등 다양한 정보를 담은 QR 코드를 즉시 만들고 저장할 수 있습니다.",
    keywords: "qr코드, qr코드 생성기, 무료 qr코드, qr코드 만들기, qr코드 다운로드, 온라인 qr코드 메이커",
    alternates: {
        canonical: "https://qrcode-generator.kr",
    },
    openGraph: {
        title: "무료 QR 코드 생성기 - 쉽고 빠른 QR 코드 만들기",
        description: "회원가입 없이 무료로 QR 코드를 생성하세요. URL, 텍스트, 전화번호, SMS 등 다양한 정보를 담은 QR 코드를 즉시 만들고 저장할 수 있습니다.",
        url: "https://qrcode-generator.kr",
        siteName: "무료 QR 코드 생성기",
        locale: "ko_KR",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "무료 QR 코드 생성기 - 쉽고 빠른 QR 코드 만들기",
        description: "회원가입 없이 무료로 QR 코드를 생성하세요. URL, 텍스트, 전화번호, SMS 등 다양한 정보를 담은 QR 코드를 즉시 만들고 저장할 수 있습니다.",
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
    metadataBase: new URL("https://qrcode-generator.kr"),
    manifest: "/manifest.json",
    authors: [{ name: "QR 코드 생성기" }],
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
            <meta charSet="utf-8" />
            {/* Google AdSense 계정 태그 */}
            <meta name="google-adsense-account" content="ca-pub-1622427124321210" />
            {/* Google Search Console 인증 태그 */}
            <meta name="google-site-verification" content="YOUR_GOOGLE_SITE_VERIFICATION_ID" />
            {/* Naver 웹마스터 도구 인증 태그 */}
            <meta name="naver-site-verification" content="YOUR_NAVER_SITE_VERIFICATION_ID" />

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
                    "url": "https://qrcode-generator.kr",
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
        <Analytics />
        </body>
        </html>
    );
}