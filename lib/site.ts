/** Site-wide settings, contact details and navigation. */

export const site = {
  name: "Highgrove Retirement Village",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://highgrove.co.nz",
  description:
    "A family owned and operated boutique retirement village in Albany, Auckland, alongside Patrick Ferry House hospital.",
  phone: { display: "09 444 6689", short: "444 6689", href: "tel:094446689", intl: "+64 9 444 6689" },
  tours: { name: "Carol", display: "0274 970 784", href: "tel:0274970784" },
  email: "enquiries@highgrove.co.nz",
  address: {
    street: "119 Albany Highway",
    alt: "47 Condor Place",
    suburb: "Unsworth Heights",
    city: "Albany",
    region: "Auckland",
    postcode: "0632",
    country: "NZ",
  },
  /** 119 Albany Highway (OpenStreetMap). */
  geo: { lat: -36.7602172, lng: 174.7072624 },
  hours: "Open to view Monday–Friday 10am–4pm, weekends by appointment",
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=119+Albany+Highway,+Unsworth+Heights,+Auckland",
  /** On-site hospital bed count. New ads say 77; the old About page said 74. */
  bedCount: 77,
} as const;

/** Campaign toggles. */
export const campaign = {
  /** Home page "$99 fixed weekly fee" panel. Set to false to hide it. */
  showOffer: true,
} as const;

export type NavLink = { label: string; href: string };
export type NavItem = NavLink | { label: string; key: string; children: NavLink[] };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Highgrove Village",
    key: "village",
    children: [
      { label: "Independent Living", href: "/independent-living" },
      { label: "Assisted Living", href: "/assisted-living" },
      { label: "Apartments", href: "/apartments" },
    ],
  },
  { label: "Patrick Ferry House", href: "/patrick-ferry-house" },
  { label: "Facilities", href: "/facilities" },
  {
    label: "About",
    key: "about",
    children: [
      { label: "About us", href: "/about" },
      { label: "Location", href: "/location" },
      { label: "FAQs", href: "/faqs" },
      { label: "Our Team", href: "/our-team" },
      { label: "Blog", href: "/blog" },
    ],
  },
  { label: "Contact", href: "/location#enquire" },
];

export const footerGroups: { heading: string; links: NavLink[] }[] = [
  {
    heading: "The village",
    links: [
      { label: "Independent living", href: "/independent-living" },
      { label: "Retirement apartments", href: "/apartments" },
      { label: "Assisted living", href: "/assisted-living" },
      { label: "Village facilities", href: "/facilities" },
    ],
  },
  {
    heading: "Care",
    links: [
      { label: "Patrick Ferry House", href: "/patrick-ferry-house" },
      { label: "Rest home & hospital care", href: "/patrick-ferry-house#care" },
      { label: "Respite & palliative care", href: "/patrick-ferry-house#care" },
      { label: "Premium rooms", href: "/patrick-ferry-house#premium" },
    ],
  },
  {
    heading: "About",
    links: [
      { label: "About Highgrove", href: "/about" },
      { label: "Our team", href: "/our-team" },
      { label: "FAQs", href: "/faqs" },
      { label: "Blog", href: "/blog" },
      { label: "Contact us", href: "/location#enquire" },
    ],
  },
];

/** Build a page title in the house format. */
export const pageTitle = (title: string) => `${title} | Highgrove Retirement Village, Albany`;
