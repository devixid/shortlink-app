/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from "clsx";
import { memo, useEffect, useRef, useState } from "react";

import { Button, Checkbox } from "@/components/atoms";
import { useForm } from "@/hooks";
import type { ReturnDataTypes } from "@/hooks/useForm";

interface LinkFormProps {
  isLoading?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (data: ReturnDataTypes, reset: () => void) => void;
  uid?: string;
}

function LinkForm({ isLoading, onSubmit, uid }: LinkFormProps) {
  const [isSecret, setIsSecret] = useState<boolean>(false);
  const { register, data, setForm, reset } = useForm();

  const ref = useRef<HTMLInputElement | null>(null);

  const handleResetForm = () => {
    reset();
    setIsSecret(false);
  };

  const labelStyle = "text-slate-800 font-medium cursor-pointer";

  useEffect(() => {
    if (!ref.current) return;

    if (isSecret) {
      ref.current.focus();
    } else {
      setForm("key", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSecret]);

  return (
    <div className={clsx("container relative z-10 p-4 md:p-6")}>
      {uid && <small className="mb-4 inline-block text-xs">uid: {uid}</small>}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({ ...data, is_secret: isSecret }, handleResetForm);
        }}
        className={clsx(
          "w-full bg-white p-4 lg:p-6",
          "rounded-lg border border-gray-300",
          "flex flex-col gap-y-4 lg:gap-y-6"
        )}
      >
        <div className={clsx("flex flex-col gap-y-4 lg:flex-row lg:gap-x-6")}>
          {/* Input URL */}
          <div className={clsx("flex w-full flex-col gap-y-2")}>
            <label className={clsx(labelStyle)} htmlFor="input@url">
              URL
            </label>
            <input
              {...register("url", {
                type: "url",
                id: "input@url",
                className: clsx("input-base"),
                placeholder: "https://www.example.com",
                required: true,
                disabled: isLoading
              })}
            />
          </div>

          {/* Input Slug */}
          <div className={clsx("flex w-full flex-col gap-y-2")}>
            <label className={clsx(labelStyle)} htmlFor="input@slug">
              Slug / Alias (optional)
            </label>
            <input
              {...register("slug", {
                type: "text",
                id: "input@slug",
                className: clsx("input-base"),
                placeholder: "example-slug",
                disabled: isLoading
              })}
            />
          </div>

          {/* Secret Toggler 1 */}
          <div
            className={clsx(
              "flex w-auto flex-row-reverse items-center justify-end gap-x-3",
              "lg:hidden lg:flex-col lg:items-center lg:justify-center lg:gap-y-4"
            )}
          >
            <label
              className={clsx(labelStyle, "whitespace-nowrap")}
              htmlFor="input@secret"
            >
              is secret?
            </label>

            <Checkbox
              id="input@secret"
              type="checkbox"
              name="is_secret"
              className="rounded"
              onChange={() => setIsSecret((prevState) => !prevState)}
              disabled={isLoading}
              checked={isSecret}
            />
          </div>

          {/* Input key */}
          <div
            className={clsx(
              "w-full flex-col gap-y-2",
              isSecret ? "flex" : "hidden"
            )}
          >
            <label className={clsx(labelStyle)} htmlFor="input@key">
              Key
            </label>
            <input
              {...register("key", {
                type: "text",
                id: "input@key",
                ref,
                className: clsx("input-base"),
                placeholder: "Key",
                required: isSecret,
                disabled: isLoading
              })}
            />
          </div>
        </div>

        <div className="flex flex-row-reverse items-center justify-end lg:gap-x-6">
          {/* Secret Toggler 2 */}
          <div
            className={clsx(
              "hidden w-auto flex-row-reverse items-center justify-end gap-x-3",
              "lg:flex lg:items-center"
            )}
          >
            <label
              className={clsx(labelStyle, "whitespace-nowrap")}
              htmlFor="input@secret"
            >
              is secret?
            </label>
            <Checkbox
              id="input@secret"
              type="checkbox"
              disabled={isLoading}
              name="is_secret"
              className="rounded"
              onChange={() => setIsSecret((prevState) => !prevState)}
              checked={isSecret}
            />
          </div>

          <Button
            type="submit"
            className={clsx("w-full lg:w-auto lg:min-w-[175px]")}
            disabled={!data.url || isLoading}
            title={isLoading ? "Loading..." : "Create Shortlink"}
          >
            Create Shortlink
          </Button>
        </div>
      </form>
    </div>
  );
}

export default memo(LinkForm);
