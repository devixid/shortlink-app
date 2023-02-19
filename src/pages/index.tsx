import clsx from "clsx";
import type { AppContext } from "next/app";
import redaxios from "redaxios";

import { LinkForm } from "@/components/pages/home";
import { Cookie } from "@/helpers";
import type { ReturnDataTypes } from "@/hooks/useForm";

interface HomePageProps {
  uid: null | string;
}

function HomePage({ uid }: HomePageProps) {
  const handleOnSubmit = (data: ReturnDataTypes) => {
    console.log(data);
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

        <LinkForm onSubmit={handleOnSubmit} uid={uid || undefined} />
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

    return {
      props: {
        uid: getUID
      }
    };
  }

  return {
    props: {
      uid
    }
  };
}

export default HomePage;
