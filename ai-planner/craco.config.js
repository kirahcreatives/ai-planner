const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    url: require.resolve('url/'),
                    buffer: require.resolve('buffer/'),
                    process: require.resolve('process/browser'),
                    util: require.resolve('util/'),
                    stream: require.resolve('stream-browserify'),
                    https: require.resolve('https-browserify'),
                    http: require.resolve('stream-http'),
                    os: require.resolve('os-browserify/browser'),
                    crypto: require.resolve('crypto-browserify'),
                    assert: require.resolve('assert/'),
                    zlib: require.resolve('browserify-zlib')
                }
            },
            plugins: [
                new webpack.ProvidePlugin({
                    process: 'process/browser',
                    Buffer: ['buffer', 'Buffer']
                })
            ]
        }
    }
};