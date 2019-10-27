/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        images: path.resolve(__dirname, 'src/images'),
        pages: path.resolve(__dirname, 'src/pages'),
        queries: path.resolve(__dirname, 'src/queries'),
        state: path.resolve(__dirname, 'src/state'),
        utils: path.resolve(__dirname, 'src/utils'),
        constants: path.resolve(__dirname, 'src/constants'),
        middlewares: path.resolve(__dirname, 'src/middlewares'),
        hooks: path.resolve(__dirname, 'src/hooks'),
        assets: path.resolve(__dirname, 'src/assets'),
      },
    },
  })
}

exports.createPages = ({ actions }) => {
  const { createRedirect } = actions

  createRedirect({
    fromPath: 'https://www.silisky.com/*',
    toPath: 'https://strove.io/:splat',
    isPermanent: true,
    force: true,
  })
  createRedirect({
    fromPath: 'https://www.silisky.com/*',
    toPath: 'https://strove.io/:splat',
    isPermanent: true,
    force: true,
  })
}
