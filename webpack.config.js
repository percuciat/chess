const path = require('path'); // инициализируем метод path для упрощения поиска ПУТИ для файла
const HTMLWebpackPlugin = require('html-webpack-plugin'); // инициализируем установленный плагин HTML
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // инициализируем установленный плагин JS
const CopyWebpackPlugin = require('copy-webpack-plugin'); // инициализируем плагин для статических данных
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // инициализируем плагин для перенос CSS в отдельный ФАЙЛ
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // инициализируем плагин для сжатия CSS
const TerserPlugin = require('terser-webpack-plugin'); // инициализируем плагин для сжатия JS


const isDev = process.env.NODE_ENV === 'development'; // проверка на режим сборки для hot module replacement (hmr)
const isProd = !isDev; // для улучшения взаимодействия в конфиге


const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all" // оптимизация скриптов (соединение общих библиотек - jquery), создание vendor
        }
    };
    if(isProd){
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    }
    return config
};

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`; // функция фильтра по хэшу убирает в режиме dev

const cssLoader = extensions => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            },
        },
        'css-loader'
    ];

    if(extensions){
        loaders.push(extensions)
    }
    return loaders
};

const babelOption = preset => {
    const options = {
        presets: [
            '@babel/preset-env',
        ],
            plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    };
    if(preset){
        options.presets.push(preset)
    }
    return options
};

const jsLoader = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: babelOption()
        }
    ];
    if (isDev){
        loaders.push('eslint-loader')
    }
   return loaders
};

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname,'src/favicon.ico'),
                to: path.resolve(__dirname,'dist')
            }
        ]),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ];

    return base
};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: "development",
    entry: {
        main: ['@babel/polyfill','./index.ts'],
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.js', '.json','.png', '.jpg'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devtool: isDev ? 'source-map' : '',
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoader()
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            { test: /\.js$/,
                exclude: /node_modules/, // папка исключения для компилятора
                use: jsLoader()
            },
            { test: /\.ts$/,
                exclude: /node_modules/, // папка исключения для компилятора
                loader: {
                    loader: 'babel-loader',
                    options: babelOption('@babel/preset-typescript')
                }
            },

        ]
    }
};