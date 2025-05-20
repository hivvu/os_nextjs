'use client';
import { useEffect } from "react";
import tocbot from 'tocbot';

// Styles
import './Toc.scss';

// Components
import StickyBox from "react-sticky-box";

export default function Toc () {

    useEffect(() => {
        // Function to generate unique IDs for headings
        const generateHeadingIds = () => {
            const idMap = new Map();
            const headings = document.querySelectorAll('.content__inner__content h1, .content__inner__content h2, .content__inner__content h3, .content__inner__content h4, .content__inner__content h5, .content__inner__content h6');

            headings.forEach((heading) => {
                if (!heading.id) { // Only assign an ID if one doesn't exist
                    let baseId = heading.innerText
                        .toLowerCase()
                        .replace(/[^\w\s-]/g, "")
                        .replace(/\s+/g, "-")
                        .trim();

                    // Ensure unique IDs
                    if (idMap.has(baseId)) {
                        const count = idMap.get(baseId) + 1;
                        idMap.set(baseId, count);
                        baseId = `${baseId}-${count}`;
                    } else {
                        idMap.set(baseId, 1);
                    }

                    heading.id = baseId;
                }
            });
        };

        // Generate unique IDs before initializing tocbot
        generateHeadingIds();

        // Initialize Tocbot
        tocbot.init({
            headingsOffset: 40,
            scrollSmoothOffset: -100,
            tocSelector: '.toc', // The container for the TOC
            contentSelector: '.content__inner__content', // The container for the content
            headingSelector: 'h1, h2, h3, h4, h5, h6', // Headings to include in TOC
            collapseDepth: 3, // Collapse depth for nested headings
            hasInnerContainers: true, // Ensure inner containers are properly parsed
        });

        return () => {
            // Destroy Tocbot on component unmount
            tocbot.destroy();
        };
    }, []);

    return (
        <StickyBox offsetTop={120} offsetBottom={20}>
            <div className="toc"></div>
        </StickyBox>
    );
};
