const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');


var templateFunction = function (data) {
	var shared = '.ico_comm {display:block;background:url(I) no-repeat;}'
		.replace('I', data.sprites[0].image);

	var perSprite = data.sprites.map(function (sprite) {
		return '.N {width:Wpx;height:Hpx;background-position:Xpx Ypx;}'
			.replace('N', sprite.name)
			.replace('W', sprite.width)
			.replace('H', sprite.height)
			.replace('X', sprite.offset_x)
			.replace('Y', sprite.offset_y);
	}).join('\n');

	return shared + '\n' + perSprite;
};


module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use:  [ "style-loader" , {loader : "css-loader", options: {minimize: true} } ]
			},
			{
				test: /\.scss$/,
				use:  [ "style-loader" , "css-loader" , "sass-loader" ]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [ "file-loader" ]
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, "./dist/"),
		port: 8000
	},
	resolve: {
		modules: ["node_modules", "spritesmith-generated"]
	},
	plugins: [
		//new HtmlWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: 'Project Demo',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			template: './src/index.html'
		}),
		new SpritesmithPlugin({
			src: {
				cwd: path.resolve(__dirname, 'src/ico'),
				glob: '*.png'
			},
			target: {
				image: path.resolve(__dirname, 'src/images/sprite.png'),
				// css: path.resolve(__dirname, 'src/sprite.scss')
				css: [
					[path.resolve(__dirname, 'src/sprite.scss'), {
						format: 'function_based_template'
					}]
				]
			},
			customTemplates: {
				'function_based_template': templateFunction
			},
			//retina: '@2x',
			spritesmithOptions: {
				padding: 5
			},
			apiOptions: {
				cssImageRef: "./images/sprite.png"
			}
		})
	]
};