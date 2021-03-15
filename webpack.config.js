/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
/* Copyright (c) 2020 Red Hat, Inc. */
/* Copyright Contributors to the Open Cluster Management project */

const config = require('./config'),
      path = require('path'),
      webpack = require('webpack'),
      AssetsPlugin = require('assets-webpack-plugin'),
      CompressionPlugin = require('compression-webpack-plugin'),
      CopyPlugin = require('copy-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      MonacoWebpackPlugin = require('monaco-editor-webpack-plugin'),
      TerserPlugin = require('terser-webpack-plugin')

const PRODUCTION = process.env.BUILD_ENV ? /production/.test(process.env.BUILD_ENV) : false

process.env.BABEL_ENV = process.env.BABEL_ENV ? process.env.BABEL_ENV : 'client'

const prodExternals = {}

const overpassTest = /overpass-.*\.(woff2?|ttf|eot|otf)(\?.*$|$)/

module.exports = {
  context: __dirname,
  devtool: PRODUCTION ? 'source-map' : 'cheap-module-source-map',
  stats: {
    children: false,
    warningsFilter: [/Failed to parse source map/],
  },
  entry: {
    'main': ['@babel/polyfill', './src-web/index.js'],
    'welcome': ['./scss/common.scss', './scss/welcome.scss', './src-web/welcomeindex.js']
  },

  externals: Object.assign(PRODUCTION ? prodExternals : {}, {
    // replace require-server with empty function on client
    './require-server': 'var function(){}'
  }),

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          quiet: true
        }
      },
      {
        // Transpile React JSX to ES5
        test: [/\.jsx$/, /\.js$/],
        exclude: /node_modules|\.scss/,
        loader: 'babel-loader?cacheDirectory',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      },
      {
        test: [/\.s?css$/],
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader?sourceMap',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ]
              },
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader?sourceMap',
            options: {
              prependData: '$font-path: "'+ config.get('contextPath') + '/fonts";'
            },
          },
        ],
      },
      {
        test: /\.woff2?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, './node_modules/monaco-editor'),
          path.resolve(__dirname, './node_modules/@patternfly'),
        ],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s?css$/,
        include: path.resolve(__dirname, './node_modules/@open-cluster-management/ui-components'),
        loader: 'null-loader'
      },
      {
        test: /\.properties$/,
        loader: 'properties-loader'
      },
      {
        test: /\.svg$/,
        include: [
          path.resolve(__dirname, './graphics'),
        ],
        use: [
          'svg-sprite-loader'
        ]
      },
      {
        test: [/\.handlebars$/, /\.hbs$/],
        loader: 'handlebars-loader',
      },
      {
        test: /\.yaml$/,
        loader: 'js-yaml-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff2?|ttf|eot|otf)(\?.*$|$)/,
        exclude: [overpassTest, path.resolve(__dirname, './graphics')],
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
      {
        // Resolve to an empty module for overpass fonts included in SASS files.
        // This way file-loader won't parse them. Make sure this is BELOW the
        // file-loader rule.
        test: overpassTest,
        loader: 'null-loader',
      },
    ],
    noParse: [
      // don't parse minified bundles (vendor libs) for faster builds
      /\.min\.js$/
    ]
  },

  optimization: {
    minimize: PRODUCTION,
    minimizer: [new TerserPlugin({
      parallel: true,
    })],
  },

  output: {
    //needs to be hash for production (vs chunckhash) in order to cache bust references to chunks
    filename: PRODUCTION ? 'js/[name].[contenthash].min.js' : 'js/[name].js',
    // chunkFilename: PRODUCTION ? 'js/[name].[chunkhash].min.js' : 'js/[name].js',
    path: __dirname + '/public',
    publicPath: config.get('contextPath').replace(/\/?$/, '/'),
    jsonpFunction: 'webpackJsonpFunctionGrc',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(PRODUCTION ? 'production' : 'development'),
      },
      CONSOLE_CONTEXT_URL: JSON.stringify(config.get('contextPath'))
    }),
    new webpack.DllReferencePlugin({
      context: process.env.STORYBOOK ? path.join(__dirname, '..') : __dirname,
      // eslint-disable-next-line import/no-unresolved
      manifest: require('./dll/vendorhcm-manifest.json'),
    }),
    new MiniCssExtractPlugin({
      filename: PRODUCTION ? 'css/[name].[contenthash].css' : 'css/[name].css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          configFile: './.eslintrc.json',
          quiet: true
        }
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname
      }
    }),
    new CompressionPlugin({
      filename: '[path].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$/,
      minRatio: 1,
    }),
    new MonacoWebpackPlugin({
      languages: ['yaml'],
    }),
    new AssetsPlugin({
      path: path.join(__dirname, 'public'),
      fullPath: false,
      prettyPrint: true,
      update: true
    }),
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/carbon-icons/dist/carbon-icons.svg', to: 'graphics' },
        { from: 'graphics', to: 'graphics' },
        { from: 'fonts', to: 'fonts' },
      ],
      options: {
        concurrency: 100,
      },
    })
  ],

  resolve: {
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },

  resolveLoader: {
    modules: [
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'node_modules/node-i18n-util/lib') // properties-loader
    ]
  }
}
