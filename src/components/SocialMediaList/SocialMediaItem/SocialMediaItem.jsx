// Components
// import { Svg } from '@/components';
import Link from 'next/link';

const SocialMediaItem = ({ name, url, target }) => {
    // Please make sure the logo exists in the assets/svg folder with name structure suggested in the code
    const socialMediaName = `logo-${name.toLowerCase()}`;
    url = name === "email" ? `mailto:${url}` : url; // Check if the URL is an email and format it accordingly

    return (
        <div className="social-media-item">
            <Link href={url} target={target || '_blank'} >
                {/* <Svg name={socialMediaName} /> */}
                <img src={socialMediaName} alt={name} />
            </Link>
        </div>
    );
}

export default SocialMediaItem;