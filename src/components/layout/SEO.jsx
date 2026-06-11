import { Helmet } from "react-helmet-async";

function SEO({
  title,
  description,
  image,
  url,
  type = "website",
  teamMembers = [],
}) {
  const siteName = "Excellence Team";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDesc =
    "Excellence Team - Experts en Ingénierie Digitale, Cybersécurité et Infrastructure au Bénin. Nous transformons vos visions en solutions technologiques premium.";
  const siteUrl =
    import.meta.env.VITE_SITE_URL || "https://team-d-excellence.vercel.app";
  const defaultImage =
    "https://res.cloudinary.com/dla8wr5qj/image/upload/v1775957944/pomelli_creative_image_9_16_0412_pdumcn.png";
  const canonicalUrl = url ? `${siteUrl}${url}` : siteUrl;

  const validTeamMembers = teamMembers.filter(
    (member) => member?.portfolio && member.portfolio !== "#"
  );

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: defaultImage,
    description: description || defaultDesc,
    member: validTeamMembers.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      image: member.image,
      description: member.specialty,
      sameAs: [member.portfolio],
      url: member.portfolio,
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: description || defaultDesc,
    inLanguage: "fr",
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={canonicalUrl} />
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

      {/* Structured data for better team profile indexing */}
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
}

export default SEO;
