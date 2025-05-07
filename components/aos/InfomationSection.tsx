'use client';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function InfomationSection() {
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    return (
        <section id="qr-info" className="mt-16 mb-8" aria-labelledby="qr-info-heading" data-aos="fade-up">
            <h2 id="qr-info-heading" className="text-3xl font-bold mb-6" data-aos="fade-down">
                QR 코드란? | What is a QR Code?
            </h2>
            <div className="bg-muted/50 p-6 rounded-lg" data-aos="fade-up" data-aos-delay="100">
                <p className="mb-4">
                    QR 코드(Quick Response Code)는 1994년 일본의 덴소 웨이브(Denso Wave)에서 개발한 2차원 바코드입니다.
                    기존 바코드보다 훨씬 많은 정보를 담을 수 있으며, 스마트폰 카메라로 빠르게 스캔할 수 있는 특징이 있습니다.
                </p>
                <p className="mb-4">
                    QR codes (Quick Response Codes) are two-dimensional barcodes that can store various
                    types of information. When scanned with a smartphone camera, they quickly connect
                    users to websites, display text, share contact information, and more.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div data-aos="fade-right" data-aos-delay="200">
                        <h3 className="text-xl font-semibold mb-2">QR 코드 스캔 방법 | How to Scan</h3>
                        <ol className="list-decimal list-inside ml-4">
                            <li className="mb-2">스마트폰 카메라 앱을 실행합니다.</li>
                            <li className="mb-2">QR 코드가 화면에 들어오도록 조준합니다.</li>
                            <li className="mb-2">자동으로 인식된 링크를 탭하거나 화면의 안내를 따릅니다.</li>
                            <li>최신 iOS 및 Android 기기는 별도의 앱 없이 기본 카메라로 스캔이 가능합니다.</li>
                        </ol>
                    </div>
                    <div data-aos="fade-left" data-aos-delay="300">
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
    );
}

export default InfomationSection;
