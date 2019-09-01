module.exports = {
    mode: 'development',
    context: __dirname,
    entry: {
        Home: "./index.jsx",
        Customer: "./index_customer.jsx",
        Product: "./index_product.jsx",
        Store: './index_store.jsx',
        Sale: "./index_sale.jsx",
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    watch: true,
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
            }
        }]
    }
}
