import clsx from "clsx";
import type { AppContext } from "next/app";
import { useMemo, useState } from "react";
import redaxios from "redaxios";

import { LinkCard } from "@/components/cards";
import { LinkForm } from "@/components/pages/home";
import { BASE_URL } from "@/constants";
import { Cookie } from "@/helpers";
import { useFetch } from "@/hooks";
import type { ReturnDataTypes } from "@/hooks/useForm";
import type { CreateShortlinkData } from "@/services";
import { createShortlink, deleteShortlink } from "@/services";

interface LinkResponseTypes {
  _id: string;
  original_link: string;
  slug: string;
  is_secret: boolean;
  key: string;
}

function HomePage() {
  const { data, refetch, isLoading } =
    useFetch<HttpResponse<LinkResponseTypes[]>>("/api/link");
  const links: LinkResponseTypes[] = useMemo(() => data?.data || [], [data]);

  const [deleteId, setDeleteId] = useState<string>("");
  const [showModalConfirmation, setShowModalConfirmation] =
    useState<boolean>(false);

  const handleOnSubmit = async (
    formData: ReturnDataTypes,
    reset: () => void
  ) => {
    await createShortlink(
      `${BASE_URL}/api/link`,
      formData as unknown as CreateShortlinkData
    ).then((res) => {
      if (res?.status_code === 201) {
        refetch();
        reset();
      }
    });
  };

  const onClickDelete = async () => {
    if (!deleteId) return;

    await deleteShortlink(`${BASE_URL}/api/link/${deleteId}`).then((res) => {
      if (res.status_code === 200) {
        setShowModalConfirmation(false);
        refetch();
      }
    });
  };

  return (
    <>
      <header className={clsx("bg-gray-50", "pt-24 md:pt-28 lg:pt-32")}>
        <div className={clsx("container relative p-4 md:p-6")}>
          <h1
            className={clsx(
              "text-4xl font-bold tracking-tight text-slate-800 md:text-5xl",
              "mb-2"
            )}
          >
            Shortlink App.
          </h1>

          <span>
            By{" "}
            <span
              className={clsx(
                "bg-slate-900 text-xs font-semibold text-white",
                "rounded py-1 px-2"
              )}
            >
              Devix.id
            </span>
          </span>
        </div>
      </header>

      <div
        id="background-gradient"
        className={clsx("relative w-full", "flex items-center")}
      >
        <hr
          className={clsx(
            "border-0",
            "h-[1px] w-full bg-gray-300",
            "absolute left-1/2 top-[55%] z-0 -translate-x-1/2"
          )}
        />

        <LinkForm onSubmit={handleOnSubmit} isLoading={isLoading} />
      </div>

      <div
        className={clsx(
          "container p-4 md:p-6",
          "flex flex-col items-center justify-center gap-4"
        )}
      >
        {links.map(({ _id, is_secret, original_link, slug, key: linkKey }) => (
          <LinkCard
            key={_id}
            _id={_id}
            is_secret={is_secret}
            original_link={original_link}
            slug={slug}
            link_key={linkKey}
            className={clsx("w-full")}
            onClickDelete={() => {
              setDeleteId(_id);
              setShowModalConfirmation(true);
            }}
            modal={{
              open: showModalConfirmation,
              onConfirm: onClickDelete,
              onClose: () => {
                setDeleteId("");
                setShowModalConfirmation(false);
              }
            }}
          />
        ))}
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: AppContext["ctx"]) {
  const { req, res } = ctx;
  const uid = Cookie.getOne("uid", { req, res });

  if (!uid) {
    const getUID = await redaxios
      .get(`${process.env.BASE_URL}/api/uid`)
      .then((result) => result.data.data.uid || null)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);

        return null;
      });

    if (getUID) {
      Cookie.set("uid", getUID, {
        req,
        res
      });
    }
  }

  return {
    props: {}
  };
}

export default HomePage;
