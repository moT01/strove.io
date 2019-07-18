/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import favicon16 from 'images/favicons/favicon-16.png'
import favicon32 from 'images/favicons/favicon-32.png'
import favicon57 from 'images/favicons/favicon-57.png'
import favicon60 from 'images/favicons/favicon-60.png'
import favicon64 from 'images/favicons/favicon-64.png'
import favicon70 from 'images/favicons/favicon-70.png'
import favicon72 from 'images/favicons/favicon-72.png'
import favicon76 from 'images/favicons/favicon-76.png'
import favicon96 from 'images/favicons/favicon-96.png'
import favicon114 from 'images/favicons/favicon-114.png'
import favicon120 from 'images/favicons/favicon-120.png'
import favicon144 from 'images/favicons/favicon-144.png'
import favicon150 from 'images/favicons/favicon-150.png'
import favicon152 from 'images/favicons/favicon-152.png'
import favicon160 from 'images/favicons/favicon-160.png'
import favicon180 from 'images/favicons/favicon-180.png'
import favicon192 from 'images/favicons/favicon-192.png'
import favicon310 from 'images/favicons/favicon-310.png'
import faviconIco from 'images/favicons/favicon.ico'

function SEO({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
      link={[
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: `${favicon16}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: `${favicon32}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '57x57',
          href: `${favicon57}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '60x60',
          href: `${favicon60}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '64x64',
          href: `${favicon64}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '70x70',
          href: `${favicon70}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '72x72',
          href: `${favicon72}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '76x76',
          href: `${favicon76}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '96x96',
          href: `${favicon96}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '114x114',
          href: `${favicon114}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '120x120',
          href: `${favicon120}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '144x144',
          href: `${favicon144}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '150x150',
          href: `${favicon150}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '152x152',
          href: `${favicon152}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '160x160',
          href: `${favicon160}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '180x180',
          href: `${favicon180}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          href: `${favicon192}`,
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '310x310',
          href: `${favicon310}`,
        },
        { rel: 'shortcut icon', type: 'image/png', href: `${faviconIco}` },
      ]}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

export default SEO
