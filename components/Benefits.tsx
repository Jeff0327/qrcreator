// components/Benefits.tsx
import React from 'react';

const Benefits = () => {
    return (
        <section id="benefits" className="my-12 py-8 border-t border-b border-gray-200">
            <h2 className="text-2xl font-bold mb-6">Why Use Our Free QR Code Generator?</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">100% Free</h3>
                    <p>Create unlimited QR codes without any hidden fees or premium features. No registration or account required.</p>
                </div>

                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
                    <p>Simply enter your URL or text, generate your QR code, and download it instantly. No technical skills needed.</p>
                </div>

                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">High Quality</h3>
                    <p>All QR codes are generated in high resolution, ensuring they scan properly even when printed.</p>
                </div>

                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Multiple Uses</h3>
                    <p>Create QR codes for websites, business cards, menus, promotions, events, and more.</p>
                </div>

                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Instant Download</h3>
                    <p>Download your QR codes immediately as PNG images that can be used in digital or print materials.</p>
                </div>

                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Works Everywhere</h3>
                    <p>Our QR codes are compatible with all modern smartphones and QR code scanners.</p>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">QR Codes for Every Need</h3>
                <p className="mb-4">
                    QR codes have become an essential tool for businesses and individuals alike. They provide a seamless
                    bridge between the physical and digital worlds, allowing instant access to information with just a
                    smartphone camera.
                </p>
                <p>
                    Whether you need to share your website, contact information, Wi-Fi credentials, or create a digital
                    menu for your restaurant, our free QR code generator has you covered. Simply input your information,
                    generate your custom QR code, and download it instantly.
                </p>
            </div>
        </section>
    );
};

export default Benefits;