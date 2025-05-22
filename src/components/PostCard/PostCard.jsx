// import { Date } from '@/components';
import { shortcodes } from '@/utils';
import Image from 'next/image';
// import Link from 'next/link';
import Link from '@/utils/link';
import './PostCard.scss';

export default async function PostCard({ item: post }) {
    post.title = shortcodes.process(post.title); // Process the title with shortcodes

    return (
        <div className="post-card" key={post.id}>
            <Link className='post-card__area-link' href={post.url} />

            {post.thumbnail && (
                <div className="post-card__thumbnail">
                    <div className="post-card__thumbnail__inside">
                        <Image 
                        src={post.thumbnail.url} 
                        alt={post.thumbnail.alt ? post.thumbnail.alt : post.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                        // width={post.thumbnail.width} 
                        // height={post.thumbnail.height} 
                        // quality={90}
                        // className='object-cover object-top'
                        />
                    </div>
                </div>
            )}

            <div className="post-card__info">
                <div className="post-card__info__top">
                    <Link href={post.url}>
                        <h6 dangerouslySetInnerHTML={{ __html: post.title }} />
                    </Link>
                    {/* <h6 dangerouslySetInnerHTML={{ __html: utils.ellipsis(post.title, 70) }} /> */}
                </div>

                <div className="post-card__info__bottom">
                    <div className="post-card__info__bottom--author">
                        <Link href={post.collaborators.author.url} dangerouslySetInnerHTML={{ __html: post.collaborators.author.name }} />
                    </div>

                    <div className="post-card__info__bottom--divider">&#x2022;</div>

                    <div className="post-card__info__bottom--date">
                        {/* <Date date={post.dates.published_date} timeAgo format="DD/MM/YYYY" /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
