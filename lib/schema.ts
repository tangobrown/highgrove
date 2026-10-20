/** schema.org structured data (JSON-LD) for the village, Patrick Ferry House and page breadcrumbs. */
import { absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/site";

const ORG_ID = absoluteUrl("/#organization");
const PFH_ID = absoluteUrl("/patrick-ferry-house#nursinghome");
const WEBSITE_ID = absoluteUrl("/#website");

const address = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.city,
  addressRegion: site.address.region,
  postalCode: site.address.postcode,
  addressCountry: site.address.country,
};

const geo = { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng };

const areaServed = ["Albany", "Unsworth Heights", "North Shore", "Auckland"].map((name) => ({ "@type": "Place", name }));

export const careServices = [
  "Rest home care",
  "Hospital-level care",
  "Respite care",
  "Palliative care",
  "Rehabilitation and recovery care",
  "Day care",
];

/** The village itself. Rendered on every page from the root layout. */
export const organizationSchema = {
  "@type": ["SeniorLivingCommunity", "LocalBusiness"],
  "@id": ORG_ID,
  name: site.name,
  alternateName: "Highgrove Village",
  description: site.description,
  url: absoluteUrl("/"),
  telephone: site.phone.intl,
  email: site.email,
  image: absoluteUrl("/images/grounds-apartments-lawn.jpg"),
  logo: absoluteUrl("/images/logo-wide.png"),
  address,
  geo,
  hasMap: site.mapsUrl,
  areaServed,
  priceRange: "$$",
  knowsAbout: ["Retirement village living", "Independent living", "Assisted living", ...careServices],
  subOrganization: { "@id": PFH_ID },
  memberOf: [
    { "@type": "Organization", name: "Retirement Villages Association of New Zealand" },
    { "@type": "Organization", name: "New Zealand Aged Care Association" },
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: absoluteUrl("/"),
  name: site.name,
  inLanguage: "en-NZ",
  publisher: { "@id": ORG_ID },
};

/** Patrick Ferry House — the on-site rest home and hospital. */
export const nursingHomeSchema = {
  "@context": "https://schema.org",
  "@type": "NursingHome",
  "@id": PFH_ID,
  name: "Patrick Ferry House",
  description: `Patrick Ferry House is a ${site.bedCount}-bed rest home and hospital at Highgrove Retirement Village in Albany, Auckland, offering day, respite, rehabilitation and recovery, rest home, hospital-level and palliative care.`,
  url: absoluteUrl("/patrick-ferry-house"),
  telephone: site.phone.intl,
  email: site.email,
  image: absoluteUrl("/images/pfh-building.jpg"),
  address,
  geo,
  areaServed,
  parentOrganization: { "@id": ORG_ID },
  knowsAbout: careServices,
  memberOf: { "@type": "Organization", name: "New Zealand Aged Care Association" },
};

export function siteGraph() {
  return { "@context": "https://schema.org", "@graph": [organizationSchema, websiteSchema] };
}

export function breadcrumbSchema(crumbs: { label: string; href?: string }[], currentPath: string) {
  // Unlinked group labels (e.g. "Highgrove Village") have no page of their own, so leave them out.
  const items = crumbs.filter((c, i) => c.href || i === crumbs.length - 1);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absoluteUrl(i === items.length - 1 ? currentPath : c.href!),
    })),
  };
}

/** Render a schema object as a JSON-LD script tag's inner HTML (escapes "<" for safety). */
export const jsonLd = (data: unknown) => ({ __html: JSON.stringify(data).replace(/</g, "\\u003c") });
