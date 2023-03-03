/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { memo, useState } from "react";

import Portal from "../portal";

interface ModalConfirmationProps extends PropsWithChildren {
  onClose?: () => void;
  onConfirm?: () => void;
  additionalClassName?: string;
  modalContentClassName?: string;
  modalBodyClassName?: string;
  title?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  clickOutsideForCloseModal?: boolean;
  centeredTitle?: boolean;
  open?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  confirmButtonType?: "alert" | "info" | "success";
}

function ModalConfirmation({
  children,
  onClose,
  onConfirm,
  additionalClassName,
  modalBodyClassName,
  modalContentClassName,
  title,
  showHeader = true,
  showFooter = true,
  centeredTitle = true,
  open,
  clickOutsideForCloseModal,
  cancelButtonText,
  confirmButtonText,
  confirmButtonType
}: ModalConfirmationProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultOnClose = () => {
    setIsOpen((state) => !state);
  };

  const defaultOnConfirm = () => {
    // eslint-disable-next-line no-console
    console.log("Modal confirmed!");
    setIsOpen((state) => !state);
  };

  const getConfirmButtonType = (): string => {
    switch (confirmButtonType) {
      case "alert":
        return clsx(
          "text-white",
          "bg-red-500 hover:bg-red-600 focus:bg-red-600"
        );

      default:
        return clsx(
          "text-white",
          "bg-slate-800 hover:bg-slate-900 focus:bg-slate-900"
        );
    }
  };

  const baseButtonClassName = clsx("px-4 py-3 md:px-5 md:py-3.5", "rounded-lg");

  return (
    <Portal>
      {(open || isOpen) && (
        <div
          className={clsx(
            "bg-black bg-opacity-50",
            "fixed top-0 left-0 z-[60] h-full w-full",
            "flex flex-row items-center justify-center",
            "p-4 md:p-6",
            additionalClassName
          )}
          onClick={() => {
            if (clickOutsideForCloseModal) {
              (onClose || defaultOnClose)();
            }
          }}
        >
          <div
            className={clsx(
              "bg-white",
              "modal-content md:max-w-xl",
              "rounded-lg",
              modalContentClassName
            )}
            onClick={(event) => {
              if (clickOutsideForCloseModal) {
                event.stopPropagation();
              }
            }}
          >
            {showHeader && (
              <div className={clsx("p-4 pb-2 md:p-6 md:pb-2")}>
                <h4
                  className={clsx(
                    centeredTitle && "text-center",
                    "text-lg font-semibold text-slate-800 md:text-xl"
                  )}
                >
                  {title || "Your title here"}
                </h4>
              </div>
            )}

            <div
              className={clsx(
                "p-4 md:p-6",
                showHeader && "pt-2 md:pt-2",
                showFooter && "pb-2 md:pb-2",
                modalBodyClassName || "text-center"
              )}
            >
              {children || (
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veritatis, inventore recusandae iste quae possimus mollitia!
                </p>
              )}
            </div>

            {showFooter && (
              <div
                className={clsx(
                  "p-4 pt-2 md:p-6 md:pt-2",
                  "flex flex-row items-center justify-center gap-4"
                )}
              >
                <button
                  type="button"
                  className={clsx(
                    baseButtonClassName,
                    "bg-transparent text-slate-800 hover:bg-gray-300 focus:bg-gray-300",
                    "border border-gray-300"
                  )}
                  title="Close modal"
                  onClick={() => (onClose || defaultOnClose)()}
                >
                  {cancelButtonText || "Cancel"}
                </button>

                <button
                  type="button"
                  className={clsx(baseButtonClassName, getConfirmButtonType())}
                  title={confirmButtonText || "Confirm"}
                  onClick={() => (onConfirm || defaultOnConfirm)()}
                >
                  {confirmButtonText || "Confirm"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Portal>
  );
}

export default memo(ModalConfirmation);
