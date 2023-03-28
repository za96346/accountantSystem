const { defineConfig } = require('@vue/cli-service');
// const path = require('path');

module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                   @import "./src/index.scss";
                `,
            },
            // scss: {
            //     prependData: `
            //        @import "./src/index.scss";
            //     `,
            // },
        },
    },
});
