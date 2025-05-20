import { Accordion, AuthorCard, Heading, ProsCons, Share } from '@/components';
import './Content.scss';
import Toc from './Toc/Toc';

export default async function Content ({ data, config, author, pros_cons }) {
    console.log('content here', data.content);
    const content = data?.content?.content;
    const faq = data?.content?.faq;
    const share = config?.strings?.share;
    // Check if any content is provided. If not return null.
    const hasAnyContent = content?.length > 0 || faq?.items?.length > 0 || pros_cons || share || author; 
    if (!hasAnyContent) return null;

    return (
        <section className="content">
            <div className="content__inner">
                <div className="content__inner__content">
                    {pros_cons && (
                        <div className="content__inner__content__pros-cons">
                            <ProsCons {...pros_cons} />
                        </div>
                    )}

                    {content?.length > 0 && (
                        <div className="content__inner__content__text">
                            {content.map((item, index) => (
                                <div key={index} className="content__inner__content__text__item">
                                    {item?.heading?.title && <Heading {...item.heading} />}

                                    {Array.isArray(item.text) ? (
                                        // Render JSX directly
                                        <>{item.text}</>
                                    ) : (
                                        // If it's a string, use dangerouslySetInnerHTML
                                        <div dangerouslySetInnerHTML={{ __html: item.text }} />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {faq?.items?.length > 0 && (
                        <div className="content__inner__content__faq">
                            <Heading {...faq.heading} />
                            <div className="content__inner__content__faq--subtitle" dangerouslySetInnerHTML={{ __html: faq.heading.subtitle }} />
                            <Accordion items={faq.items} />
                        </div>
                    )}

                    {share && (
                        <div className="content__inner__content__share">
                            <Share data={share} buttonType="sharing-content" title buttonLabels whatsapp facebook x />
                        </div>
                    )}

                    {author && (
                        <div className="content__inner__content__author">
                            <AuthorCard author={author} />
                        </div>
                    )}
                </div>

                <div className="content__inner__sidebar">
                    <Toc content={content} />
                </div>
            </div>
        </section>
    );
};
