import HomepageTemplate from '@/Templates/HomepageTemplate';
import { wpFetch } from '@/lib/wp-fetch';
import { notFound } from 'next/navigation';

export default async function Home({ params }) {
    const { locale } = await params;
    // Define the path for the homepage slug
    const slugPath = '/';

    // Fetch CMS data for the homepage
    const data = await wpFetch(locale, `/os/api/v2/slug-resolver?slug=${process.env.CMS_URL}${slugPath}`, {
        next: { revalidate: 60 },
    });

    const config = await wpFetch(locale, `/os/api/all`, {
        next: { revalidate: 60 },
    });

    // Verify that the fetched data corresponds to a homepage
    if (data.type !== "homepage")
        return notFound();

    return <HomepageTemplate data={data} config={config} locale={locale} />;
}