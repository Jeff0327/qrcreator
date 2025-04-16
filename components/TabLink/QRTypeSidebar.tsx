'use client'

import { Button } from "@/components/ui/button";
import { LinkIcon, TextIcon, PhoneIcon, WifiIcon, MailIcon } from "lucide-react";
import { MdSms } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function QRTypeSidebar() {
    const router = useRouter();

    // 사이드바 버튼 클릭 핸들러
    const handleQRTypeClick = (type: string) => {
        // 현재 URL에 쿼리 파라미터 추가
        router.push(`/?type=${type}#qr-creator-tabs`);

        // 스크롤 위치 조정
        const qrCreatorElement = document.getElementById('qr-creator-tabs');
        if (qrCreatorElement) {
            setTimeout(() => {
                qrCreatorElement.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    return (
        <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-bold mb-4">인기 QR 코드 유형</h3>
            <div className="space-y-2">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-primary hover:text-primary-foreground hover:bg-blue-300"
                    onClick={() => handleQRTypeClick('url')}
                >
                    <LinkIcon size={16} className="mr-2" />
                    URL QR 코드 만들기
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-primary hover:text-primary-foreground hover:bg-blue-300"
                    onClick={() => handleQRTypeClick('text')}
                >
                    <TextIcon size={16} className="mr-2" />
                    텍스트 QR 코드 만들기
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-primary hover:text-primary-foreground hover:bg-blue-300"
                    onClick={() => handleQRTypeClick('phone')}
                >
                    <PhoneIcon size={16} className="mr-2" />
                    전화번호 QR 코드 만들기
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-primary hover:text-primary-foreground hover:bg-blue-300"
                    onClick={() => handleQRTypeClick('sms')}
                >
                    <MdSms className="mr-2" size={16} />
                    SMS QR 코드 만들기
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-primary hover:text-primary-foreground hover:bg-blue-300"
                    onClick={() => handleQRTypeClick('wifi')}
                >
                    <WifiIcon size={16} className="mr-2" />
                    WiFi QR 코드 만들기
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-primary hover:text-primary-foreground hover:bg-blue-300"
                    onClick={() => handleQRTypeClick('email')}
                >
                    <MailIcon size={16} className="mr-2" />
                    이메일 QR 코드 만들기
                </Button>
            </div>
        </div>
    );
}