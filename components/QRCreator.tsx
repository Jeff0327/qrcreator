'use client'
import React, { useState, useCallback, useEffect } from 'react';
import QRCode from 'qrcode';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DownloadIcon, TrashIcon, ShareIcon, QrCodeIcon, LinkIcon, TextIcon, PhoneIcon } from "lucide-react";
import { MdSms } from "react-icons/md";

// QR 코드 항목 타입 정의
interface QRCodeItem {
    id: string;
    text: string;
    imageUrl: string;
    createdAt: Date;
    type: string;
}

function QRCreator() {
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
            default:
                return text;
        }
    }, [currentTab, text, phoneNumber, smsNumber, smsMessage]);

    // QR 코드 생성 함수
    const generateQRCode = useCallback(async () => {
        const content = getQRContent();
        if (!content) return;

        setIsLoading(true);
        try {
            const url = await QRCode.toDataURL(content, {
                errorCorrectionLevel: 'H',
                margin: 1,
                scale: 8,
                width: 300,
                color: {
                    dark: qrForeground,
                    light: qrBackground,
                }
            });
            setQrCode(url);
        } catch (err) {
            console.error('QR code generation error:', err);
            alert('QR 코드 생성 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [getQRContent, qrForeground, qrBackground]);

    // QR 코드 저장 함수
    const saveQRCode = () => {
        const content = getQRContent();
        if (!qrCode || !content) return;

        const newQRCode: QRCodeItem = {
            id: uuidv4(),
            text: content,
            imageUrl: qrCode,
            createdAt: new Date(),
            type: currentTab
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
            // 데이터 URL을 Blob으로 변환
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
                    <CardTitle className="text-2xl">QR 코드 생성기</CardTitle>
                    <CardDescription>
                        URL, 텍스트, 전화번호 또는 SMS 메시지에 대한 QR 코드를 생성하세요.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="url" value={currentTab} onValueChange={handleTabChange} className="w-full">
                        <TabsList className="grid grid-cols-4 mb-6">
                            <TabsTrigger value="url" className="flex items-center gap-2">
                                <LinkIcon size={16} />
                                <span className="hidden sm:inline">URL</span>
                            </TabsTrigger>
                            <TabsTrigger value="text" className="flex items-center gap-2">
                                <TextIcon size={16} />
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
                        </TabsList>

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
                    </Tabs>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>QR 코드 색상</Label>
                                <div className="flex space-x-4">
                                    <div className="space-y-1 flex-1">
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
                                                className="w-full ml-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1 flex-1">
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
                                                className="w-full ml-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button
                                    onClick={generateQRCode}
                                    disabled={
                                        isLoading ||
                                        (currentTab === 'url' && !text) ||
                                        (currentTab === 'text' && !text) ||
                                        (currentTab === 'phone' && !phoneNumber) ||
                                        (currentTab === 'sms' && (!smsNumber || !smsMessage))
                                    }
                                    className="w-full text-black"
                                >
                                    {isLoading ? "생성 중..." : "QR 코드 생성"}
                                </Button>
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-center border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                            {qrCode ? (
                                <>
                                    <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                                        <img src={qrCode} alt="생성된 QR 코드" className="w-48 h-48" />
                                    </div>
                                    <div className="flex space-x-2 w-full">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => downloadQRCode(qrCode, getQRContent())}
                                            className="flex-1"
                                        >
                                            <DownloadIcon size={16} className="mr-2" />
                                            다운로드
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={saveQRCode}
                                            className="flex-1 text-black"
                                        >
                                            <QrCodeIcon size={16} className="mr-2" />
                                            저장
                                        </Button>
                                        {typeof navigator !== 'undefined' && 'share' in navigator && (
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => shareQRCode(qrCode, getQRContent())}
                                                className="flex-1"
                                            >
                                                <ShareIcon size={16} className="mr-2" />
                                                공유
                                            </Button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-center">
                                    <QrCodeIcon size={48} className="text-gray-300 mb-4" />
                                    <p className="text-gray-500">QR 코드가 여기에 표시됩니다</p>
                                    <p className="text-gray-400 text-sm mt-2">양식을 작성하고 생성 버튼을 클릭하세요</p>
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Saved QR Codes */}
            {isMounted && (
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>저장된 QR 코드</CardTitle>
                            <CardDescription>이전에 저장한 QR 코드</CardDescription>
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
                            <div className="text-center py-8 text-gray-500">
                                <QrCodeIcon size={48} className="mx-auto mb-4 text-gray-300" />
                                <p>저장된 QR 코드가 없습니다.</p>
                                <p className="text-sm mt-1">QR 코드를 생성하고 저장하면 여기에 표시됩니다.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {savedQRCodes.map((code) => (
                                    <Card key={code.id} className="overflow-hidden">
                                        <div className="bg-gray-50 dark:bg-gray-900 p-4 flex justify-center">
                                            <img
                                                src={code.imageUrl}
                                                alt={`QR 코드: ${code.text}`}
                                                className="w-32 h-32"
                                                loading="lazy"
                                            />
                                        </div>
                                        <CardContent className="p-4">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium truncate" title={code.text}>
                                                    {code.text}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {new Date(code.createdAt).toLocaleDateString()}
                                                </p>
                                                <p className="text-xs text-gray-400 capitalize">
                                                    유형: {code.type === 'url' ? 'URL' :
                                                    code.type === 'text' ? '텍스트' :
                                                        code.type === 'phone' ? '전화' : 'SMS'}
                                                </p>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-4 pt-0 flex space-x-2">
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

export default QRCreator;