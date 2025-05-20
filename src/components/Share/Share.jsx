'use client';

// React
import { useEffect, useState } from 'react';

// Styles
import './Share.scss';

// Components
import { Button } from '@/components';

// Context
// import { useTheme } from '@/context/Theme';


export default function Share ({ data, title, buttonLabels, buttonType, email, facebook, whatsapp, x, linkedin, all}) {

    // const { data } = useTheme();
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
            icon: 'icon-email',
            url: `mailto:?subject=${title}&body=Share:%20${title}%20${url}`,
            label: null // update if required
        },
        {
            render: facebook,
            icon: 'icon-facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            label: data.facebook_label
        },
        {
            render: whatsapp,
            icon: 'icon-whatsapp',
            url: `https://api.whatsapp.com/send?text=${url}`,
            label: data.whatsapp_label
        },
        {
            render: x,
            icon: 'icon-x',
            url: `https://twitter.com/intent/tweet?url=${url}`,
            label: data.twitter_label
        },
        {
            render: linkedin,
            icon: 'icon-linkedin',
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
                            onClick={() => openPopup(item.url)}
                        />;
                    })}
                </div>
            </div>
        </div>
    );
}
