'use client';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Head from 'next/head';

function TitleSection() {
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    return (
        <>
            {/* SEO 관련 메타 정보 설정 */}
            <Head>
                <title>무료 QR 코드 생성기 | Free QR Code Generator</title>
                <meta
                    name="description"
                    content="웹사이트, 텍스트, 연락처 등 다양한 정보를 담은 QR 코드를 무료로 쉽고 빠르게 생성하세요. 회원가입 없이 바로 사용 가능합니다."
                />
            </Head>

            {/* 실제 콘텐츠 섹션 */}
            <section className="w-full lg:w-1/2" data-aos="fade-up">
                <h1
                    className="text-2xl xl:text-3xl font-bold mb-2 xl:mb-4"
                    data-aos="fade-right"
                    data-aos-delay="100"
                >
                    무료 QR 코드 생성기 <br /> Free QR Code Generator
                </h1>
                <h2
                    className="text-gray-800 text-md xl:text-2xl font-medium mb-4 text-muted-foreground"
                    data-aos="fade-left"
                    data-aos-delay="200"
                >
                    몇 초 만에 QR 코드 만들기 <br /> Create QR Codes in Seconds
                </h2>
                <p
                    className="text-sm lg:text-md xl:text-lg mb-2 xl:mb-6"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    웹사이트, 텍스트, 연락처 등 다양한 정보를 담은 QR 코드를 무제한으로 생성하세요.
                    회원가입 없이 쉽고 완전 무료로 사용 가능합니다.
                </p>
                <p
                    className="text-sm xl:text-base mb-6"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
                    Create unlimited QR codes for websites, text, contact information, and more.
                    No registration required – completely free and easy to use.
                </p>
            </section>
        </>
    );
}

export default TitleSection;
