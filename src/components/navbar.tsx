import clsx from "clsx";
import { memo } from "react";
import Link from "next/link";

import type { IconType } from "react-icons";
import { AiOutlineGithub } from "react-icons/ai";
import { HiOutlineHome } from "react-icons/hi";

import { DevixLogo } from "@/assets";

interface NavbarLink {
  url: string;
  label: string;
  Icon: IconType;
  openInNewTab?: boolean;
}

function Navbar() {
  const baseIconSize = "h-6 w-6 md:h-5 md:w-5";
  const linkOnHover = "hover:text-gray-900 focus:text-gray-900";

  const linkLeft: NavbarLink[] = [
    {
      url: "/",
      label: "Home",
      Icon: HiOutlineHome
    }
  ];
  const linkRight: NavbarLink[] = [
    {
      url: "https://github.com/devixid/shortlink-app",
      label: "Source Code",
      Icon: AiOutlineGithub,
      openInNewTab: true
    }
  ];

  return (
    <div
      className={clsx(
        "fixed top-4 left-1/2 z-40 -translate-x-1/2",
        "w-full px-4"
      )}
    >
      <div
        className={clsx(
          "container h-16 px-4 md:h-20 md:px-6",
          "bg-white bg-opacity-75 backdrop-blur",
          "rounded-[32px] border border-gray-300",
          "flex flex-row items-center justify-center gap-x-6 md:gap-x-8 lg:gap-x-10"
        )}
      >
        <nav
          className={clsx(
            "flex flex-row items-center justify-start gap-x-4",
            "w-full"
          )}
        >
          {linkLeft.map(({ url, label, Icon, openInNewTab }, index) => {
            const key = index.toString();

            if (openInNewTab) {
              return (
                <Link
                  href={url}
                  key={key}
                  title={label}
                  className={clsx(
                    linkOnHover,
                    "flex flex-row items-center gap-x-2"
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className={baseIconSize} />
                  <span className={clsx("hidden md:inline")}>{label}</span>
                </Link>
              );
            }

            return (
              <Link
                href={url}
                title={label}
                key={key}
                className={clsx(
                  linkOnHover,
                  "flex flex-row items-center gap-x-2"
                )}
              >
                <Icon className={baseIconSize} />
                <span className={clsx("hidden md:inline")}>{label}</span>
              </Link>
            );
          })}
        </nav>

        <DevixLogo
          className={clsx("h-20 w-20 md:h-24 md:w-24", "text-slate-900")}
          title="Devix Logo"
          data-testid="test-devix-logo"
        />

        <nav
          className={clsx(
            "flex flex-row items-center justify-end gap-x-4",
            "w-full"
          )}
        >
          {linkRight.map(({ url, label, Icon, openInNewTab }, index) => {
            const key = index.toString();

            if (openInNewTab) {
              return (
                <Link
                  href={url}
                  key={key}
                  title={label}
                  className={clsx(
                    linkOnHover,
                    "flex flex-row items-center gap-x-2"
                  )}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className={baseIconSize} />
                  <span className={clsx("hidden md:inline")}>{label}</span>
                </Link>
              );
            }

            return (
              <Link
                href={url}
                title={label}
                key={key}
                className={clsx(
                  linkOnHover,
                  "flex flex-row items-center gap-x-2"
                )}
              >
                <Icon className={baseIconSize} />
                <span className={clsx("hidden md:inline")}>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

export default memo(Navbar);
