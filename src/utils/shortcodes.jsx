import parse from 'html-react-parser';
import { Fragment } from 'react';

// Api
// import { api } from '@/utils';

// Components
// import {
//     AdvertiserCardShortcode,
//     LastFootballFixturesTable
// } from '@/components';

export const shortcodes = {

    map: { // Register the Shortcodes supported and their processing functions
        date_display: {
            type: 'inline',
            args: ['format'],
            process: (args) => shortcodes.processDateDisplay(args),
        },
        operator_card: {
            type: 'component',
            args: ['id', 'local', 'list', 'product', 'casino_game', 'free_game', 'style'],
            process: (args) => shortcodes.processOperatorCard(args)
        },
        betting_tip_card: {
            type: 'component',
            args: [],
            process: (args) => shortcodes.processBettingTipCard(args)
        },
        payment_method_limits_table: {
            type: 'component',
            args: ['payment_method', 'method'],
            process: (args) => shortcodes.processPaymentMethodLimitsTable(args)
        },
        advertiser_payment_limits_table: {
            type: 'component',
            args: ['advertiser', 'method'],
            process: (args) => shortcodes.processAdvertiserPaymentLimitsTable(args)
        },
        last_football_fixtures_table: {
            type: 'component',
            args: ['side', 'limit'],
            process: (args) => shortcodes.processLastFootballFixturesTable(...Object.values(args))
        },
        in_content_donation_link: {
            type: 'backend', // This shortcode is processed in the backend. Only for reference
            args: ['string', 'id', 'local'], // Argument Local not working ATM
            process: (args) => shortcodes.processInContentDonationLink(args)
        },
        iframe: {
            type: 'backend', // This shortcode is processed in the backend. Only for reference
            args: ['source', 'id', 'css_class', 'js_source'],
            process: (args) => shortcodes.processIframe(args)
        },
        relevant_betting_tips: {
            type: 'component',
            args: ['limit', 'title'],
            process: (args) => shortcodes.processRelevantBettingTips(args)
        },
        articles_cards: {
            type: 'component',
            args: ['limit', 'title'],
            process: (args) => shortcodes.processArticlesCards(args)
        }
    },

    processContent: (content) => { // Process page content blocks
        if (!content.content) return false;

        return {
            ...content,
            content: content.content.map((item) => ({
                ...item,
                text: shortcodes.process(item.text)
            }))
        };
    },

    process: (text) => { // Process text and replace shortcodes with their respective output
        if (!text) return text;

        // Normalize encoded quotation marks to be able to search for shortcodes
        let output = text.replace(/&#8219;|&#8220;|&#8221;|&#8222;|&#8223;|&#8242;|&#8243;|&#8245;|&#8246;/g, '"');

        // If no shortcodes are found, return the original text
        const generalShortcodeRegex = new RegExp(`(\\[.*?\\])`, 'g');
        if (!generalShortcodeRegex.test(output)) return text;

        // Process Inline Shortcodes followed by Component Shortcodes
        output = shortcodes.processInlineShortcodes(output);
        output = shortcodes.processComponentShortcodes(output);

        return output;
    },

    processInlineShortcodes: (text) => { // Process Inline Shortcodes - they are part of the text and return a string
        // Regex pattern to detect and collect all shortcodes matches
        const generalShortcodeRegex = new RegExp(`(\\[.*?\\])`, 'g');

        // Extract all shortcode matches
        const shortcodesMatches = text.match(generalShortcodeRegex);

        // Process each shortcode match and replace for the shortcode output
        shortcodesMatches.forEach(shortcodeMatch => {
            // Extract shortcode name
            const shortcodeName = shortcodeMatch.match(/\[(.*?)[\s\]]/)[1];

            // If shortcode is not supported, remove it from the text
            if (!Object.keys(shortcodes.map).includes(shortcodeName)) {
                text = text.replace(shortcodeMatch, '');
            }

            // If shortcode is type inline, process it
            if (shortcodes.map[shortcodeName]?.type === 'inline') {
                const shortcodeArgs = shortcodes.collectArgs(shortcodeName, shortcodeMatch);

                const shortcodeOutput = shortcodes.map[shortcodeName].process(shortcodeArgs);
                text = text.replace(shortcodeMatch, shortcodeOutput);
            }

            // If shortcode is type component, ignore it
            return text;
        });

        return text;
    },

    processComponentShortcodes: (text) => { // Process Component Shortcodes - they return a JSX component that must be within an array
        // Regex pattern to detect and collect any shortcode
        const generalShortcodeRegex = new RegExp(`(\\[.*?\\])`, 'g');

        // Split text into text and shortcodes
        const parts = text.split(generalShortcodeRegex); // [text, shortcodes, text, shortcodes, text]
        if (parts.length === 1) return text;

        let isJSX = false;
        const processedTextArray = parts.map((part, index) => {
            // Work on shortcodes only (odd indexes)
            if (index % 2 === 1) {
                // Extract shortcode name
                const shortcodeName = part.match(/\[(.*?)[\s\]]/)[1];

                // Check if the shortcode is not supported or is not a component type
                if (!Object.keys(shortcodes.map).includes(shortcodeName) || shortcodes.map[shortcodeName].type !== 'component') {
                    return <Fragment key={index} children={parse(part)} />;
                    // return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
                }

                // Extract shortcode arguments
                const shortcodeArgs = shortcodes.collectArgs(shortcodeName, part);

                // Get shortcode processed output
                const shortcodeOutput = shortcodes.map[shortcodeName].process(shortcodeArgs);

                // Check if the processed output is JSX (Object)
                if (typeof shortcodeOutput === 'object') isJSX = true;

                // if the processed text is JSX, return it, otherwise return an empty string to remove the shortcode
                return isJSX ? shortcodeOutput : "";
            }

            return <Fragment key={index}>{parse(part)}</Fragment>;
            // return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
        });

        return processedTextArray;
    },

    collectArgs: (shortcodeKey, text) => { // Collect shortcode arguments
        let collectedArgs = {};
        if (!shortcodes.map[shortcodeKey]?.args) return collectedArgs;

        shortcodes.map[shortcodeKey].args.forEach(arg => {
            const argRegex = new RegExp(`\\[${shortcodeKey}.*? ${arg}="(?<$arg>.*?)"`, 'g');

            const match = argRegex.exec(text);
            if (match) collectedArgs[arg] = match[1];
        });

        return collectedArgs;
    },

    processDateDisplay: ({ format }) => {
        const date = new Date();

        const formatDate = (date, format = 'Y') => {
            const monthNamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            const options = {
                Y: date.getFullYear(),
                m: String(date.getMonth() + 1).padStart(2, '0'),
                d: String(date.getDate()).padStart(2, '0'),
                H: String(date.getHours()).padStart(2, '0'),
                i: String(date.getMinutes()).padStart(2, '0'),
                s: String(date.getSeconds()).padStart(2, '0'),
                M: monthNamesShort[date.getMonth()],
                F: monthNamesFull[date.getMonth()]
            };

            return format.replace(/Y|m|d|H|i|s|M|F/g, match => options[match] || match);
        }

        return formatDate(date, format);
    },

    // processOperatorCard: async (args) => {
    //     // As this shortcode involves conditional rendering, we need to process the shortcode args within a JSX component
    //     return <AdvertiserCardShortcode shortcodeArgs={args} />;
    // },

    // processRelevantBettingTips: async (args) => {
    //     const cardsData = await api.data.getRelevantBettingTips(args.limit);
    //     return <Cards cards={cardsData} title={args.title} />;
    // },

    // processArticlesCards: async (args) => {
    //     const cardsData = await api.data.getPosts(args.limit);
    //     return <Cards cards={cardsData} title={args.title} />;
    // },

    // processBettingTipCard: async () => {
    //     return <BettingTipCard />;
    // },

    // processPaymentMethodLimitsTable: async ({ payment_method, method }) => {
    //     const paymentMethodLimitsTableData = await api.data.getPaymentMethodLimits(payment_method);

    //     return <PaymentLimitsTable limitsTableData={paymentMethodLimitsTableData} method={method} display="advertisers" />;
    // },

    // processAdvertiserPaymentLimitsTable: async ({ advertiser, method }) => {

    //     const advertiserLimitsTableData = await api.data.getAdvertiserPaymentsLimits(advertiser);

    //     return <PaymentLimitsTable limitsTableData={advertiserLimitsTableData} method={method} display="payments" />;
    // },

    // processLastFootballFixturesTable: (side, limit = 5) => {
    //     return <LastFootballFixturesTable side={side} limit={limit} />;
    // },

    processInContentDonationLink: ({ string, advertiser_id, local }) => {
        // These shortcode is processed in the backend. Only for reference
        // Argument Local is still not working
        return "";
    },

    processIframe: ({ source, id, css_class, js_source }) => {
        // These shortcode is processed in the backend. Only for reference
        // Argument Local is still not working
        return "";
    }
};
