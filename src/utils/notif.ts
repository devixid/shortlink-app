import type { INotyfOptions } from "notyf";
import { Notyf } from "notyf";

function init(): null | Notyf {
  if (typeof window !== "undefined") {
    const initNotyf = new Notyf({
      // dismissible: true,
      position: {
        x: "center",
        y: "top"
      }
    });

    return initNotyf;
  }

  return null;
}

const notif = {
  success: (payload: string | Partial<INotyfOptions>) =>
    init()?.success(payload),
  error: (payload: string | Partial<INotyfOptions>) => init()?.error(payload)
};

export default notif;
