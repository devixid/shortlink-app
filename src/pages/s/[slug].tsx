import type { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";

import { BASE_URL } from "@/constants";
import { getShortlink, getShortlinkMetaData } from "@/services";
import clsx from "clsx";

type PageProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  forward_url?: string;
  slug: string;
  // eslint-disable-next-line react/no-unused-prop-types
  is_secret: boolean;
  metadata: any;
};

function LockedShortlink({ slug, metadata }: PageProps) {
  return (
    <>
      <NextSeo
        title={`[LOCKED] ${metadata?.title || "Locked Shortlink"}`}
        description={
          metadata?.description || "Description for locked shortlink"
        }
        additionalMetaTags={[
          {
            name: "keywords",
            content: metadata?.keywords?.join(", ") || "Shortlink App, Web App"
          }
        ]}
        openGraph={{
          title: `[LOCKED] ${metadata?.title || "Locked Shortlink"}`,
          description:
            metadata?.description || "Description for locked shortlink",
          url: `${BASE_URL}/s/${slug}`,
          type: metadata?.type || "website",
          locale: metadata?.language || "en",
          images: [
            {
              url:
                metadata?.image ||
                `${BASE_URL}/api/og?title=Locked%20Shortlink`,
              alt: "Primary OG Image",
              height: 630,
              width: 1200
            }
          ]
        }}
        twitter={{
          site: `${BASE_URL}/s/${slug}`,
          cardType: "summary_large_image"
        }}
        additionalLinkTags={[
          {
            rel: "icon",
            href: metadata?.icon || "/favicon.ico"
          }
        ]}
      />

      <div
        className={clsx(
          "container p-4 text-center",
          "min-h-screen",
          "flex flex-row items-center justify-center"
        )}
      >
        <h1>Link: {slug}</h1>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const { query } = context;

  const response: PageProps | null = await getShortlink(
    `${BASE_URL}/api/link/${query.slug}`
  )
    .then((res) => {
      if (res.status_code === 200) {
        return res.data;
      }

      return null;
    })
    .catch(() => null);

  if (response) {
    const { is_secret, slug, forward_url } = response;

    const getMetaData = await getShortlinkMetaData(
      `${BASE_URL}/api/metadata/${query.slug}`
    )
      .then((res) => res.data)
      .catch(() => null);

    if (response.is_secret) {
      return {
        props: {
          slug,
          is_secret,
          metadata: getMetaData
        }
      };
    }

    return {
      redirect: {
        destination: forward_url || "/",
        permanent: false
      }
    };
  }

  return {
    notFound: true
  };
};

export default LockedShortlink;
