// This file is used by samples that are loaded from the local Node server

System.config({
    transpiler: 'typescript',
    typescriptOptions: {emitDecoratorMetadata: true,
        target: "ES5",
        module: "commonjs"},
    map: {
        '@angular': 'node_modules/@angular',
        'rxjs'    : 'node_modules/rxjs',
        'lodash'   : 'node_modules/lodash/lodash.js',
        'ag-grid-ng2': 'node_modules/ag-grid-ng2',
        'ag-grid': 'node_modules/ag-grid',
        'primeng': 'node_modules/primeng',
        'angular2-highcharts':        'https://cdn.rawgit.com/gevgeny/angular2-highcharts/v0.3.0/dist',
        'highcharts/highstock.src':   'https://cdn.rawgit.com/highcharts/highcharts-dist/v4.2.1/highstock.js',
        'moment' : 'node_modules/moment'
    },
    paths: {
        'node_modules/@angular/*': 'node_modules/@angular/*/bundles'
    },
    meta: {
        '@angular/*': {'format': 'cjs'},
        'app/mediator/stock.ts': {
            format: 'es6'
        },
        lodash: { format: 'amd' }
    },
    packages: {
        'app'                              : {main: 'cre1-with-service', defaultExtension: 'ts'},
        //w5b: main-with-service  // w5a: main-form  //w4: main-asyncpipe  //w3: main  //old: 'bids/bid-component'
        'rxjs'                             : {main: 'Rx'},
        '@angular/core'                    : {main: 'core.umd.min.js'},
        '@angular/common'                  : {main: 'common.umd.min.js'},
        '@angular/compiler'                : {main: 'compiler.umd.min.js'},
        '@angular/router'                  : {main: 'router.umd.min.js'},
        '@angular/forms'                  : {main: 'forms.umd.min.js'},
        '@angular/http'                    : {main: 'http.umd.min.js'},
        '@angular/platform-browser'        : {main: 'platform-browser.umd.min.js'},
        '@angular/platform-browser-dynamic': {main: 'platform-browser-dynamic.umd.min.js'},
        'primeng':  { defaultExtension: 'js' },

        'angular2-in-memory-web-api': {
            main: './index.js',
            defaultExtension: 'js'
        },
        'angular2-highcharts': {
            main: './index.js',
            defaultExtension: 'js'
        },

        moment: {
            main: 'moment.js',
            type: 'cjs',
            defaultExtension: 'js'
        },

        lib: {
            format: 'register',
            defaultExtension: 'js'
        },
        'ag-grid-ng2': {
            defaultExtension: "js"
        },
        'ag-grid': {
            defaultExtension: "js"
        }
    }
});

