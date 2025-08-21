'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    QrCode,
    BookOpen,
    Palette,
    Image,
    Menu,
    X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();

    // 모바일 감지
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // 모바일에서 메뉴 클릭 시 자동으로 닫기
    const handleMobileMenuClick = () => {
        if (isMobile) {
            setIsMobileMenuOpen(false);
        }
    };

    const menuItems = [
        {
            title: 'QR 코드 생성',
            icon: QrCode,
            href: '/',
            description: '새로운 QR 코드 만들기'
        },
        {
            title: '이미지 QR코드',
            icon: Image,
            href: '/myimg',
            description: '이미지 QR코드 만들기'
        },
        {
            title: '템플릿 갤러리',
            icon: Palette,
            href: '/templates',
            description: '미리 만들어진 템플릿'
        },
        {
            title: '사용 가이드',
            icon: BookOpen,
            href: '/guide',
            description: 'QR 코드 활용법'
        },
    ];

    // 모바일 햄버거 버튼
    if (isMobile) {
        return (
            <>
                {/* 모바일 햄버거 버튼 */}
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="fixed top-4 left-4 z-50 bg-gray-900 text-white hover:bg-gray-800 md:hidden"
                >
                    <Menu className="w-5 h-5" />
                </Button>

                {/* 모바일 오버레이 */}
                {isMobileMenuOpen && (
                    <div className="fixed inset-0 z-50 md:hidden">
                        {/* 배경 오버레이 */}
                        <div
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* 사이드바 */}
                        <div className="relative w-80 max-w-[85vw] h-full bg-gray-900 text-white flex flex-col">
                            {/* 헤더 */}
                            <div className="p-4 border-b border-gray-700">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                            <QrCode className="w-5 h-5" />
                                        </div>
                                        <span className="font-semibold text-lg">QR Make</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-gray-400 hover:text-white hover:bg-gray-800"
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>

                            {/* 새 QR 코드 생성 버튼 */}
                            <div className="p-4">
                                <Button
                                    className="w-full bg-blue-600 hover:bg-blue-700"
                                    asChild
                                    onClick={handleMobileMenuClick}
                                >
                                    <Link href="/">
                                        <Plus className="w-4 h-4 mr-2" />
                                        새 QR 코드
                                    </Link>
                                </Button>
                            </div>

                            {/* 메뉴 항목들 */}
                            <div className="px-4 mb-4 flex-1 overflow-y-auto">
                                <nav className="space-y-2">
                                    {menuItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <Button
                                                key={item.href}
                                                variant="ghost"
                                                className={cn(
                                                    "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800",
                                                    isActive && "bg-gray-800 text-white"
                                                )}
                                                asChild
                                                onClick={handleMobileMenuClick}
                                            >
                                                <Link href={item.href}>
                                                    <item.icon className="w-4 h-4 mr-3" />
                                                    {item.title}
                                                </Link>
                                            </Button>
                                        );
                                    })}
                                </nav>
                            </div>

                            <Separator className="bg-gray-700" />

                            {/* 하단 정보 */}
                            <div className="p-4">
                                <div className="text-xs text-gray-500 text-center">
                                    © 2024 QR Make
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }

    // 데스크톱 사이드바
    return (
        <TooltipProvider>
            <aside className={cn(
                "fixed left-0 top-0 h-full bg-gray-900 text-white flex flex-col transition-all duration-300 ease-in-out z-40 border-r border-gray-700",
                isCollapsed ? "w-16" : "w-64"
            )}>
                {/* 헤더 */}
                <div className="p-4 border-b border-gray-700 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        {!isCollapsed && (
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <QrCode className="w-5 h-5" />
                                </div>
                                <span className="font-semibold text-lg">QR Make</span>
                            </div>
                        )}

                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="text-gray-400 hover:text-white hover:bg-gray-800"
                        >
                            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                        </Button>
                    </div>
                </div>

                {/* 스크롤 가능한 메인 영역 */}
                <div className="flex-1 overflow-y-auto">
                    {/* 새 QR 코드 생성 버튼 */}
                    <div className="p-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    className={cn(
                                        "w-full bg-blue-600 hover:bg-blue-700",
                                        isCollapsed && "px-0"
                                    )}
                                    asChild
                                >
                                    <Link href="/">
                                        <Plus className="w-4 h-4" />
                                        {!isCollapsed && <span className="ml-2">새 QR 코드</span>}
                                    </Link>
                                </Button>
                            </TooltipTrigger>
                            {isCollapsed && (
                                <TooltipContent side="right">
                                    <p>새 QR 코드 생성</p>
                                </TooltipContent>
                            )}
                        </Tooltip>
                    </div>

                    {/* 메뉴 항목들 */}
                    <div className="px-4 mb-4">
                        <nav className="space-y-2">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Tooltip key={item.href}>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className={cn(
                                                    "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800",
                                                    isActive && "bg-gray-800 text-white",
                                                    isCollapsed && "px-0 justify-center"
                                                )}
                                                asChild
                                            >
                                                <Link href={item.href}>
                                                    <item.icon className="w-4 h-4" />
                                                    {!isCollapsed && <span className="ml-3">{item.title}</span>}
                                                </Link>
                                            </Button>
                                        </TooltipTrigger>
                                        {isCollapsed && (
                                            <TooltipContent side="right">
                                                <p>{item.title}</p>
                                                <p className="text-xs text-gray-400">{item.description}</p>
                                            </TooltipContent>
                                        )}
                                    </Tooltip>
                                );
                            })}
                        </nav>
                    </div>

                    <Separator className="bg-gray-700" />
                </div>

                {/* 하단 고정 영역 */}
                <div className="border-t border-gray-700 p-4 flex-shrink-0">
                    {!isCollapsed && (
                        <div className="text-xs text-gray-500 text-center">
                            © 2025 QR Make
                        </div>
                    )}
                </div>
            </aside>
        </TooltipProvider>
    );
}