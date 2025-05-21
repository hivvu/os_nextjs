import NextLink from 'next/link';

export default async function Link({ href, children, ...props }) {

    // Function to transform the URL
    const transformUrl = (url) => {
        // If NEXT_PUBLIC_LOCAL is not true, return URL as is
        if (process.env.NEXT_PUBLIC_LOCAL !== 'true') {
            return url;
        }

        // If it's not a full URL, return as is
        if (!url.startsWith('http')) {
            return url;
        }

        try {
            const urlObj = new URL(url);
            const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || '');

            // If base URLs don't match, replace with NEXT_PUBLIC_SITE_URL
            if (urlObj.origin !== siteUrl.origin) {
                // Keep the pathname, search params, and hash from the original URL
                const newUrl = new URL(urlObj.pathname + urlObj.search + urlObj.hash, siteUrl.origin);
                return newUrl.toString();
            }
        } catch (error) {
            console.error('Error transforming URL:', error);
        }

        // Return original URL if no transformation needed or error occurred
        return url;
    };

    return (
        <NextLink href={transformUrl(href)} {...props}>
            {children}
        </NextLink>
    );
};
