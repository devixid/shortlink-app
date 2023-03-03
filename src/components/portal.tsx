import type { ReactNode } from "react";
import { memo } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  id?: string;
}

function Portal({ children, id }: PortalProps) {
  if (typeof window === "undefined" || typeof document === "undefined")
    return null;

  const container = document.getElementById(id || "modal-root");

  if (container) {
    return createPortal(children, container);
  }

  return null;
}

export default memo(Portal);
