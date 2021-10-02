// const webpack = require( "webpack" );

const config = {
    "name": "vue-app",
    "target": "web", // browserslist
    "mode": "development",
    "context": process.cwd(),
    "devtool": "eval-source-map",
    "experiments": { "topLevelAwait": true },
    "cache": {
        "type": "filesystem",
        "compression": "brotli",
        "maxAge": 1000 * 60 * 60 * 24 * 3, // 3 days
        "maxMemoryGenerations": 1,
    },

    "entry": {
        "app": "./src/main.js",
    },

    "output": {
        "path": process.cwd() + "/www",
        "publicPath": "auto",
        "filename": "js/[name].[contenthash].js",
        "chunkFilename": "js/[name].[contenthash].js",
        "hashDigestLength": 8,
    },

    "resolve": {
        "extensions": [".mjs", ".js", ".jsx", ".vue", ".json", ".wasm"],
    },

    "optimization": {
        "splitChunks": {
            "cacheGroups": {
                "vendors": {
                    "name": "vendors",
                    "test": /[\\/]node_modules[\\/]/,
                    "priority": -10,
                    "chunks": "initial",
                },
                "common": {
                    "name": "common",
                    "minChunks": 2,
                    "priority": -20,
                    "chunks": "initial",
                    "reuseExistingChunk": true,
                },
            },
        },
    },

    "module": {
        "rules": [

            // esm
            {
                "test": /\.m?jsx?$/,
                "resolve": {
                    "fullySpecified": false,
                },
            },

            // js
            {
                "test": /\.m?jsx?$/,
                "exclude": [],
                "use": [
                    {
                        "loader": "babel-loader",
                        "options": {
                            "compact": false, // we don't need babel compact, because js files optimized using terser later
                            "presets": [
                                ["@babel/preset-env", { "shippedProposals": true }],
                                ["@vue/app", { "decoratorsLegacy": false, "decoratorsBeforeExport": true }],
                            ],
                        },
                    },
                ],
            },

            // images
            {
                "test": /\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/,
                "type": "asset/resource",
                "generator": {
                    "filename": "img/[name].[hash][ext][query]",
                },
            },

            // media
            {
                "test": /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                "type": "asset/resource",
                "generator": {
                    "filename": "media/[name].[hash][ext][query]",
                },
            },

            // fonts
            {
                "test": /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                "type": "asset/resource",
                "generator": {
                    "filename": "fonts/[name].[hash][ext][query]",
                },
            },
        ],
    },

    "plugins": [],
};

module.exports = config;
