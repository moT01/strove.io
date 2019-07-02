require('dotenv').config({
  path: process.env.NODE_ENV === 'development' ? `.env.development` : '.env',
})

module.exports = {
  siteMetadata: {
    title: `SiliSky`,
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
    'gatsby-remark-prismjs',
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
        name: `SiliSky`,
        short_name: `SiliSky`,
        start_url: `/`,
        background_color: `#FFF`,
        theme_color: `#194F9D`,
        display: `minimal-ui`,
        icon: `src/images/SiliSky3.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
