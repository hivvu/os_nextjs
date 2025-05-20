import React from 'react';

// Styles
import './Heading.scss';

// Utils
import { shortcodes, utils } from '@/utils';

const Heading = React.forwardRef(({ html_tag = "h2", title }, ref) => {
    if (title === "") return null; // Avoid rendering empty headings

    title = shortcodes.process(title);
    
    return React.createElement(html_tag, {
        id: utils.slugify(title),
        ref,
        dangerouslySetInnerHTML: { __html: title }
    });
});

Heading.displayName = 'Heading';

export default Heading;