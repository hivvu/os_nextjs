// Styles
import './SocialMediaList.scss';

// Components
import SocialMediaItem from './SocialMediaItem/SocialMediaItem';

const SocialMediaList = ({ socialMedia, target }) => {
    if (!socialMedia) return null;

    return (
        <>
            {Object.entries(socialMedia).map(([key, social]) => (
                social && <SocialMediaItem key={key} name={key} url={social} target={target || '_blank'} />
            ))}
        </>
    );
}

export default SocialMediaList;