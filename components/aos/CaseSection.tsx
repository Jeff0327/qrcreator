'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import AOS from "aos";

function CaseSection() {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    return (
        <section id="use-cases" className="mt-16 mb-8" aria-labelledby="use-cases-heading">
            <h2
                id="use-cases-heading"
                className="text-3xl font-bold mb-6"
                data-aos={ "fade-down"}
            >
                이렇게 사용해보세요 | Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <article
                    className="flex flex-col items-center"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                >
                    <h3 className="text-xl mb-2">전단지 | Flyers</h3>
                    <div className="aspect-square w-[400px] md:w-[300px] lg:w-full overflow-hidden rounded-lg my-12 md:my-6">
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
                <article
                    className="flex flex-col items-center"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                >
                    <h3 className="text-xl mb-2">명함 | Business Cards</h3>
                    <div className="aspect-square w-[400px] md:w-[300px] lg:w-full overflow-hidden rounded-lg my-12 md:my-6">
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
                <article
                    className="flex flex-col items-center"
                    data-aos="zoom-in"
                    data-aos-delay= "300"
                >
                    <h3 className="text-xl mb-2">포스터 | Posters</h3>
                    <div className="aspect-square w-[400px] md:w-[300px] lg:w-full overflow-hidden rounded-lg my-12 md:my-6">
                        <Image
                            src="/samples/sample_3.jpg"
                            alt="포스터에 사용된 QR 코드 예시 - QR code on a poster example"
                            width={500}
                            height={500}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    <p className="mt-2 text-center">이벤트 포스터에 QR 코드를 추가하여 온라인 티켓 판매나 상세 정보 페이지로 연결하세요.</p>
                </article>
            </div>
        </section>
    );
}

export default CaseSection;