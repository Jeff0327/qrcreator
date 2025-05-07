'use client'
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function FeatureSection() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <section id="features" className="mt-16 mb-8" aria-labelledby="features-heading">
            <h2 id="features-heading" className="text-3xl font-bold mb-6" data-aos="fade-up">
                주요 기능 | Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <article
                    className="p-6 border rounded-lg shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
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

                <article
                    className="p-6 border rounded-lg shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
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

                <article
                    className="p-6 border rounded-lg shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
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

                <article
                    className="p-6 border rounded-lg shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay="400"
                >
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
    );
}

export default FeatureSection;
