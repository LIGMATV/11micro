const pluginIcons = require('eleventy-plugin-icons');

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy({ public: "/" });

    eleventyConfig.addPassthroughCopy({
        "public": "/",
        "node_modules/@idotj/mastodon-embed-timeline/dist/mastodon-timeline.min.css": "/modules/mastodon-timeline.min.css",
        "node_modules/@idotj/mastodon-embed-timeline/dist/mastodon-timeline.umd.js": "/modules/mastodon-timeline.umd.js",
    });
    
    eleventyConfig.addPlugin(pluginIcons, {
        mode: 'inline',
        sources: [{
                name: 'si',
                path: 'node_modules/simple-icons/icons'
            }
        ],
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
};