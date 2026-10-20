import type { Metadata, Viewport } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { UtilityBar } from "@/components/layout/UtilityBar";
import { jsonLd, siteGraph } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-lato",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Retirement Village Albany, Auckland | Highgrove",
    template: "%s | Highgrove",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_NZ",
    siteName: site.name,
    images: [{ url: "/images/grounds-apartments-lawn.jpg", width: 2400, height: 1597 }],
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true, address: true, email: true },
  other: {
    "geo.region": "NZ-AUK",
    "geo.placename": "Albany, Auckland",
    "geo.position": `${site.geo.lat};${site.geo.lng}`,
    ICBM: `${site.geo.lat}, ${site.geo.lng}`,
  },
  icons: { icon: "/images/logo-icon.png", apple: "/images/logo-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#F7F1EC",
};


export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NZ" data-scroll-behavior="smooth" className={`${playfair.variable} ${lato.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-100 rounded-full bg-teal px-5 py-3 font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <UtilityBar />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(siteGraph())}
        />
      </body>
    </html>
  );
}
