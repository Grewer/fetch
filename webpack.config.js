const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['env']
				}
			}
		]
	},

	plugins: [new UglifyJsPlugin()],

	entry: {
		index: './index.js.js'
	},

	output: {
		filename: 'fetch.min.js',
		path: path.resolve(__dirname, 'dist')
	}
};
