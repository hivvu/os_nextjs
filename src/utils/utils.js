
import Image from 'next/image';
// import { Svg } from '@/components';
// import toast, { Toaster } from 'react-hot-toast';
// import moment from 'moment-timezone';
// import 'moment/locale/pt';
// import 'moment/locale/it';
// import 'moment/locale/es';
// import 'moment/locale/fr';

export const utils = {

    passwordRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,

    notify: (title, message, type) => {
        const toastArgs = {
            position: "bottom-left",
            duration: 3000,
        };

        const getContent = (t) => (
            <div class="os-toast__content">
                <div class="os-toast__content__text">
                    <h5>{title}</h5>
                    <p>{message}</p>
                </div>
                <div class="os-toast__content__btn">
                    <button onClick={() => toast.dismiss(t.id)} >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L9 9M9 1L1 9" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    </button>
                </div>
            </div>
        );

        const toastOptions = {
            ...toastArgs,
            className: `os-toast ${type || 'default'}`,
        };

        switch (type) {
            case "error":
                toast.error((t) => getContent(t), {
                    ...toastOptions,
                    icon: <div className="os-toast__icon"><Svg name="icon-close-alt" /></div>
                });
                break;
            case "success":
                toast.success((t) => getContent(t), {
                    ...toastOptions,
                    icon: <div className="os-toast__icon"><Svg name="icon-check" /></div>
                });
                break;
            default:
                toast((t) => getContent(t), {
                    ...toastOptions,
                    icon: <div className="os-toast__icon"><Svg name="icon-info-alt" /></div>
                });
        }

        return true;
    },

    clearNotifications: () => {
        toast.dismiss();
    },

    // Convert snake_case to camelCase on object keys
    objToCamelCase: (block) => {
        let remapped = {};
        Object.keys(block).map(key => {
            const PascalCase = key.split('_').map(el => el.charAt(0).toUpperCase() + el.slice(1)).join('');
            const camelCase = PascalCase.charAt(0).toLowerCase() + PascalCase.slice(1);
            remapped[camelCase] = block[key]
        });
        return remapped;
    },

    // Convert date to human readable format
    convertDate: (dateString, format) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const monthName = date.toLocaleString('default', { month: 'long' });

        if (format === 'dd/mm/yyyy') {
            return `${day}/${month}/${year}`;
        } else {
            return `${monthName} ${day}, ${year}`;
        }
    },

    // Ellipsis
    ellipsis: (text, length) => {
        return text.length > length ? text.substring(0, length) + '...' : text;
    },

    // Slug to text
    slugToText: (slug) => {
        return slug
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    },

    // Slugify
    slugify: (text) => {
        if (!text) {
            return '';
        }
        return text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    },

    // Search key value in array
    searchKeyValue: (arr, key, value) => {
        return arr.find(item => item[key] === value);
    },

    // Get advertiser link
    getAdvertiserLink: (advertiser, placement = 'all') => {
        // This function should not be used as this logic is suppose to be handled by the endpoint
        // Check and delete this function whenn it's not needed anymore


        // 1st - return advertiser donation link with correct placement
        if (advertiser?.donation_links[placement]?.url) return advertiser.donation_links[placement].url;

        // 2nd - return advertiser donation link with placement 'all'
        if (advertiser?.donation_links?.all?.url) return advertiser.donation_links.all.url;

        // 3rd - return advertiser donation link with placement 'default'
        return advertiser.website;
    },

    // Replace URL
    replaceUrl: (data) => {
        // Check if we are in the production build phase
        if (process.env.NEXT_PHASE === 'phase-production-build') {

            // Convert data to string if it's an object
            let dataString;

            if (typeof data === 'object') {
                dataString = JSON.stringify(data);
            } else if (typeof data === 'string') {
                dataString = data;
            } else {
                // If data is neither object nor string, return it as is
                return data;
            }

            // Search and replace the domain
            const searchTerm = '.xyz';
            const replaceTerm = '.com';
            dataString = dataString.replace(new RegExp(searchTerm, 'g'), replaceTerm);

            // If it was an object, parse it back to JSON
            if (typeof data === 'object') {
                data = JSON.parse(dataString);
            } else {
                // If it was a string, return the modified string
                data = dataString;
            }
        }

        return data;
    },

    getPathFromUrl: (url) => {
        try {
            const parsedUrl = new URL(url);
            return parsedUrl.pathname;
        } catch (error) {
            console.error("Invalid URL:", error);
            return "/";
        }
    },

    getUrlLocale: (path, ssr = false) => {
        // If SSR and path is not valid, return empty
        if (ssr && (!path || (Array.isArray(path) && path.length === 0))) return '';

        // Fallback to window.location if on client
        if (!ssr && typeof window !== 'undefined' && (!path || typeof path !== 'string')) {
            path = window.location.pathname;
        }

        // Normalize path to array
        let pathParts = [];
        if (typeof path === 'string') {
            pathParts = path.split('/').filter(Boolean);
        } else if (Array.isArray(path)) {
            pathParts = path.filter(Boolean);
        }

        const locale = pathParts[0];

        if (locale && locale.length === 2) {
            return locale;
        }

        return '';
    },

    getHomeUrl: (url) => {
        try {
            const parsedUrl = new URL(url);
            const path = parsedUrl.pathname;
            const locale = utils.getUrlLocale(path);

            if (!locale) return parsedUrl.origin;
            else return `${parsedUrl.origin}/${locale}`;
        } catch (error) {
            console.error("Invalid Home URL:", error);
            return '/';
        }
    },

    themeInitialData: (themeOptions, accountOptions, sections, menus, templates, networkData, advertisers, languages, timezones, strings, sports) => ({
        pageData: null,
        options: themeOptions,
        network: networkData,
        account: accountOptions,
        sections,
        templates,
        timezones,
        languages,
        advertisers,
        strings,
        sports,
        advertiserFloatingCardHeader: false,
        advertiserFloatingCardFooter: false,
        oddFloatingCardHeader: false,
        oddFloatingCardFooter: false,
        eventHeroHeader: false,
        eventHeroFooter: false,
        menus: menus ? {
            footer: {
                main: menus.footerMenu,
                betting_sites: advertisers && {
                    menu_name: sections?.footer.labels.columns.betting_sites_label,
                    menu_items: advertisers.slice(0, 5).map((advertiser) => ({
                        title: advertiser.name,
                        url: advertiser.review_url || utils.getAdvertiserLink(advertiser),
                        icon: (
                            <div
                                style={{
                                    backgroundColor: advertiser.assets?.colors.primary_color,
                                }}
                            >
                                <Image
                                    src={advertiser.assets?.logo.sportsbook_app}
                                    width={20}
                                    height={20}
                                    alt={advertiser.name}
                                />
                            </div>
                        ),
                    })),
                },
                betting_tips: menus.bettingTips && {
                    menu_name: sections.footer.labels.columns.betting_tips_label,
                    menu_items: menus.bettingTips.map((bettingTip) => ({
                        title: bettingTip.title,
                        url: bettingTip.url,
                    })),
                },
                latest_posts: menus.latestPosts && {
                    menu_name: sections.footer.labels.columns.latest_content_label,
                    menu_items: menus.latestPosts.map((post) => ({
                        title: post.title,
                        url: post.url,
                    })),
                },
                mobile: menus.footerMobileMenu,
                secondary_mobile: menus.footerSecondaryMobileMenu,
            },
            header: menus.topMenu,
            sidebar: {
                betting_sites: advertisers && {
                    menu_name: sections?.sidebar_menu.betting_sites.heading.title,
                    menu_items: advertisers.map((advertiser) => ({
                        title: advertiser.name,
                        url: advertiser.review_url || utils.getAdvertiserLink(advertiser),
                        extra_data: {
                            icon: <div
                                style={{
                                    backgroundColor: advertiser.assets?.colors.primary_color,
                                }}
                            >
                                <Image
                                    src={advertiser.assets?.logo.sportsbook_app}
                                    width={20}
                                    height={20}
                                    alt={advertiser.name}
                                />
                            </div>,
                        },
                    })),
                },
                others: menus.sidebarMenu
            },
        } : null,
    }),

    getUserTimezone: () => {
        const currentTime = moment();
        const currentZone = moment.tz.guess(); // Guess the current timezone
        const zoneAbbreviation = currentTime.tz(currentZone).zoneAbbr();
        const offset = currentTime.tz(currentZone).format('Z');

        return {
            code: zoneAbbreviation,
            name: currentZone,
            offset: offset,
        };
    },

    getTZDate: (date, serverTimezone, userTimezone, format = 'YYYY-MM-DD HH:mm:ss') => {

        const serverOffset = parseFloat(serverTimezone.value || '0') * 60;
        const userOffset = parseFloat(userTimezone.value) * 60;

        return moment(date)
            .utcOffset(serverOffset)
            .utcOffset(userOffset)
            .format(format);
    },

    convertOffsetToTimeZoneFormat: (offset) => {
        const sign = offset < 0 ? "-" : "+";
        const absoluteOffset = Math.abs(offset);
        const hours = Math.floor(absoluteOffset);
        const minutes = Math.round((absoluteOffset - hours) * 60);

        // Format hours and minutes as two-digit numbers
        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");

        return `${sign}${formattedHours}:${formattedMinutes}`;
    },

    brainLabels: (advertiser) => {
        if (!advertiser.brain_library) {
            return;
        }
        const getLabels = utils.searchKeyValue(advertiser.brain_library.labels, 'product', advertiser.product);
        return {
            no_bonus: getLabels?.no_bonus,
            tag: getLabels?.tag
        }
    },

    getTranslatedUrl: (data) => {
        if (data.pageData !== null && data.pageData?.language) {
            const languages = data.pageData.language.languages;
            const urlLocale = utils.getUrlLocale() || 'en';
            const postUrl = languages.find(lang => lang.language.code === urlLocale)?.object_url;
            return postUrl;
        }
    },

    timeAgo: (date) => {

        // Set the date format from the API / WP - should be a global variable
        moment.MomentFormatSpecification = 'YYYY-MM-DD HH:mm:ss Z';

        // Create a moment object
        const momentDate = moment(date);

        // Get the current date
        const currentDate = moment();

        // Calculate the difference in days
        const differenceInDays = currentDate.diff(momentDate, 'days');

        // Set the locale
        moment.locale(utils.getUrlLocale() || 'en');

        if (differenceInDays <= 14) {
            return momentDate.fromNow();
        } else {
            return momentDate.format('DD/MM/YYYY');
        }
    },

    advertiserStatusMessage: (advertiser, t) => {
        if (advertiser.status === 'Recommended') {
            return t('advertisers.status.recommended.label');
        } else if (advertiser.status === 'Not Recommended') {
            return t('advertisers.status.not_recommended.label');
        } else if (advertiser.status === 'Not Available') {
            return t('advertisers.status.not_available.label');
        } else if (advertiser.status === 'Not Monetized') {
            return t('advertisers.status.not_monetized.label');
        } else {
            return advertiser.status;
        }
    },

    getLastUrlSegment: (urlOrPath) => {
        // Ensure it works for both full URLs and paths
        const path = urlOrPath.startsWith('http')
            ? new URL(urlOrPath).pathname
            : urlOrPath;

        // Remove trailing slash if present
        const trimmedPath = path.replace(/\/$/, '');

        // Get the last segment
        const lastPart = trimmedPath.substring(trimmedPath.lastIndexOf('/') + 1);
        return lastPart;
    },

    getPaginationNumber: (slug) => {
        const pageNumber = slug[slug.length - 1];
        return isNaN(pageNumber) ? 1 : parseInt(pageNumber);
    },

    getInitials: (input) => {
        if (!input) return '';

        // If it's an email, grab the part before @
        const name = input.includes('@') ? input.split('@')[0] : input;

        const parts = name.trim().replace(/[._-]+/g, ' ').split(/\s+/);

        const firstInitial = parts[0]?.charAt(0).toUpperCase() || '';
        const secondInitial = parts.length > 1
            ? parts[parts.length - 1].charAt(0).toUpperCase()
            : '';

        return firstInitial + secondInitial;
    },

    getCurrentUrl: () => {
        if (typeof window === 'undefined') return '';

        let currentUrl = window.location.href;

        const isProduction = process.env.NEXT_PUBLIC_LOCAL !== 'true' || process.env.NEXT_PUBLIC_SANDBOX !== 'true';

        if (isProduction) {
            currentUrl = currentUrl.replace(process.env.NEXT_PUBLIC_SITE_URL, process.env.NEXT_PUBLIC_LIVE_SITE_URL);
            currentUrl = currentUrl.endsWith('/') ? currentUrl.slice(0, -1) : currentUrl;
        }

        return currentUrl;
    },

    getCurrentUrlLocale: () => {
        const currentUrl = utils.getCurrentUrl();
        const urlParts = currentUrl.split('/');
        const locale = urlParts[3];
        return locale && locale.length === 2 ? locale : '';
    }
}
