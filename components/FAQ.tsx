import React from 'react';

const FAQ = () => {
    return (
        <section id="faq" className="my-12">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

            <div className="space-y-6">
                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">What is a QR code?</h3>
                    <p>
                        A QR (Quick Response) code is a type of matrix barcode that can be scanned using a smartphone
                        camera to quickly access information. Unlike traditional barcodes, QR codes can store various
                        types of data including URLs, text, contact information, and more.
                    </p>
                </div>

                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">How do I use a QR code?</h3>
                    <p>
                        To use a QR code, simply open your smartphone camera and point it at the QR code. Most modern
                        smartphones will automatically detect the QR code and show a notification. Tap on this notification
                        to access the content. If your camera doesn't automatically scan QR codes, you may need to download
                        a QR code scanner app.
                    </p>
                </div>

                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Is your QR code generator really free?</h3>
                    <p>
                        Yes! Our QR code generator is 100% free to use with no hidden costs or premium features. You can
                        create unlimited QR codes without having to create an account or provide payment information.
                    </p>
                </div>

                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">What types of QR codes can I create?</h3>
                    <p>
                        With our generator, you can create QR codes for URLs, plain text, contact information (vCard),
                        email addresses, phone numbers, SMS messages, and more. Simply enter the information you want
                        to encode, and our generator will create the appropriate QR code format.
                    </p>
                </div>

                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">How long do the QR codes work?</h3>
                    <p>
                        The QR codes you generate are static and will work indefinitely. Since they're downloaded directly
                        to your device and don't rely on our servers, they'll continue to function as long as the information
                        they link to (like a website) remains valid.
                    </p>
                </div>

                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">Can I customize my QR code?</h3>
                    <p>
                        Our current free generator creates standard black and white QR codes. These standard QR codes
                        offer the best compatibility and scanning reliability across all devices and scanning conditions.
                    </p>
                </div>

                <div className="p-4 border rounded-lg bg-card-bg shadow-sm">
                    <h3 className="text-xl font-semibold mb-2">What's the best size for printing QR codes?</h3>
                    <p>
                        For reliable scanning, we recommend printing QR codes at least 2 x 2 cm (0.8 x 0.8 inches) in size.
                        If the QR code will be scanned from a distance, make it larger. Always test your printed QR code
                        to ensure it scans properly before mass distribution.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FAQ;