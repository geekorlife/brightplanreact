module.exports = {
    devtool: 'cheap-module-source-map',
    entry: './web/src/index.js',
    output: {
        path: './web/',
        filename: 'app.js'
    },
    devServer:{
        inline: true,
        host: '127.0.0.1',
        historyApiFallback: true,
        port: 5555
    },
    module:{
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
}