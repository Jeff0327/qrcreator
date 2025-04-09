'use client'

import Link from "next/link";

export default function QRFooterLinks() {
    // QR 유형 버튼 클릭 핸들러
    const handleQRTypeClick = (type: string) => {
        // 페이지 최상단의 QRCreator 컴포넌트에 focus하고 해당 탭 선택
        const qrCreatorElement = document.getElementById('qr-creator-tabs');
        if (qrCreatorElement) {
            qrCreatorElement.scrollIntoView({ behavior: 'smooth' });

            // 탭 전환을 위한 이벤트 발생
            const tabButton = document.querySelector(`[data-value="${type}"]`);
            if (tabButton) {
                (tabButton as HTMLElement).click();
            }
        }
    };

    return (
        <nav className="grid grid-cols-2 gap-4">
            <div>
                <h3 className="text-lg font-semibold mb-2">QR 코드 유형</h3>
                <ul className="space-y-1">
                    <li><button onClick={() => handleQRTypeClick('url')} className="hover:underline text-left">URL QR 코드</button></li>
                    <li><button onClick={() => handleQRTypeClick('text')} className="hover:underline text-left">텍스트 QR 코드</button></li>
                    <li><button onClick={() => handleQRTypeClick('wifi')} className="hover:underline text-left">WiFi QR 코드</button></li>
                    <li><button onClick={() => handleQRTypeClick('email')} className="hover:underline text-left">이메일 QR 코드</button></li>
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-2">자료</h3>
                <ul className="space-y-1">
                    <li><Link href="/guides" className="hover:underline">사용 가이드</Link></li>
                    <li><Link href="/blog" className="hover:underline">블로그</Link></li>
                    <li><Link href="/about" className="hover:underline">서비스 소개</Link></li>
                    <li><Link href="/contact" className="hover:underline">문의하기</Link></li>
                </ul>
            </div>
        </nav>
    );
}