'use client';

// Styles
import './AuthorCard.scss';

// Components
import { SocialMediaList } from '@/components';
import Image from 'next/image';

// Context
// import { useTheme } from '@/context/Theme';


const AuthorCard = ({ data, author }) => {

    //  const { data } = useTheme();

    return (
        <div className="author-card">
            <div className="author-card__top">
                {author.avatar && (
                    <div className="author-card__top__avatar">
                        <Image src={author.avatar.url} alt={author.name} width={100} height={100} />
                    </div>
                )}

                <div className="author-card__top__info">
                    <div className="author-card__top__info--name">
                        <div>{author.name}</div>
                        <span>{data.strings.authors.author}</span>
                    </div>
                    <div className="author-card__top__info--count">+{author.posts_count} {data.strings.articles.articles}</div>
                </div>

                <div className="author-card__top__social">
                    <SocialMediaList socialMedia={author.social_media || null} target="_blank" />
                </div>
            </div>

            {author.description && (<div className="author-card__bottom" dangerouslySetInnerHTML={{ __html: author.description }} />)}
            
            <div className="author-card__social">
                <SocialMediaList socialMedia={author.social_media || null} target="_blank" />
            </div>
        </div>
    );
};

export default AuthorCard;