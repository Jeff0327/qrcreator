import React, { ReactNode } from 'react';
import Link from "next/link";

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* 헤더 영역 */}
            <header className="bg-yellow-400 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href={'/'}><h1 className="text-xl font-bold">QR Creator</h1></Link>
                </div>
            </header>

            {/* 메인 콘텐츠 영역 */}
                {children}
            {/* 푸터 영역 */}
            <footer className="bg-gray-100 text-gray-600 p-4 mt-8">
                <div className="container mx-auto text-center">
                    <p>© {new Date().getFullYear()} QR Creator. 모든 권리 보유.</p>
                </div>
            </footer>
        </div>
    );
}

export default Layout;