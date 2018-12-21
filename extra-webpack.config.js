const webpack = require('webpack');

module.exports = {
    // module: {
    //     rules: [{
    //         test: /\.scss$/,
    //         use: ['css-loader', 'resolve-url-loader', 'sass-loader']
    //     }]
    // },
    plugins: [
        // new webpack.BannerPlugin({
        //     banner: 'created by scr.',
        //     raw: false,
        //     entryOnly: true
        // })
    ],
    // devtool: 'cheap-eval-source-map'  //PD added this
};
