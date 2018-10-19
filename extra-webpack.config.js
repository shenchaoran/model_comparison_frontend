var webpack = require('webpack');

module.exports = {
    // module: {
    //     rules: [{
    //         test: /\.cool$/,
    //         use: 'cool-loader'
    //     }]
    // },
    plugins: [
        new webpack.BannerPlugin('created by scr-scr-scr.')
    ]
};
