const path = require('path')

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

	plugins: [],

	entry: {
		index: './src/index.js'
	},

	output: {
		filename: 'fetch.js',
		path: path.resolve(__dirname, 'dist')
	}
};
