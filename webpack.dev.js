const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
var webpack = require("webpack");
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
module.exports = {
    devtool: 'cheap-module-eval-source-map',
    mode: "development",
    entry: {
        main: "./app/index.js"
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].bundle.js",
        publicPath: '/',
        chunkFilename: "[name].chunk.js"
    },
    module: {
        rules: [
            {
               test: /\.(ts|tsx|jsx|js)$/,
               use: {
                   loader: 'babel-loader',
                   options: {
                       presets: [
                        ["@babel/preset-env", {
                            "corejs": "3",
                            "useBuiltIns": "usage"
                          }],
                          "@babel/preset-react",
                          // "@babel/preset-typescript"
                       ],
                       "plugins": [
                            "@babel/plugin-transform-runtime",
                            '@babel/plugin-syntax-dynamic-import',
                            '@babel/plugin-proposal-class-properties',
                            ["import", {
                                "libraryName": "antd",
                                "libraryDirectory": "es",
                                "style": "css" // `style: true` 会加载 less 文件
                            }]
                        ]
                   }
               },
               exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"},
                    {loader: "postcss-loader"}
                ]
            },
            {
                test: /\.html$/,
                use: [
                      {
                        loader: require.resolve('html-loader')
                      }
                     ]
             },
            // {
            //     test: /\.(png|jpg|gif|jpeg)/,
            //     use: [
            //         {
            //             loader: "url-loader",
            //             options: {
            //                 limit: 500,
            //                 name: ("imgs/[name].[hash:5].[ext]"),
            //                 publicPath: "./"
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.(woff|woff2|svg|eot|ttf|png)$/,
                loader: 'file-loader',
                options: {
                    name: ("static/[name].[hash:5].[ext]"),
                    publicPath: "./"
                }
            }
        ]
    },
    plugins: [
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            template: "./index.html",
            // favicon: "./favicon.png",
        }),
        new webpack.DefinePlugin({
            _DEV_: JSON.stringify(true),
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new ErrorOverlayPlugin(),
        // new ForkTsCheckerWebpackPlugin({
        //     // 将async设为false，可以阻止Webpack的emit以等待类型检查器/linter，并向Webpack的编译添加错误。
        //     async: false
        // }),
        // 将TypeScript类型检查错误以弹框提示
        // 如果fork-ts-checker-webpack-plugin的async为false时可以不用
        // 否则建议使用，以方便发现错误
        // new ForkTsCheckerNotifierWebpackPlugin({
        //     title: 'TypeScript',
        //     excludeWarnings: true,
        //     skipSuccessful: true,
        // })
    ],
    resolve: {
        alias: {
          "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./app/components/icons.js"),
          "@node-addEventListener": "rc-util/lib/Dom/addEventListener",
          
          "@app": path.resolve(__dirname, "./app"),
        },
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    
    devServer: {
        contentBase: path.resolve(__dirname, "./dist"),
        host: "localhost",
        compress: true,
        port: 8888,
        hot: true,
        proxy: {
            '/api/*': {
                target: 'http://172.19.112.74:8080/',
                pathRewrite: {'^/api' : ''},
                secure: true,
                changeOrigin: true,
            }
        }
    }
};