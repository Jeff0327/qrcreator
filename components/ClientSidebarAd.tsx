'use client'
import dynamic from 'next/dynamic';

const SidebarAd = dynamic(() => import('@/components/SidebarAd'), {
    ssr: false
});

export default function ClientSidebarAd() {
    return <SidebarAd />;
}