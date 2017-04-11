var webpack = require('webpack');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");//css
// var providePlugin = new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' });
var path = require("path");
module.exports = {
    entry: {react1:'./src/js/reack1.js', react2:'./src/js/react2.js', react3:'./src/js/react3.js'},
    output: {
        path: path.join(__dirname,"./static/"),
        publicPath: 'http://localhost:8080/static/',
        filename: '[name].js'
    },
    module: {
        rules: [
            // { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },打包成单独的css
            { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"] },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: [
                        require.resolve('babel-preset-es2015'),
                        require.resolve('babel-preset-react'),
                        require.resolve('babel-preset-stage-0'),
                    ]
                }
            },
            { test: /\.(jpg|png)$/, use: ["url-loader"] }
        ]
    },
    devServer: {
        port: 8080,
        historyApiFallback: true,
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
    },
    plugins: [
        // providePlugin,
        // new webpack.NoEmitOnErrorsPlugin(),
        // new ExtractTextPlugin({
        //     filename: 'http://localhost:8080/static/bundle.css'
        // })
    ]
}


