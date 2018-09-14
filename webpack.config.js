const path = require('path')

module.exports = [{
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
        include:path.join(__dirname,'./src'),
			}
		]
	},
	plugins: [],
	entry: {
		index: './src/index.js'
	},
  output: {
		filename: 'fetch.js',
		path: path.resolve(__dirname, 'dist'),
    library: 'fetch',
    libraryTarget: 'commonjs-module',
    libraryExport: "default",
  }
},{
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
        include:path.join(__dirname,'./src'),
				options: {
					presets: ['es2015']
				}
			}
		]
	},
	plugins: [],
	entry: {
		index: './src/index.js'
	},
  output: {
		filename: 'fetch.browser.js',
		path: path.resolve(__dirname, 'dist'),
    library: 'fetch',
    libraryTarget: 'window',
    libraryExport: "default",
  }
}]
