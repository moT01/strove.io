module.exports = {
  siteMetadata: {
    title: `SiliSky`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /logos/,
        },
      },
    },
    {
      resolve: "gatsby-remark-responsive-iframe",
      options: {
        wrapperStyle: "margin-bottom: 1rem",
      },
    },
    "gatsby-remark-prismjs",
    "gatsby-remark-autolink-headers",
    "gatsby-remark-copy-linked-files",
    "gatsby-remark-smartypants",
    {
      resolve: "gatsby-remark-images",
      options: {
        maxWidth: 1140,
        quality: 90,
        linkImagesToOriginal: false,
        backgroundColor: "#1e1e1e",
      },
    },
    {
      resolve: "gatsby-transformer-remark",
    },
    `gatsby-plugin-react-helmet`,
    "gatsby-transformer-json",
    "gatsby-plugin-emotion",
    `gatsby-plugin-sharp`,
    "gatsby-transformer-sharp",
    "gatsby-plugin-catch-links",
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        // icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
