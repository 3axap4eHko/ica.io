const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.NODE_ENV === 'develpment',
});

module.exports = withBundleAnalyzer({
  publicRuntimeConfig: {
    yelpBase: 'https://api.yelp.com/',
    yelpId: process.env.YELP_ID,
    yelpKey: process.env.YELP_KEY,
  },
  webpack: (config, { }) => {

    config.module.rules.push({ test: /\.(svg|jpg|png|gif)$/, loader: 'url-loader', options: { name: 'images/[name].[ext]', outputPath: 'static' } });
    config.module.rules.push({ test: /\.(ttf|eot|woff|woff2)$/, loader: 'url-loader', options: { name: 'fonts/[name].[ext]', outputPath: 'static' } });

    return config;
  },
});
