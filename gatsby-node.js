/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, "src/components"),
        images: path.resolve(__dirname, "src/images"),
        pages: path.resolve(__dirname, "src/pages"),
        queries: path.resolve(__dirname, "src/queries"),
        state: path.resolve(__dirname, "src/state"),
        utils: path.resolve(__dirname, "src/utils"),
        constants: path.resolve(__dirname, "src/constants"),
      },
    },
  })
}
