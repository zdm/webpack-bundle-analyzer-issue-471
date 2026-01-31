import path from "node:path";
import { createConfig } from "@corejslib/babel";
import HtmlPlugin from "html-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

// import webpack from "webpack";

const config = {
    "name": "app",
    "target": "web", // browserslist
    "mode": "development",
    "context": path.resolve( import.meta.dirname ),
    "devtool": "eval-source-map",
    "experiments": {
        "asyncWebAssembly": true,
        "layers": true,
        "topLevelAwait": true,
    },

    "devServer": {
        "host": "0.0.0.0",
        "port": 80,
        "client": {
            "overlay": {
                "runtimeErrors": true,
            },
        },
    },

    "entry": {
        "app": "./src/index.js",
    },

    "output": {
        "path": path.resolve( import.meta.dirname, "www" ),
        "publicPath": "auto",
        "filename": "js/[name].[contenthash].js",
        "chunkFilename": "js/[name].[contenthash].js",
        "hashDigestLength": 8,
        "environment": {
            "asyncFunction": true,
        },
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
                "test": /\.[cm]?jsx?$/,
                "resolve": {
                    "fullySpecified": false,
                },
                "oneOf": [

                    // web workers *.worker.js
                    {
                        "test": /\.worker\.[cm]?js$/,

                        "type": "asset/resource",
                        "generator": {
                            "filename": "[name].[hash][ext][query]",
                        },
                    },

                    // other *.js files
                    {
                        "use": [
                            {
                                "loader": "babel-loader",
                                "options": createConfig(),
                            },
                        ],
                    },
                ],
            },

            // vue
            {
                "test": /\.vue$/,
                "use": [
                    {
                        "loader": "vue-loader",
                        "options": {

                            // XXX "babelParserPlugins": ["jsx", "classProperties", "decorators-legacy"],
                            "compilerOptions": {
                                "isCustomElement": tag => tag.startsWith( "ext-" ),
                            },
                        },
                    },
                ],
            },
        ],
    },

    "plugins": [
        new VueLoaderPlugin(),

        new BundleAnalyzerPlugin( {
            "analyzerMode": "server",
            "openAnalyzer": false,

            // "logLevel": "silent",
        } ),

        new HtmlPlugin( {
            "scriptLoading": "defer",
            "template": "public/index.html",
            "templateParameters": {},
        } ),
    ],
};

export default config;
