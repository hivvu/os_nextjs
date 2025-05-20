'use client';
import { useState } from 'react';

// Components
// import { Svg } from '@/components';

// Styles
import './Accordion.scss';

// Utils
import classNames from 'classnames';

export default function Accordion ({ items }) {

    const [activeIndex, setActiveIndex] = useState(null);

    return (
        <div className="accordion">
            <div className='accordion__items'>
                {items.length > 0 && items.map((item, index) => {

                    const itemClass = classNames({
                        'accordion__items__item': true,
                        'accordion__items__item--active': activeIndex === index,
                    });

                    return (
                        <div key={'item-' + index} className={itemClass}>
                            <button onClick={() => setActiveIndex(activeIndex === index ? null : index)} className="accordion__items__item__title">
                                <span dangerouslySetInnerHTML={{ __html: item.question }} />
                                {/* <div className="accordion__items__item__title--icon"><Svg name={activeIndex !== index ? 'icon-chevron-down' : 'icon-chevron-up'} /></div> */}
                            </button>
                            <div className='accordion__items__item__text' dangerouslySetInnerHTML={{ __html: item.answer }} />
                        </div>
                    );

                })}
            </div>
        </div>
    );
}
