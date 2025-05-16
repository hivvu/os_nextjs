
import PostTemplate from '@/components/templates/PostTemplate';
import CalculatorTemplate from '@/components/templates/CalculatorTemplate';
import PageTemplate from '@/components/templates/PageTemplate';
import BettingTemplate from '@/components/templates/BettingTemplate';
import TermTemplate from '@/components/templates/TermTemplate';
import HomepageTemplate from '@/components/templates/HomepageTemplate';
import { wpFetch } from '@/lib/wp-fetch';


export default async function Page({ params }) {
    const { slug } = await params;
    const slugPath = '/' + slug.join('/');


    // Detect locale
    let locale = 'uk';
    let slugSegments = [...slug];

    const SUPPORTED_LOCALES = ['br', 'fr', 'es', 'it', 'us'];
    if (slugSegments.length > 0 && SUPPORTED_LOCALES.includes(slugSegments[0])) {
        locale = slugSegments[0];
    }


    /**
     LINKS PARA TESTAR

    Categoria: http://localhost:3000/articles
    Page: http://localhost:3000/about || http://localhost:3000/contact
    Calculators: http://localhost:3000/calculators/accumulator-calculator
    Post: http://localhost:3000/articles/samba-gold-2024-conheca-os-indicados-das-categorias-masculina-feminina-e-sub-20
    Betting: 


    Categoria: http://localhost:3000/br/artigos
    Page: http://localhost:3000/about || http://localhost:3000/br/contato
    Calculators: http://localhost:3000/calculators/accumulator-calculator
    Post: http://localhost:3000/articles/samba-gold-2024-conheca-os-indicados-das-categorias-masculina-feminina-e-sub-20
    Betting: 

    404: http://localhost:3000/articles/nao-existe
    */

    const data = await wpFetch(locale, `/os/api/v2/slug-resolver?slug=${process.env.CMS_URL}${slugPath}`, {
        next: { revalidate: 60 },
    });

    switch (data.type) {
        case "homepage":
            console.log('Homepage');
            return <HomepageTemplate data={data} />;
        case "post":
            return <PostTemplate data={data} />;
        case "calculators":
            return <CalculatorTemplate data={data} />;
        case "page":
            return <PageTemplate data={data} />;
        case "term":
            console.log('term');
            return <TermTemplate data={data} />;
        case "betting":
            return <BettingTemplate data={data} />;
        default:
            notFound(); // -OR- return <PageTemplate data={data} />;
    }

}
