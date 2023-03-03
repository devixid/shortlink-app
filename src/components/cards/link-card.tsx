import { BASE_URL } from "@/constants";
import { Copy, Notif } from "@/utils";
import clsx from "clsx";
import { memo, useRef, useState } from "react";

import { BsCheck2 } from "react-icons/bs";
import { VscCopy } from "react-icons/vsc";
import { HiOutlineTrash } from "react-icons/hi";

import { ModalConfirmation } from "../modals";

// import type { LinkCardProps } from "../types";

function LinkCard({
  _id,
  original_link,
  link_key,
  slug,
  className,
  onClickDelete,
  modal
}: LinkCardProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [showModalConfirmation, setShowModalConfirmation] =
    useState<boolean>(false);

  const ref = useRef<HTMLParagraphElement | null>(null);

  function handleCopyLink() {
    if (!ref.current) return;

    const content = ref.current.innerText;
    const copyToClipboard = Copy(content);

    if (copyToClipboard) {
      setIsCopied(true);
      Notif.success("Copied to clipboard");

      setTimeout(() => setIsCopied(false), 3000);
    }
  }

  return (
    <div
      id={`link-${_id}`}
      className={clsx(
        "rounded-lg border border-gray-300",
        "p-4 md:p-6",
        "flex flex-col lg:items-stretch lg:gap-y-4",
        className
      )}
    >
      <div className={clsx("flex flex-col gap-4 lg:flex-row")}>
        <section className={clsx("flex-1 lg:max-w-[calc(50%-16px)]")}>
          <h4 className={clsx("font-semibold text-slate-800", "mb-1")}>
            Shortlink
          </h4>
          <div className={clsx("flex w-full items-center justify-start gap-3")}>
            <p
              className={clsx("line-clamp-1")}
              ref={ref}
            >{`${BASE_URL}/s/${slug}`}</p>
            <button
              type="button"
              className={clsx(
                "h-[22px] min-w-[22px]",
                "flex items-center justify-center"
              )}
              title="copy url"
              onClick={() => handleCopyLink()}
            >
              {isCopied ? (
                <BsCheck2 className={clsx("h-5 w-5 text-green-500")} />
              ) : (
                <VscCopy className={clsx("h-5 w-5 text-slate-800")} />
              )}
            </button>
          </div>
        </section>

        <section className={clsx("flex-1 lg:max-w-[calc(50%-16px)]")}>
          <h4 className={clsx("font-semibold text-slate-800", "mb-1")}>Key</h4>
          <span>{link_key || "-"}</span>
        </section>
      </div>

      <div className={clsx("flex flex-col gap-4 lg:flex-row")}>
        <section className={clsx("flex-1 lg:max-w-[calc(50%-16px)]")}>
          <h4 className={clsx("font-semibold text-slate-800", "mb-1")}>
            Original URL
          </h4>
          <p className={clsx("line-clamp-1")}>{original_link}</p>
        </section>

        <section className={clsx("flex-1 lg:max-w-[calc(50%-16px)]")}>
          <h4 className={clsx("font-semibold text-slate-800", "mb-2")}>
            Action
          </h4>

          <div
            className={clsx(
              "flex-row-flex-wrap flex items-center justify-start gap-4"
            )}
          >
            <button
              type="button"
              className={clsx(
                "font-semibold text-red-500",
                "flex items-center justify-start gap-2"
              )}
              title="Delete shortlink"
              onClick={
                onClickDelete ||
                (() => {
                  setShowModalConfirmation(true);
                })
              }
            >
              <HiOutlineTrash className={clsx("h-5 w-5")} />
              <span className={clsx("whitespace-nowrap")}>Delete</span>
            </button>
          </div>
        </section>
      </div>

      <ModalConfirmation
        onClose={
          modal?.onClose ||
          (() => {
            setShowModalConfirmation(false);
          })
        }
        onConfirm={
          modal?.onConfirm ||
          (() => {
            setShowModalConfirmation(false);
          })
        }
        title="Are you sure?"
        open={modal?.open || showModalConfirmation}
        clickOutsideForCloseModal
      >
        <p>Are you sure you want to delete this shortlink?</p>
      </ModalConfirmation>
    </div>
  );
}

export default memo(LinkCard);
