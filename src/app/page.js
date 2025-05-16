import HomepageTemplate from '@/components/templates/HomepageTemplate';
import { wpFetch } from '@/lib/wp-fetch';

export default async function Home({ params }) {
    const slugPath = '/';

    const data = await wpFetch('uk', `/os/api/v2/slug-resolver?slug=${process.env.CMS_URL}${slugPath}`, {
        next: { revalidate: 60 },
    });

    if (!data.type === "homepage")
        return notFound();

    return <HomepageTemplate data={data} />;
}