// export default function Footer({ data }) {
//     return (
//       <footer className="p-4 bg-gray-800 text-white">
//         <div className="max-w-6xl mx-auto">
//           <p>{data?.text || "footer"}</p>
//         </div>
//       </footer>
//     );
//   }

'use client';

import { useEffect, Suspense } from 'react';

// Context
// import { useTheme } from '@/context/Theme';

// Components
// import Menu from '../Menu/Menu';
// import Social from './Social/Social';
// import LatestCol from './LatestCol/LatestCol';
// import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
// import LanguageSwitcher from './LanguageSwitcher/LanguageSwitcher';
// import LegalLogos from './LegalLogos/LegalLogos';
// import MobileNav from './MobileNav/MobileNav';
// import { Svg, Logo, LoadAdTechScript, PasswordResetHandler } from '@/components';

// Styles
// import './footer.scss';

// Utils
// import { useInView } from 'react-intersection-observer';
// import toast, { Toaster } from "react-hot-toast";
// import { user, api, shortcodes } from '@/utils';
// import Cookies from 'js-cookie';

// for testing
// import axios from '@/utils';
import Cookies from 'js-cookie';


const Footer = ({ data }) => {

    // const { data, updateData } = useTheme();

    // Scroll to top function
    const scrollToTop = () => {
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    // Use Intersection Observer to trigger an event when the advertiser card is not in view
    // const { ref, inView } = useInView({
    //     threshold: 0,
    //     onChange: (inView) => {
    //         updateData('advertiserFloatingCardFooter', !inView);
    //         updateData('oddFloatingCardFooter', !inView);
    //         updateData('eventHeroFooter', !inView);
    //     }
    // });


    // Validate token if exist, each 20 min
    // useEffect(() => {
    //     if (!user.isLoggedIn()) return;

    //     const intervalId = setInterval(() => {
    //         console.log("Checking token validation...");
    //         user.checkTokenValidation();
    //     }, 1200000); // 20 minutes

    //     // Initial check
    //     user.checkTokenValidation();

    //     return () => {
    //         clearInterval(intervalId);
    //     };
    // }, []);


    // Get user data if token exist
    // useEffect(() => {
    //     if (user.isLoggedIn()) {
    //         updateData('user', { loading: true });
    //         (async () => {
    //             try {
    //                 const userData = await api.user.gerUser();
    //                 updateData('user', { ...userData, loading: false });
    //             } catch (error) {
    //                 Cookies.remove('os-user', { path: '' });
    //             }
    //         })();
    //     }
    // }, []);
 

    return (
        <>
            <footer className="main-footer" /*ref={ref}*/>
                <hr className="my-5" />
                <div className="main-footer__container">
                    {/* {data.pageData && ( */}
                        <div className="main-footer__container__breadcrumbs">
                            {/* <Breadcrumbs paths={data.pageData.breadcrumb} /> */}
                            Breadcrumb
                        </div>
                    {/* )} */}

                    <div className="main-footer__container__top">
                        <div className="main-footer__container__top__left">
                            <div className="main-footer__container__top__left__logo">
                                {/* <Logo /> */}
                                Logo
                            </div>
                            {/* <div className="main-footer__container__top__left__description" dangerouslySetInnerHTML={{ __html: data.sections.footer.labels.description || '' }} /> */}
                            description
                        </div>

                        <div className="main-footer__container__top__right">
                            {/* <LegalLogos /> */}
                            Legal logos
                        </div>
                    </div>

                    <div className="main-footer__container__navigation">
                        {/* <LanguageSwitcher /> */}
                        lang switcher

                        {/* {data.menus?.footer?.main?.menu_items?.length > 0 && (
                            <Menu items={data.menus.footer.main.menu_items} />
                        )} */}
                        menu
                    </div>

                    <div className="main-footer__container__latest">
                        {/* {data.menus.footer.betting_tips?.menu_items?.length > 0 && <LatestCol title={data.menus.footer.betting_tips.menu_name} items={data.menus.footer.betting_tips?.menu_items} />}
                        {data.menus.footer.latest_posts?.menu_items?.length > 0 && <LatestCol title={data.menus.footer.latest_posts.menu_name} items={data.menus.footer.latest_posts?.menu_items} />}
                        {data.menus.footer.betting_sites?.menu_items?.length > 0 && <LatestCol title={data.menus.footer.betting_sites.menu_name} items={data.menus.footer.betting_sites?.menu_items} menuType="betting" />} */}

                        Latest posts
                    </div>

                    {/* <div className="main-footer__container__disclaimer" dangerouslySetInnerHTML={{ __html: data.sections.footer.labels.legal_disclaimer || '' }} /> */}
                    legal disclaimer

                    <div className="main-footer__container__bottom">
                        <div className="main-footer__container__bottom__copy">
                            <div className="main-footer__container__bottom__copy--site-name">
                              {/* {shortcodes.process(data.sections.footer.labels.copyright.site_name)} */}
                              {data.sitename}
                            </div>
                            <div className="main-footer__container__bottom__copy--note" >
                              {/* {data.sections.footer.labels.copyright.note} */}
                              {data.copyright}
                            </div>
                        </div>

                        <div className="main-footer__container__bottom__social">
                            {/* <Social /> */}
                            Social
                        </div>

                        <div className="main-footer__container__bottom__go-top">
                            <button onClick={scrollToTop}>
                              {/* {data.sections?.footer?.labels?.back_to_top} */}
                              {/* <Svg name="icon-chevron-up" /> */}
                              back to top
                            </button>
                        </div>
                    </div>
                </div>

                {/* <MobileNav /> */}
            </footer>

            {/* <LoadAdTechScript /> */}

            {/* <Suspense>
                <PasswordResetHandler />
            </Suspense> */}

            {/* <Toaster /> */}
        </>
    );
}

export default Footer;