const yaml = require("js-yaml");
const pluginIcons = require('eleventy-plugin-icons');

module.exports = async function (eleventyConfig) {
    const { IdAttributePlugin } = await import("@11ty/eleventy");

    eleventyConfig.addPlugin(IdAttributePlugin);

    eleventyConfig.addPassthroughCopy({
        public: "/"
    });

    eleventyConfig.addPassthroughCopy({
        "public": "/",
        "node_modules/@idotj/mastodon-embed-timeline/dist/mastodon-timeline.min.css": "/modules/mastodon-timeline.min.css",
        "node_modules/@idotj/mastodon-embed-timeline/dist/mastodon-timeline.umd.js": "/modules/mastodon-timeline.umd.js",
        "node_modules/bsky-embed/dist/bsky-embed.umd.js": "/modules/bsky-embed.umd.js",
    });

    /*
    Date Configuration (e.g.: {{ date | dateConfig("YYYY-MM-DD") }})
    Without luxon dependencies (Pure solution)
    */
    eleventyConfig.addFilter("dateConfig", (dateVal, formatStr = "YYYY-MM-DD", locale = "en-US") => {
        const date = new Date(dateVal);
    
        const formatMap = {
            YYYY: date.getFullYear(),
            MM: String(date.getMonth() + 1).padStart(2, "0"),
            DD: String(date.getDate()).padStart(2, "0"),
            Weekday: new Intl.DateTimeFormat(locale, { weekday: "long" }).format(date),
            WeekdayAbbr: new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date),
            Month: new Intl.DateTimeFormat(locale, { month: "long" }).format(date),
            MonthAbbr: new Intl.DateTimeFormat(locale, { month: "short" }).format(date)
        };
    
        return formatStr.replace(/\b(YYYY|MM|DD|Weekday|WeekdayAbbr|Month|MonthAbbr)\b/g, match => formatMap[match]);
    });

    /*
    Search to data that applied in frontmatter
    */
    eleventyConfig.addGlobalData("eleventyComputed", {
        profileData: (data) => data[data.data] || {},
        authorData: (data) => data[data.author] || {}
    });

    /* 
    Markdown-It 'markdownify' filter
    Source: 
        * https://github.com/11ty/eleventy/issues/236#issuecomment-968128446
        * https://github.com/11ty/eleventy/issues/236#issuecomment-968129899
    */
    const md = require("markdown-it")({
        html: true,
        linkify: true,
        typographer: true,
    });
    eleventyConfig.addFilter("markdownify", (markdownString) =>
        md.render(markdownString)
    );
    eleventyConfig.addFilter("markdownifyInline", (markdownString) =>
        md.renderInline(markdownString)
    );

    /*
    YAML Custom Data
    Source: https://www.11ty.dev/docs/data-custom/#yaml
    */
    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

    /*
    Add eleventy-plugin-icons and simple-icons
    Source: https://github.com/uncenter/eleventy-plugin-icons
    */
    eleventyConfig.addPlugin(pluginIcons, {
        mode: 'inline',
        sources: [{
            name: 'si',
            path: 'node_modules/simple-icons/icons'
        }],
        icon: {
            shortcode: 'icon',
            delimiter: ':',
            transform: async (content) => content,
            class: (name, source) => `icon icon-${name}`,
            id: (name, source) => `icon-${name}`,
            attributes: {},
            attributesBySource: {},
            overwriteExistingAttributes: true,
            errorNotFound: true,
        },
        sprite: {
            shortcode: 'spriteSheet',
            attributes: {
                class: 'sprite-sheet',
                'aria-hidden': 'true',
                xmlns: 'http://www.w3.org/2000/svg',
            },
            extraIcons: {
                all: false,
                sources: [],
                icons: [],
            },
            writeFile: false,
        },
    });

    return {
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    };
};