const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.argv[process.argv.indexOf('--mode') + 1] === 'production';

module.exports = {
	entry: "./src/index.js",
	mode: "development",
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: { presets: ["@babel/env"] }
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"]
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader',
					'image-webpack-loader'
				]
			}
		]
	},
	resolve: { 
		extensions: ["*", ".js", ".jsx"],
		modules: [
			path.resolve('./src/api'),
			path.resolve('./node_modules')
		] 
	},
	output: {
		path: path.resolve(__dirname, "dist/"),
		...(!isProduction && { publicPath: "http://localhost:3000/"}),
		filename: "bundle.js"
	},
	devServer: {
		contentBase: path.join(__dirname, "public/"),
		port: 3000,
		publicPath: "http://localhost:3000/",
		//hotOnly: true,
		hot: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new CopyPlugin([
			{ from: 'public', to: '' }
		])
	]
};