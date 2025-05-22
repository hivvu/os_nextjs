import { Button, Heading } from '@/Components';
import Img from 'next/image';
import './HeadingIcon.scss';

export default async function HeadingIcon({ title, icon, tag = "h3", btnUrl, label, iconWidth, iconHeight }) {

    return (
        <div className="heading-icon">
            <div className="heading-icon--title">
                {icon && <span><Img src={icon} alt={title} width={iconWidth} height={iconHeight} /></span>}
                <Heading title={title} html_tag={tag} />
            </div>
            {btnUrl && <div className="heading-icon--action">
                <Button type="line" label={label} href={btnUrl} />
            </div>}
        </div>
    );

};

