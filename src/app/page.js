import HomepageTemplate from '@/components/Templates/HomepageTemplate';
import { wpFetch } from '@/lib/wp-fetch';

export default async function Home({ params }) {
    // Define the path for the homepage slug
    const slugPath = '/';

    // Fetch CMS data for the homepage
    const data = await wpFetch('uk', `/os/api/v2/slug-resolver?slug=${process.env.CMS_URL}${slugPath}`, {
        next: { revalidate: 60 },
    });

    // Verify that the fetched data corresponds to a homepage
    if (data.type !== "homepage") 
        return notFound(); 
    
    return <HomepageTemplate data={data} />;
}