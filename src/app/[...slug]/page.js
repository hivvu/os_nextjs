
import { slugResolver } from '@/utils/slug-resolver';
import { cache } from 'react'
import PostTemplate from '@/components/Templates/PostTemplate';
import CalculatorTemplate from '@/components/Templates/CalculatorTemplate';
import PageTemplate from '@/components/Templates/PageTemplate';
import BettingTemplate from '@/components/Templates/BettingTemplate';
import TermTemplate from '@/components/Templates/TermTemplate';
import HomepageTemplate from '@/components/Templates/HomepageTemplate';

// Wrap slugResolver in React’s cache to memoize results by slug
// This ensures slugResolver is only called once per slug during rendering
const getSlugData = cache(async slug => {
  return slugResolver(slug)
})

export async function generateMetadata({ params }) {
    // Destructure slug from the incoming params
    const { slug } = await params;
    // Fetch data for the given slug (e.g., from an API or database)
    const data = await getSlugData(slug);

    // TOFIX: Use real data
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
          shortcut: "/favicon/web-app-manifest-512x512.png",
        },
        keywords: "keywords 1, keywords 2, keywords 3",
    };
}

const templatesMap = {
  homepage: HomepageTemplate,
  post: PostTemplate,
  calculators:CalculatorTemplate,
  page: PageTemplate,
  term: TermTemplate,
  betting: BettingTemplate,
};

export default async function Page({ params }) {
    // Destructure slug from the incoming params
    const { slug } = await params;
    // Fetch data for the given slug (e.g., from an API or database)
    const data = await getSlugData(slug);

    // Determine which React component (template) to use based on data.type
    // templatesMap is a lookup table mapping types to components
    const Template = templatesMap[data.type];

    // If no matching template exists, return a 404 Not Found response
    if (!Template) return notFound();

    // Prepare props to pass into the selected template
    // Include both the fetched data and the locale for rendering
    const props = { data, locale: data.locale };

    return <Template {...props} />;
}