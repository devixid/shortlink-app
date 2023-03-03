import type { INotyfOptions } from "notyf";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://devix-shortlink-app.vercel.app";

export const notyfOptions: Partial<INotyfOptions> = {
  dismissible: true,
  duration: 2000,
  position: {
    x: "center",
    y: "top"
  }
};
