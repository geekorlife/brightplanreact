const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack')

module.exports = {
    devtool: 'cheap-source-map',
    entry: './src/index.js',
    output: {
        path: './',
        filename: 'app.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
    ],
    
    module:{
        loaders: [
            { 
                test: /\.js$/, 
               exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {presets: ['es2015', 'react']}
            },
            {
                test: /\.scss$/,
                exclude: /(node_modules|bower_components)/, 
                loaders: ['style', 'css', 'sass']
            }
        ]
    },
}