import BettingTemplate from '@/Templates/BettingTemplate';
import CalculatorTemplate from '@/Templates/CalculatorTemplate';
import HomepageTemplate from '@/Templates/HomepageTemplate';
import PageTemplate from '@/Templates/PageTemplate';
import PostTemplate from '@/Templates/PostTemplate';
import TermTemplate from '@/Templates/TermTemplate';
import i18nConfig from '@/i18nConfig';
import { wpFetch } from '@/lib/wp-fetch';
import { slugResolver } from '@/utils/slug-resolver';
import { notFound } from 'next/navigation';
import { cache } from 'react';

// Wrap slugResolver in React's cache to memoize results by slug
// This ensures slugResolver is only called once per slug during rendering
const getSlugData = cache(async (locale, slug) => {
  return slugResolver(locale, slug)
})

export async function generateMetadata({ params }) {
  // Destructure locale and slug from params (needs to be awaited)
  const { locale, slug } = await params;

  // Validate locale before proceeding
  if (!i18nConfig.locales.includes(locale)) {
    return;
  }

  // Fetch data for the given slug - don't wrap in try/catch to let notFound() propagate
  const data = await getSlugData(locale, slug);

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
  calculators: CalculatorTemplate,
  page: PageTemplate,
  term: TermTemplate,
  betting: BettingTemplate,
};

export default async function Page({ params }) {
  // Destructure locale and slug from params (needs to be awaited)
  const { locale, slug } = await params;

  // Validate locale before proceeding
  if (!i18nConfig.locales.includes(locale)) {
    return notFound();
  }

  try {
    // Fetch data for the given slug
    const data = await getSlugData(locale, slug);

    const config = await wpFetch(locale, `/os/api/all`, {
      next: { revalidate: 60 },
    });

    // Determine which React component (template) to use based on data.type
    const Template = templatesMap[data.type];

    // If no matching template exists, return a 404 Not Found response
    if (!Template) return notFound();

    // Prepare props to pass into the selected template
    const props = { data, locale, config };

    return <Template {...props} />;
  } catch (error) {
    // Only catch errors that aren't from notFound()
    if (error.message !== 'NEXT_HTTP_ERROR_FALLBACK;404') {
      console.error('Error in Page component:', error);
      return notFound();
    }
    throw error; // Re-throw notFound errors
  }
}