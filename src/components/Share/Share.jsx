'use client';
import { Button } from '@/Components';
import { useEffect, useState } from 'react';
import './Share.scss';

export default function Share ({ data, title, buttonLabels, buttonType, email, facebook, whatsapp, x, linkedin, all}) {

    const [url, setUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrl(window.location.href);
        }
    }, []);

    const openPopup = (shareUrl) => {
        const width = 600;
        const height = 400;
        const left = window.screenX + (window.innerWidth - width) / 2;
        const top = window.screenY + (window.innerHeight - height) / 2;

        window.open(
            shareUrl,
            '_blank',
            `width=${width},height=${height},left=${left},top=${top}`
        );

    };

    const sharingArray = [
        {
            render: email,
            icon: '/svg/icon-email.svg',
            url: `mailto:?subject=${title}&body=Share:%20${title}%20${url}`,
            label: null // update if required
        },
        {
            render: facebook,
            icon: '/svg/icon-facebook.svg',
            url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            label: data.facebook_label
        },
        {
            render: whatsapp,
            icon: '/svg/icon-whatsapp.svg',
            url: `https://api.whatsapp.com/send?text=${url}`,
            label: data.whatsapp_label
        },
        {
            render: x,
            icon: '/svg/icon-x.svg',
            url: `https://twitter.com/intent/tweet?url=${url}`,
            label: data.twitter_label
        },
        {
            render: linkedin,
            icon: '/svg/icon-linkedin.svg',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            label: null // update if required
        }
    ];


    return (
        <div className="share">
            <div className="share__inner">
                {title && (<div className="share__inner__title">
                    {data.title}
                </div>)}

                <div className="share__inner__icons">
                    {sharingArray.map((item, index) => {
                        if (!all && !item.render) return null;
                        
                        return <Button
                            type={buttonType}
                            className={item.icon}
                            key={index}
                            label={buttonLabels && item.label}
                            icon={item.icon}
                            iconWidth={20}
                            iconHeight={20}
                            onClick={() => openPopup(item.url)}
                        />;
                    })}
                </div>
            </div>
        </div>
    );
}
