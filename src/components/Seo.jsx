import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://www.excellenceteam.site'
const DEFAULT_TITLE = 'Excellence Team — Collectif d’ingénieurs & designers à Lokossa'
const DEFAULT_DESC =
  'Excellence Team conçoit, développe et met en production des applications web, SaaS, IA et infrastructures cloud. Collectif de 11 personnes à Lokossa, Bénin.'
const DEFAULT_OG = '/og.png'

export default function Seo({
  title,
  description = DEFAULT_DESC,
  path = '/',
  image = DEFAULT_OG,
  type = 'website',
  jsonLd,
}) {
  const fullTitle = title ? `${title} — Excellence Team` : DEFAULT_TITLE
  const url = SITE_URL + path
  const ogImage = image.startsWith('http') ? image : SITE_URL + image

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Excellence Team" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
