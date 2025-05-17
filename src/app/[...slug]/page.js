
import { slugResolver } from '@/utils/slug-resolver';
import PostTemplate from '@/components/templates/PostTemplate';
import CalculatorTemplate from '@/components/templates/CalculatorTemplate';
import PageTemplate from '@/components/templates/PageTemplate';
import BettingTemplate from '@/components/templates/BettingTemplate';
import TermTemplate from '@/components/templates/TermTemplate';
import HomepageTemplate from '@/components/templates/HomepageTemplate';

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const data = await slugResolver(slug);
  
    return {
        title: data.seo?.title || data.title || 'Odds Scanner',
        description: data.seo?.meta_description || 'Best site eva!',
        openGraph: {
            title: data.seo?.meta_title,
            description: data.seo?.meta_description,
            url: data.slug,
            siteName: 'Odds Scanner',
        },
        robots: {
            index: data.seo?.meta_no_index,
            follow: true,
            googleBot: {
                index: true,
                follow: true, 
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
        icons: {
          shortcut: "/web-app-manifest-512x512.png",
        },
        keywords: "keywords",
    };
}

export default async function Page({ params }) {
    const { slug } = await params;
    const data = await slugResolver(slug);
    const { locale } = data;

    switch (data.type) {
        case "homepage":
            return <HomepageTemplate data={data} />;

        case "post":
            return <PostTemplate data={data} locale={locale} />;

        case "calculators":
            return <CalculatorTemplate data={data} />;

        case "page":
            return <PageTemplate data={data} />;

        case "term":
            return <TermTemplate data={data} />;

        case "betting":
            return <BettingTemplate data={data} />;
            
        default:
            notFound(); 
    }
}