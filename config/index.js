'use strict';
// Template version: 1.2.7
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/manager': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/manager': '/manager',
        },
      },
      '/common': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/common': '/common',
        },
      },
      '/craftLine': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/craftLine': '/craftLine',
        },
      },
      '/factory': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/factory': '/factory',
        },
      },
      '/department': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/department': '/department',
        },
      },
      '/ProductionLine': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/ProductionLine': '/ProductionLine',
        },
      },
      '/loginRecord': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/loginRecord': '/loginRecord',
        },
      },
      '/logs': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/logs': '/logs',
        },
      },
      '/production': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/production': '/production',
        },
      },
      '/skills': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/skills': '/skills',
        },
      },
      '/users': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/users': '/users',
        },
      },
      '/workerBorrowedApplay': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/workerBorrowedApplay': '/workerBorrowedApplay',
        },
      },
      '/workerBorrow': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/workerBorrow': '/workerBorrow',
        },
      },
      '/workers': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/workers': '/workers',
        },
      },
      '/worker': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/worker': '/worker',
        },
      },
      '/workplaces': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/workplaces': '/workplaces',
        },
      },
      '/workProcess': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/workProcess': '/workProcess',
        },
      },
      '/schedules': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/schedules': '/schedules',
        },
      },
      '/workingTime': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/workingTime': '/workingTime',
        },
      },
      '/evaluateDay': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/evaluateDay': '/evaluateDay',
        },
      },
      '/evaluateDetailRules': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/evaluateDetailRules': '/evaluateDetailRules',
        },
      },
      '/detailRules': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/detailRules': '/detailRules',
        },
      },
      '/evaluateMonth': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/evaluateMonth': '/evaluateMonth',
        },
      },
      '/crateBasicScore': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/crateBasicScore': '/crateBasicScore',
        },
      },
      '/evaluateQuarter': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/evaluateQuarter': '/evaluateQuarter',
        },
      },
      '/evaluateYear': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/evaluateYear': '/evaluateYear',
        },
      },
      '/testPapers': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/testPapers': '/testPapers',
        },
      },
      '/question': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/question': '/question',
        },
      },
      '/uploadTrainCourseFile': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/uploadTrainCourseFile': '/uploadTrainCourseFile',
        },
      },
      '/downloadTrainCourseFile': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/downloadTrainCourseFile': '/downloadTrainCourseFile',
        },
      },
      '/trainCourse': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/trainCourse': '/trainCourse',
        },
      },
      '/trainPlan': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/trainPlan': '/trainPlan',
        },
      },
      '/trainSkill': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/trainSkill': '/trainSkill',
        },
      },
      '/login': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/login': '/login',
        },
      },
      '/roles': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/roles': '/roles',
        },
      },
      '/physic': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/physic': '/physic',
        },
      },
      '/BizZgxx': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/BizZgxx': '/BizZgxx',
        },
      },
      '/BizRyCnt': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/BizRyCnt': '/BizRyCnt',
        },
      },
      '/fingerpoint': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/fingerpoint': '/fingerpoint',
        },
      },
      '/BizZwdl': {
        target: 'http://42.202.130.12:8080',
        pathRewrite: {
          '^/BizZwdl': '/BizZwdl',
        },
      },
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
};
