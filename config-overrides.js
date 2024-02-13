const webpack = require("webpack")

module.exports = function override (config, env) {
    console.log('override', config.resolve.fallback)
    config.resolve.fallback = {
        ...config.resolve.fallback,
        "url": require.resolve("url/"), // url
        "os": require.resolve("os-browserify/browser"), // os-browserify
        "http": require.resolve("stream-http"), // stream-http
        "https": require.resolve("https-browserify"), // https-browserify
        "assert": require.resolve("assert/"), // assert
        "stream": require.resolve("stream-browserify"), // stream-browserify
        "buffer": require.resolve("buffer/") // buffer
    }
    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]

    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]
    
    config.plugins.forEach((plugin) => {
      if (plugin.options
        && plugin.options.filename
        && plugin.options.filename == 'static/css/[name].[contenthash:8].css'
        && plugin.options.chunkFilename
        && plugin.options.chunkFilename == 'static/css/[name].[contenthash:8].chunk.css'
      ) {
        console.log('>>> CSS Plugin founded. Fix him')
        // css no hash in filename
        plugin.options.filename = 'static/css/[name].css'
        plugin.options.chunkFilename = 'static/css/[name].chunk.css'
        console.log(plugin)
      }
    })
    config.output.filename = 'static/js/[name].js';
    config.output.chunkFilename = 'static/js/[name].chunk.js';

    return config
}