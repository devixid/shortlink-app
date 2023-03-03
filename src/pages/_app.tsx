import type { DefaultSeoProps } from "next-seo";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

import "@/style.css";
import "notyf/notyf.min.css";

export default function App({ Component, pageProps }: AppProps) {
  const defaultSeo: DefaultSeoProps = {
    title: "Devix.id - Shortlink App",
    description:
      "Simple Shortlink App by Devix.id, build using Next.js, TailwindCSS, and MongoDB for database",
    themeColor: "#1e293b",
    openGraph: {
      title: "Devix.id - Shortlink App",
      description:
        "Simple Shortlink App by Devix.id, build using Next.js, TailwindCSS, and MongoDB for database",
      url: `${process.env.NEXT_PUBLIC_BASE_URL || ""}`,
      type: "website",
      locale: "en",
      images: [
        {
          url: `${
            process.env.NEXT_PUBLIC_BASE_URL || ""
          }/api/og?title=Devix.id - Shortlink App`,
          alt: "Primary OG Image",
          height: 630,
          width: 1200
        }
      ]
    },
    twitter: {
      site: `${process.env.NEXT_PUBLIC_BASE_URL || ""}`,
      cardType: "summary_large_image",
      creator: "@andrianfaa"
    } as {
      [key: string]: string;
    }
  };

  return (
    <>
      <DefaultSeo {...defaultSeo} />
      <Component {...pageProps} />
    </>
  );
}
