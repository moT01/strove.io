let activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

/* Netlify uses .env file to store envs */
require('dotenv').config({
  path:
    activeEnv === 'development'
      ? `.env.development`
      : activeEnv === 'opensource'
      ? '.env.opensource'
      : '.env',
})

module.exports = {
  siteMetadata: {
    title: `Strove`,
    description: `Move your development to the cloud. Access and run code anywhere using powerful linux servers.`,
    author: `@gatsbyjs`,
    siteUrl: `${process.env.SILISKY_URL}`,
  },
  plugins: [
    /* Used to create authenticated pages on the frontend */
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /logos/,
        },
      },
    },
    {
      resolve: 'gatsby-remark-responsive-iframe',
      options: {
        wrapperStyle: 'margin-bottom: 1rem',
      },
    },
    'gatsby-remark-autolink-headers',
    'gatsby-remark-copy-linked-files',
    'gatsby-remark-smartypants',
    {
      resolve: 'gatsby-remark-images',
      options: {
        maxWidth: 1140,
        quality: 90,
        linkImagesToOriginal: false,
        backgroundColor: '#1e1e1e',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
    },
    `gatsby-plugin-react-helmet`,
    'gatsby-transformer-json',
    'gatsby-plugin-emotion',
    `gatsby-plugin-sharp`,
    'gatsby-transformer-sharp',
    'gatsby-plugin-catch-links',
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Strove`,
        short_name: `Strove`,
        start_url: `/`,
        background_color: `#FFF`,
        theme_color: `#194F9D`,
        display: `minimal-ui`,
        icon: `src/images/strove.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: [
          'REDIRECT_URI',
          'SILISKY_URL',
          'SILISKY_ENDPOINT',
          'SILISKY_GRAPHQL_ENDPOINT',
          'SILISKY_WEBSOCKET_ENDPOINT',
          'GITHUB_CLIENT_ID',
          'GITLAB_CLIENT_ID',
          'BITBUCKET_CLIENT_ID',
          'BITBUCKET_CLIENT_SECRET',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-141223683-2',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: 1422829,
        sv: 6,
      },
    },
    // Todo: Use the plugin to handle redirects from other domains to strove.io
    `gatsby-plugin-netlify`,
  ],
}
