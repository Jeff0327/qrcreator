import Link from "next/link";

export default function QRFooterLinks() {
    // QR 유형 버튼 클릭 핸들러

    return (
        <nav className="grid grid-cols-2 gap-4">
            <div>
                <h3 className="text-lg font-semibold mb-2">고객센터</h3>
                <ul className="space-y-1">
                    <li><Link href="/contact" className="hover:underline">문의하기</Link></li>
                </ul>
            </div>
        </nav>
    );
}