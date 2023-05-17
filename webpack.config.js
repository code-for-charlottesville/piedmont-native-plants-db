const path = require('path');

/* This file details how to compile and package the React java-script.
 * entry: {} specifies the paths to the input files.
 * output: {} specifies how to create the bundled files.
 * module: {} specifies what files should be compiled and what compiler to use
 *
 * USAGE:
 *  entry: {
 *      react_js1: 'path1',
 *      react_js2: 'path2'
 *  }
 *  output: {
 *      filename: '[name]-bundle.js', -> creates 'react_js1-bundle.js' and 'react_js2-bundle.js'
 *      ...
 *  }
 * The compiled java-script can be used in the Django templates.
 */

module.exports = { // path(s) to our input files
    entry: {
        index: './website/assets/index.js',
    },
    output: {
        filename: '[name]-bundle.js',  // output bundle file name
        path: path.resolve(__dirname, './website/static/js'),  // path to static directory
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: { presets: ["@babel/preset-env", "@babel/preset-react"] }
            },
        ]
    }
};