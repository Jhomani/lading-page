const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");

module.exports = withCSS({
	cssModules: true,
	cssLoaderOptions: {
		importLoaders: 1,
		localIdentName: "[local]___[hash:base64:5]",
	},
	...withLess(
		withSass({
			lessLoaderOptions: {
				javascriptEnabled: true,
			},
			webpack: function (config) {
				config.module.rules.push({
					test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
					use: {
						loader: 'url-loader',
						options: {
							limit: 100000,
							name: '[name].[ext]',
						},
					},
				});
				return config;
			},
			env: {
				BACK_URL: 'https://bseniales.blockchainconsultora.com',
			}
		}),
	),
});
