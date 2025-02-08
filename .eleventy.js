const yaml = require("js-yaml");
const pluginIcons = require('eleventy-plugin-icons');

module.exports = function (eleventyConfig) {
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

    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

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