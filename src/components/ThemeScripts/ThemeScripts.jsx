import Script from "next/script";


const ThemeScripts = ({ scripts }) => {

    const loadExternalScripts = (scripts) => {
        if (scripts && scripts.length > 0) {
            return scripts.map((script, index) => {
                const { url, location, defer } = script;
                const strategy = location === 'header' ? (defer ? 'lazyOnload' : 'beforeInteractive') : 'afterInteractive';
                return (
                    <Script key={`external-${index}`} src={url} strategy={strategy} />
                );
            });
        }
        return null;
    };

    const loadInlineScripts = (scripts) => {
        if (scripts && scripts.length > 0) {
            return scripts.map((script, index) => {
                const { content, location } = script;
                const strategy = location === 'header' ? 'beforeInteractive' : 'afterInteractive';
                return (
                    <Script
                        key={`inline-${index}`}
                        id={`inline-script-${index}`}
                        strategy={strategy}
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                );
            });
        }
        return null;
    };

    return (
        <>
            {loadExternalScripts(scripts?.external_scripts)}
            {loadInlineScripts(scripts?.inline_scripts)}
        </>
    );
};

export default ThemeScripts;