import { Helmet } from "react-helmet-async";

function SEO({ title, description, image, url, type = "website" }) {
  const siteName = "Excellence Team";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDesc =
    "Excellence Team - Experts en Ingénierie Digitale, Cybersécurité et Infrastructure au Bénin. Nous transformons vos visions en solutions technologiques premium.";
  const siteUrl = "https://excellence-team.com";
  const defaultImage = "https://excellence-team.com/og-image.jpg"; // Placeholder for OG image

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={url ? `${siteUrl}${url}` : siteUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url ? `${siteUrl}${url}` : siteUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* Primary keywords */}
      <meta
        name="keywords"
        content="digital agency, bénin, cotonou, ingénierie logicielle, cybersécurité, développement web, mobile app, infrastructure réseau, pentest, excellence team"
      />
    </Helmet>
  );
}

export default SEO;
