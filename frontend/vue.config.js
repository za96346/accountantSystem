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
    configureWebpack: (config) => {
        // 为生产环境修改配置...
        if (process.env.NODE_ENV === 'production') {
            // eslint-disable-next-line no-param-reassign
            config.mode = 'production';
            // 打包文件大小配置
            // eslint-disable-next-line no-param-reassign
            config.performance = {
                maxEntrypointSize: 10000000,
                maxAssetSize: 30000000,
            };
        }
    },
});
