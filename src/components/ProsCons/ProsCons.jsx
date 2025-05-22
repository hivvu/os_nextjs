import { Heading } from '@/components';
import './ProsCons.scss';

export default async function ProsCons({ data, pros, cons }) {
    return (
        <div className="pros-cons">

            <Heading title={data.strings.page_content.pros_cons} html_tag="h2" />

            <div className="pros-cons__grid">
                <div className='pros-cons__grid__pros'>
                    {pros.map((pro, index) => {
                        return (
                            <div key={index} className="pros-cons__grid__items">
                                {/* <Svg name="icon-check-alt" /> {pro.text} */}
                            </div>
                        )
                    })}
                </div>

                <div className='pros-cons__grid__cons'>
                    {cons.map((con, index) => {
                        return (
                            <div key={index} className="pros-cons__grid__items">
                                {/* <Svg name="icon-xmark" /> {con.text} */}
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    );
}
