const withESLint = require('next-eslint')
const withWorkers = require('@zeit/next-workers');

module.exports = withWorkers(withESLint({
    webpack(config) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        })

        return config
    }
}));