'use client'
import React, { useState, useCallback, useEffect, useRef, Suspense } from 'react';
import Head from 'next/head';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
    DownloadIcon,
    TrashIcon,
    ShareIcon,
    QrCodeIcon,
    LinkIcon,
    PhoneIcon,
    WifiIcon,
    MailIcon,
    ImageIcon,
    UploadIcon,
    RotateCcwIcon
} from "lucide-react";
import { RxText } from "react-icons/rx";
import { MdSms } from "react-icons/md";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

// QR 코드 항목 타입 정의
interface QRCodeItem {
    id: string;
    text: string;
    imageUrl: string;
    createdAt: Date;
    type: string;
    hasLogo?: boolean;
}

// SearchParams를 사용하는 컴포넌트를 별도로 분리
function QRCreatorWithParams() {
    const searchParams = useSearchParams();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [text, setText] = useState('');
    const [qrCode, setQrCode] = useState('');
    const [savedQRCodes, setSavedQRCodes] = useState<QRCodeItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [currentTab, setCurrentTab] = useState('url');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [smsNumber, setSmsNumber] = useState('');
    const [smsMessage, setSmsMessage] = useState('');
    const [qrForeground, setQrForeground] = useState('#000000');
    const [qrBackground, setQrBackground] = useState('#ffffff');

    // 로고 관련 상태
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string>('');
    const [logoSize, setLogoSize] = useState([20]); // Slider 컴포넌트용 배열
    const [qrSize, setQrSize] = useState([300]); // QR 코드 크기
    const [logoMargin, setLogoMargin] = useState([8]); // 로고 주변 마진

    // WiFi QR 코드를 위한 상태
    const [wifiSSID, setWifiSSID] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [wifiEncryption, setWifiEncryption] = useState('WPA');
    const [wifiHidden, setWifiHidden] = useState(false);

    // 이메일 QR 코드를 위한 상태
    const [emailAddress, setEmailAddress] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');

    // URL 파라미터로부터 QR 코드 유형 감지 및 탭 변경
    useEffect(() => {
        const qrType = searchParams?.get('type');
        if (qrType && ['url', 'text', 'phone', 'sms', 'wifi', 'email'].includes(qrType)) {
            setCurrentTab(qrType);
        }
    }, [searchParams]);

    // 컴포넌트가 마운트된 후에만 localStorage에 접근
    useEffect(() => {
        setIsMounted(true);
        try {
            const stored = localStorage.getItem('qrCodes');
            if (stored) {
                setSavedQRCodes(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading saved QR codes:', error);
        }
    }, []);

    // QR 코드 목록이 변경될 때마다 로컬 스토리지에 저장
    useEffect(() => {
        if (isMounted && savedQRCodes.length > 0) {
            try {
                localStorage.setItem('qrCodes', JSON.stringify(savedQRCodes));
            } catch (error) {
                console.error('Error saving QR codes:', error);
            }
        }
    }, [savedQRCodes, isMounted]);

    // 현재 탭에 따라 QR 코드 콘텐츠 생성
    const getQRContent = useCallback(() => {
        switch (currentTab) {
            case 'url':
                return text;
            case 'text':
                return text;
            case 'phone':
                return `tel:${phoneNumber}`;
            case 'sms':
                return `SMSTO:${smsNumber}:${smsMessage}`;
            case 'wifi':
                return `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};H:${wifiHidden ? 'true' : 'false'};;`;
            case 'email':
                return `mailto:${emailAddress}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            default:
                return text;
        }
    }, [currentTab, text, phoneNumber, smsNumber, smsMessage, wifiSSID, wifiPassword, wifiEncryption, wifiHidden, emailAddress, emailSubject, emailBody]);

    // 로고 파일 업로드 핸들러
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setLogoFile(file);

            // 미리보기 생성
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setLogoPreview(result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('이미지 파일만 업로드할 수 있습니다.');
        }
    };

    // 로고 제거 함수
    const removeLogo = () => {
        setLogoFile(null);
        setLogoPreview('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // 로고가 포함된 QR 코드 생성 함수
    const generateQRCodeWithLogo = useCallback(async () => {
        const content = getQRContent();
        if (!content) return;

        setIsLoading(true);
        try {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // QR 코드 크기 설정
            const size = qrSize[0];
            canvas.width = size;
            canvas.height = size;

            // QR 코드 생성 옵션
            const qrOptions = {
                errorCorrectionLevel: 'H' as const, // 로고 삽입을 위해 높은 오류 복구 레벨 사용
                margin: 1,
                scale: 1,
                width: size,
                color: {
                    dark: qrForeground,
                    light: qrBackground,
                }
            };

            // QR 코드를 캔버스에 그리기
            await QRCode.toCanvas(canvas, content, qrOptions);

            // 로고가 있으면 중앙에 추가
            if (logoFile && logoPreview) {
                const img = new window.Image(); // window.Image()로 명시적으로 브라우저 Image 객체 사용
                img.onload = () => {
                    const logoSizePercent = logoSize[0];
                    const margin = logoMargin[0];

                    // 로고 크기 계산 (QR 코드 크기의 백분율)
                    const logoPixelSize = (size * logoSizePercent) / 100;
                    const x = (size - logoPixelSize) / 2;
                    const y = (size - logoPixelSize) / 2;

                    // 로고 배경 (흰색 원형 또는 사각형 배경)
                    const backgroundSize = logoPixelSize + (margin * 2);
                    const bgX = (size - backgroundSize) / 2;
                    const bgY = (size - backgroundSize) / 2;

                    // 배경 그리기
                    ctx.fillStyle = qrBackground;
                    ctx.fillRect(bgX, bgY, backgroundSize, backgroundSize);

                    // 로고를 원형으로 클립하기 (선택사항)
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(x + logoPixelSize/2, y + logoPixelSize/2, logoPixelSize/2, 0, 2 * Math.PI);
                    ctx.clip();

                    // 로고 그리기
                    ctx.drawImage(img, x, y, logoPixelSize, logoPixelSize);
                    ctx.restore();

                    // 결과를 데이터 URL로 변환
                    setQrCode(canvas.toDataURL('image/png', 1.0));
                };
                img.crossOrigin = 'anonymous';
                img.src = logoPreview;
            } else {
                // 로고가 없으면 일반 QR 코드
                setQrCode(canvas.toDataURL('image/png', 1.0));
            }
        } catch (err) {
            console.error('QR code generation error:', err);
            alert('QR 코드 생성 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [getQRContent, qrForeground, qrBackground, logoFile, logoPreview, logoSize, qrSize, logoMargin]);

    // QR 코드 저장 함수
    const saveQRCode = () => {
        const content = getQRContent();
        if (!qrCode || !content) return;

        const newQRCode: QRCodeItem = {
            id: uuidv4(),
            text: content,
            imageUrl: qrCode,
            createdAt: new Date(),
            type: currentTab,
            hasLogo: !!logoFile
        };

        setSavedQRCodes(prev => [newQRCode, ...prev]);

        // 입력 필드 초기화
        if (currentTab === 'url' || currentTab === 'text') {
            setText('');
        } else if (currentTab === 'phone') {
            setPhoneNumber('');
        } else if (currentTab === 'sms') {
            setSmsNumber('');
            setSmsMessage('');
        } else if (currentTab === 'wifi') {
            setWifiSSID('');
            setWifiPassword('');
        } else if (currentTab === 'email') {
            setEmailAddress('');
            setEmailSubject('');
            setEmailBody('');
        }
        setQrCode('');
    };

    // QR 코드 삭제 함수
    const deleteQRCode = (id: string) => {
        setSavedQRCodes(savedQRCodes.filter(code => code.id !== id));
    };

    // QR 코드 다운로드 함수
    const downloadQRCode = (imageUrl: string, text: string) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `qrcode-${text.substring(0, 20).replace(/[^a-zA-Z0-9]/g, '_')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // QR 코드 공유 함수
    const shareQRCode = async (imageUrl: string, text: string) => {
        if (typeof navigator === 'undefined' || !('share' in navigator)) {
            alert('웹 공유 API가 이 브라우저에서 지원되지 않습니다.');
            return;
        }

        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'qrcode.png', { type: 'image/png' });

            await navigator.share({
                title: 'QR 코드',
                text: `QR 코드: ${text}`,
                files: [file]
            });
        } catch (error) {
            console.error('QR 코드 공유 오류:', error);
        }
    };

    // 모든 QR 코드 삭제 함수
    const clearAllQRCodes = () => {
        if (confirm('저장된 모든 QR 코드를 삭제하시겠습니까?')) {
            setSavedQRCodes([]);
            localStorage.removeItem('qrCodes');
        }
    };

    // 탭 변경 시 입력 필드 및 QR 코드 초기화
    const handleTabChange = (value: string) => {
        setCurrentTab(value);
        setQrCode('');
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <QrCodeIcon className="w-6 h-6" />
                        고급 QR 코드 생성기
                    </CardTitle>
                    <CardDescription>
                        로고가 포함된 맞춤형 QR 코드를 생성하세요. URL, 텍스트, 전화번호, SMS, WiFi, 이메일 등 다양한 정보를 지원합니다.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="url" value={currentTab} onValueChange={handleTabChange} className="w-full">
                        <TabsList className="grid grid-cols-6 mb-6">
                            <TabsTrigger value="url" className="flex items-center gap-2">
                                <LinkIcon size={16} />
                                <span className="hidden sm:inline">URL</span>
                            </TabsTrigger>
                            <TabsTrigger value="text" className="flex items-center gap-1">
                                <RxText size={18}/>
                                <span className="hidden sm:inline">텍스트</span>
                            </TabsTrigger>
                            <TabsTrigger value="phone" className="flex items-center gap-2">
                                <PhoneIcon size={16} />
                                <span className="hidden sm:inline">전화</span>
                            </TabsTrigger>
                            <TabsTrigger value="sms" className="flex items-center gap-2">
                                <MdSms/>
                                <span className="hidden sm:inline">SMS</span>
                            </TabsTrigger>
                            <TabsTrigger value="wifi" className="flex items-center gap-2">
                                <WifiIcon size={16} />
                                <span className="hidden sm:inline">WiFi</span>
                            </TabsTrigger>
                            <TabsTrigger value="email" className="flex items-center gap-2">
                                <MailIcon size={16} />
                                <span className="hidden sm:inline">이메일</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* 기존 탭 콘텐츠들 */}
                        <TabsContent value="url" className="mt-0">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="url-input">URL 입력</Label>
                                    <Input
                                        id="url-input"
                                        placeholder="https://example.com"
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="text" className="mt-0">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="text-input">텍스트 입력</Label>
                                    <Textarea
                                        id="text-input"
                                        placeholder="여기에 텍스트를 입력하세요..."
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="phone" className="mt-0">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="phone-input">전화번호 입력</Label>
                                    <Input
                                        id="phone-input"
                                        placeholder="01012345678"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="sms" className="mt-0">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="sms-phone-input">전화번호</Label>
                                    <Input
                                        id="sms-phone-input"
                                        placeholder="01012345678"
                                        value={smsNumber}
                                        onChange={(e) => setSmsNumber(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sms-message-input">메시지</Label>
                                    <Textarea
                                        id="sms-message-input"
                                        placeholder="메시지 내용을 입력하세요..."
                                        value={smsMessage}
                                        onChange={(e) => setSmsMessage(e.target.value)}
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="wifi" className="mt-0">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="wifi-ssid-input">WiFi 네트워크 이름 (SSID)</Label>
                                    <Input
                                        id="wifi-ssid-input"
                                        placeholder="네트워크 이름"
                                        value={wifiSSID}
                                        onChange={(e) => setWifiSSID(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="wifi-password-input">비밀번호</Label>
                                    <Input
                                        id="wifi-password-input"
                                        type="password"
                                        placeholder="WiFi 비밀번호"
                                        value={wifiPassword}
                                        onChange={(e) => setWifiPassword(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="wifi-encryption-input">암호화 유형</Label>
                                    <select
                                        id="wifi-encryption-input"
                                        className="w-full p-2 border rounded"
                                        value={wifiEncryption}
                                        onChange={(e) => setWifiEncryption(e.target.value)}
                                    >
                                        <option value="WPA">WPA/WPA2/WPA3</option>
                                        <option value="WEP">WEP</option>
                                        <option value="nopass">암호 없음</option>
                                    </select>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="wifi-hidden-input"
                                        checked={wifiHidden}
                                        onChange={(e) => setWifiHidden(e.target.checked)}
                                    />
                                    <Label htmlFor="wifi-hidden-input">숨겨진 네트워크</Label>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="email" className="mt-0">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email-address-input">이메일 주소</Label>
                                    <Input
                                        id="email-address-input"
                                        type="email"
                                        placeholder="recipient@example.com"
                                        value={emailAddress}
                                        onChange={(e) => setEmailAddress(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email-subject-input">제목</Label>
                                    <Input
                                        id="email-subject-input"
                                        placeholder="이메일 제목"
                                        value={emailSubject}
                                        onChange={(e) => setEmailSubject(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email-body-input">내용</Label>
                                    <Textarea
                                        id="email-body-input"
                                        placeholder="이메일 내용을 입력하세요..."
                                        value={emailBody}
                                        onChange={(e) => setEmailBody(e.target.value)}
                                        rows={3}
                                    />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                        {/* 설정 패널 */}
                        <div className="space-y-6">
                            {/* 로고 업로드 섹션 */}
                            <div className="space-y-4 p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
                                <div className="flex items-center gap-2 mb-3">
                                    <ImageIcon className="w-5 h-5 text-blue-600" />
                                    <Label className="text-lg font-semibold">로고/아이콘 추가</Label>
                                </div>

                                <div className="space-y-3">
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoUpload}
                                        className="hidden"
                                        id="logo-upload"
                                    />

                                    {logoPreview ? (
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 border rounded-lg overflow-hidden bg-white">
                                                <Image
                                                    src={logoPreview}
                                                    alt="로고 미리보기"
                                                    width={64}
                                                    height={64}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium">{logoFile?.name}</p>
                                                <p className="text-xs text-gray-500">{(logoFile?.size || 0 / 1024).toFixed(1)}KB</p>
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={removeLogo}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="logo-upload"
                                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                                        >
                                            <UploadIcon className="w-8 h-8 text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">클릭하여 로고 업로드</p>
                                            <p className="text-xs text-gray-400">PNG, JPG, SVG 지원</p>
                                        </label>
                                    )}

                                    {logoPreview && (
                                        <>
                                            <div className="space-y-2">
                                                <Label>로고 크기: {logoSize[0]}%</Label>
                                                <Slider
                                                    value={logoSize}
                                                    onValueChange={setLogoSize}
                                                    max={30}
                                                    min={10}
                                                    step={1}
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>로고 여백: {logoMargin[0]}px</Label>
                                                <Slider
                                                    value={logoMargin}
                                                    onValueChange={setLogoMargin}
                                                    max={20}
                                                    min={4}
                                                    step={2}
                                                    className="w-full"
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* QR 코드 설정 */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label>QR 코드 색상</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <Label htmlFor="foreground-color" className="text-xs">전경색</Label>
                                            <div className="flex">
                                                <Input
                                                    id="foreground-color"
                                                    type="color"
                                                    value={qrForeground}
                                                    onChange={(e) => setQrForeground(e.target.value)}
                                                    className="w-12 h-10 p-1"
                                                />
                                                <Input
                                                    type="text"
                                                    value={qrForeground}
                                                    onChange={(e) => setQrForeground(e.target.value)}
                                                    className="ml-2 text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="background-color" className="text-xs">배경색</Label>
                                            <div className="flex">
                                                <Input
                                                    id="background-color"
                                                    type="color"
                                                    value={qrBackground}
                                                    onChange={(e) => setQrBackground(e.target.value)}
                                                    className="w-12 h-10 p-1"
                                                />
                                                <Input
                                                    type="text"
                                                    value={qrBackground}
                                                    onChange={(e) => setQrBackground(e.target.value)}
                                                    className="ml-2 text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>QR 코드 크기: {qrSize[0]}px</Label>
                                    <Slider
                                        value={qrSize}
                                        onValueChange={setQrSize}
                                        max={500}
                                        min={200}
                                        step={50}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    onClick={generateQRCodeWithLogo}
                                    disabled={
                                        isLoading ||
                                        (currentTab === 'url' && !text) ||
                                        (currentTab === 'text' && !text) ||
                                        (currentTab === 'phone' && !phoneNumber) ||
                                        (currentTab === 'sms' && (!smsNumber || !smsMessage)) ||
                                        (currentTab === 'wifi' && !wifiSSID) ||
                                        (currentTab === 'email' && !emailAddress)
                                    }
                                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                >
                                    {isLoading ? (
                                        <>
                                            <RotateCcwIcon className="w-4 h-4 mr-2 animate-spin" />
                                            생성 중...
                                        </>
                                    ) : (
                                        <>
                                            <QrCodeIcon className="w-4 h-4 mr-2" />
                                            QR 코드 생성
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* 미리보기 패널 */}
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-8 bg-gray-50 min-h-[500px]">
                            {qrCode ? (
                                <div className="space-y-6 text-center">
                                    <div className="bg-white p-6 rounded-xl shadow-lg inline-block">
                                        <Image
                                            src={qrCode}
                                            alt="생성된 QR 코드"
                                            width={qrSize[0]}
                                            height={qrSize[0]}
                                            className="rounded-lg"
                                        />
                                    </div>

                                    {logoPreview && (
                                        <div className="flex items-center justify-center gap-2 text-sm text-green-600">
                                            <ImageIcon className="w-4 h-4" />
                                            <span>로고가 포함된 QR 코드</span>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 gap-3 w-full max-w-sm">
                                        <Button
                                            onClick={() => downloadQRCode(qrCode, getQRContent())}
                                            className="w-full"
                                            variant="outline"
                                        >
                                            <DownloadIcon size={16} className="mr-2" />
                                            PNG 다운로드
                                        </Button>
                                        <Button
                                            onClick={saveQRCode}
                                            className="w-full bg-blue-600 hover:bg-blue-700"
                                        >
                                            <QrCodeIcon size={16} className="mr-2" />
                                            QR 코드 저장
                                        </Button>
                                        {typeof navigator !== 'undefined' && 'share' in navigator && (
                                            <Button
                                                variant="secondary"
                                                onClick={() => shareQRCode(qrCode, getQRContent())}
                                                className="w-full"
                                            >
                                                <ShareIcon size={16} className="mr-2" />
                                                공유하기
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center space-y-4">
                                    <div className="w-24 h-24 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                                        <QrCodeIcon size={32} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-medium text-gray-600">QR 코드 미리보기</p>
                                        <p className="text-sm text-gray-500 mt-2">정보를 입력하고 생성 버튼을 클릭하세요</p>
                                    </div>
                                    {logoPreview && (
                                        <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
                                            <ImageIcon className="w-4 h-4" />
                                            <span>로고가 준비되었습니다</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 숨겨진 캔버스 */}
                    <canvas
                        ref={canvasRef}
                        style={{ display: 'none' }}
                    />
                </CardContent>
            </Card>

            {/* 저장된 QR 코드 목록 */}
            {isMounted && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>저장된 QR 코드</CardTitle>
                            <CardDescription>이전에 생성한 QR 코드 모음</CardDescription>
                        </div>
                        {savedQRCodes.length > 0 && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={clearAllQRCodes}
                            >
                                <TrashIcon size={16} className="mr-2" />
                                모두 삭제
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        {(!isMounted || savedQRCodes.length === 0) ? (
                            <div className="text-center py-12 text-gray-500">
                                <QrCodeIcon size={48} className="mx-auto mb-4 text-gray-300" />
                                <p className="text-lg">저장된 QR 코드가 없습니다</p>
                                <p className="text-sm mt-1">QR 코드를 생성하고 저장하면 여기에 표시됩니다</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {savedQRCodes.map((code) => (
                                    <Card key={code.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="bg-gray-50 p-4 flex justify-center items-center h-40">
                                            <Image
                                                src={code.imageUrl}
                                                alt={`QR 코드: ${code.text}`}
                                                width={120}
                                                height={120}
                                                className="rounded-lg"
                                                loading="lazy"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium truncate flex-1" title={code.text}>
                                                        {code.text}
                                                    </p>
                                                    {code.hasLogo && (
                                                        <ImageIcon className="w-4 h-4 text-blue-500"/>
                                                    )}
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <p className="text-xs text-gray-500">
                                                        {new Date(code.createdAt).toLocaleDateString()}
                                                    </p>
                                                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                                        {code.type === 'url' ? 'URL' :
                                                            code.type === 'text' ? '텍스트' :
                                                                code.type === 'phone' ? '전화' :
                                                                    code.type === 'sms' ? 'SMS' :
                                                                        code.type === 'wifi' ? 'WiFi' : '이메일'}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-4 pt-0 flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => downloadQRCode(code.imageUrl, code.text)}
                                                className="flex-1"
                                            >
                                                <DownloadIcon size={14} className="mr-1" />
                                                다운로드
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => deleteQRCode(code.id)}
                                                className="flex-1"
                                            >
                                                <TrashIcon size={14} className="mr-1" />
                                                삭제
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

// 로딩 컴포넌트
function QRCreatorFallback() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <QrCodeIcon className="w-6 h-6" />
                        고급 QR 코드 생성기
                    </CardTitle>
                    <CardDescription>
                        로고가 포함된 맞춤형 QR 코드를 생성하세요. URL, 텍스트, 전화번호, SMS, WiFi, 이메일 등 다양한 정보를 지원합니다.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-pulse text-gray-500">
                            QR 코드 생성기를 로딩 중입니다...
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// 메인 컴포넌트
function ImgQRCreator() {
    // 동적 메타 제목과 설명을 위한 기본값
    const getPageTitle = () => {
        return 'QR 코드 생성기 - 무료 로고 포함 | QR Make';
    };

    const getPageDescription = () => {
        return 'URL, 텍스트, 전화번호, WiFi, 이메일을 QR 코드로 변환하여 쉽게 공유하세요. 로고 포함, 색상 커스터마이징 가능한 무료 QR 코드 생성기.';
    };

    // 구조화된 데이터
    const structuredData = {
        "@context": "https://schema.org",
        "@type": ["WebApplication", "SoftwareApplication"],
        "name": "QR Make - 고급 QR 코드 생성기",
        "description": "로고가 포함된 고품질 QR 코드를 무료로 생성하세요. URL, 텍스트, 전화번호, WiFi, 이메일 등 다양한 정보를 지원합니다.",
        "url": "https://qrmake.kr",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Web Browser",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "KRW"
        },
        "featureList": [
            "로고가 포함된 QR 코드 생성",
            "URL, 텍스트, 전화번호, SMS, WiFi, 이메일 지원",
            "색상 커스터마이징",
            "고해상도 PNG 다운로드",
            "모바일 최적화"
        ],
        "screenshot": "https://qrmake.kr/banner/QRbanner.png",
        "author": {
            "@type": "Organization",
            "name": "QR Make"
        }
    };

    return (
        <>
            <Head>
                {/* 기본 메타 태그 */}
                <title>{getPageTitle()}</title>
                <meta name="description" content={getPageDescription()} />
                <meta name="keywords" content="QR코드 생성기, 무료 QR코드, 로고 포함 QR코드, URL QR코드, WiFi QR코드, 전화번호 QR코드, SMS QR코드, 이메일 QR코드, QR 코드 메이커" />

                {/* 뷰포트 및 문자 인코딩 */}
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta charSet="utf-8" />

                {/* 언어 및 지역 */}
                <meta name="language" content="ko-KR" />
                <meta name="geo.region" content="KR" />
                <meta name="geo.country" content="Korea" />

                {/* 로봇 크롤링 지침 */}
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow" />

                {/* Open Graph (Facebook, 카카오톡) */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={getPageTitle()} />
                <meta property="og:description" content={getPageDescription()} />
                <meta property="og:image" content="https://qrmake.kr/banner/QRbanner.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:url" content="https://qrmake.kr" />
                <meta property="og:site_name" content="QR Make" />
                <meta property="og:locale" content="ko_KR" />

                {/* Twitter 카드 */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={getPageTitle()} />
                <meta name="twitter:description" content={getPageDescription()} />
                <meta name="twitter:image" content="https://qrmake.kr/banner/QRbanner.png" />
                <meta name="twitter:site" content="@qrmake" />

                {/* 캐노니컬 URL */}
                <link rel="canonical" href="https://qrmake.kr" />

                {/* 대체 언어 */}
                <link rel="alternate" hrefLang="ko" href="https://qrmake.kr" />
                <link rel="alternate" hrefLang="en" href="https://qrmake.kr/en" />
                <link rel="alternate" hrefLang="x-default" href="https://qrmake.kr" />

                {/* 파비콘 */}
                <link rel="icon" href="/favicon.ico" />

                {/* 구조화된 데이터 */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData)
                    }}
                />

                {/* 추가 SEO 메타 */}
                <meta name="author" content="QR Make" />
                <meta name="publisher" content="QR Make" />
                <meta name="theme-color" content="#2563eb" />
                <meta name="application-name" content="QR Make" />
                <meta name="format-detection" content="telephone=no" />

                {/* 모바일 웹앱 메타 */}
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="QR Make" />
            </Head>

            <Suspense fallback={<QRCreatorFallback />}>
                <QRCreatorWithParams />
            </Suspense>
        </>
    );
}

export default ImgQRCreator;