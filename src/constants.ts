import type { INotyfOptions } from "notyf";

export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export const notyfOptions: Partial<INotyfOptions> = {
  dismissible: true,
  duration: 2000,
  position: {
    x: "center",
    y: "top"
  }
};
