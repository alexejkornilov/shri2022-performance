// svgo.config.js
module.exports = {
    plugins: [
        {
            name: "removeViewBox",
            active: false,
        },
        {
            name: "addAttributesToSVGElement",
            params: {
                attributes: [{xmlns: "http://www.w3.org/2000/svg"}],
            },
        },
    ],
};