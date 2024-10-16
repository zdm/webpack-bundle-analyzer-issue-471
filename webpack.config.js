// const webpack = require( "webpack" );
const path = require( "node:path" );
const { BundleAnalyzerPlugin } = require( "webpack-bundle-analyzer" );

const config = {
    "name": "app",
    "target": "web", // browserslist
    "mode": "development",
    "context": path.resolve( __dirname ),
    "devtool": "eval-source-map",
    "experiments": {
        "topLevelAwait": true,
    },

    "entry": {
        "app": "./src/main.js",
    },

    "output": {
        "path": path.resolve( __dirname, "www" ),
        "publicPath": "auto",
        "filename": "js/[name].[contenthash].js",
        "chunkFilename": "js/[name].[contenthash].js",
        "hashDigestLength": 8,
    },

    "resolve": {
        "extensions": [ ".js" ],
    },

    "optimization": {
        "splitChunks": {
            "cacheGroups": {
                "vendors": {
                    "name": "vendors",
                    "test": /[/\\]node_modules[/\\]/,
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

            // js
            {
                "test": /\.m?jsx?$/,
                "exclude": [],
                "use": [
                    {
                        "loader": "babel-loader",
                        "options": {
                            "compact": false,
                            "presets": [ [ "@babel/preset-env", { "shippedProposals": true } ] ],
                        },
                    },
                ],
            },
        ],
    },

    "plugins": [
        new BundleAnalyzerPlugin( {
            "analyzerMode": "server",
            "openAnalyzer": false,

            // "logLevel": "silent",
        } ),
    ],
};

module.exports = config;
