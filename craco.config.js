const CracoRawLoaderPlugin = require("@baristalabs/craco-raw-loader");

module.exports = {
    plugins: [
        {
            plugin: CracoRawLoaderPlugin,
            options: {
                test: /\.(vert|glsl|frag)$/,
            }
        }
    ]
};
