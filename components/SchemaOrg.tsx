import Script from 'next/script'

const SchemaOrg = () => {
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Free QR Code Generator",
        "description": "Create and download unlimited QR codes for free. No sign-up required. Generate QR codes for websites, text, vCards, and more in seconds.",
        "url": "https://yourwebsite.com",
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "screenshot": "https://yourwebsite.com/screenshot.jpg",
        "featureList": "Generate QR codes, Download QR codes, No registration required, Free to use",
        "review": {
            "@type": "Review",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "4.8",
                "bestRating": "5"
            },
            "author": {
                "@type": "Person",
                "name": "QR Code User"
            }
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1024",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    return (
        <Script
            id="schema-org"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
    );
};

export default SchemaOrg;