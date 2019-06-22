module.exports = {
  siteMetadata: {
    title: `SiliSky`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
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
    // Passing paramaters (passed to apollo-link)
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Silisky",
        fieldName: "silisky",
        // Url to query from
        // url: 'https://hr8ytytxmi.execute-api.eu-central-1.amazonaws.com/development/graphql'
        url:
          "https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/graphql",
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "Github",
        fieldName: "github",
        // Url to query from
        // url: 'https://hr8ytytxmi.execute-api.eu-central-1.amazonaws.com/development/graphql'
        url: "https://api.github.com/graphql",
      },
    },
  ],
}
