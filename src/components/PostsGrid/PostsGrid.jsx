import { HeadingIcon } from '@/components';
import './PostsGrid.scss';
// import PostsGridHeading from './Heading/PostsGridHeading';

// Utils
import classNames from 'classnames';

export default async function PostsGrid({ PostCard, items, icon, config, cols, noScroll }) {
    // Check if PostGrid has items and if items is an array with at least one item
    if(!items || !Array.isArray(items) || items.length === 0) return null;

    const gridColsClass = classNames({
        'posts-grid__container__list--cols-1': cols === 1,
        'posts-grid__container__list--cols-2': cols === 2,
        'posts-grid__container__list--cols-3': cols === 3,
        'posts-grid__container__list--cols-4': cols === 4 || !cols,
        'posts-grid__container__list--mobile': items.length > 4 || noScroll,
    });

    return (
        <section className="posts-grid">
            <div className="posts-grid__container">

                {config.sections.related_content.betting_tips.title && 
                <HeadingIcon 
                    iconWidth={20} 
                    iconHeight={20} 
                    label={config?.strings?.general?.see_all} 
                    icon={icon} 
                    title={config?.strings?.articles?.articles} 
                    btnUrl={config?.sections?.related_content?.articles?.see_all_url}
                 />
                }

                <div className={`posts-grid__container__list ${gridColsClass}`}>
                    {items.map(item => <PostCard key={item.id} item={item} strings={config.strings} />)}
                </div>
            </div>
        </section>
    );
}
