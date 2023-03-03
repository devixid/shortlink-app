function Copy(content: string): boolean {
  if (typeof window === "undefined" || typeof document === "undefined")
    return false;

  function copyWithTextarea() {
    const textarea = document.createElement("textarea");

    textarea.innerHTML = content;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, content.length);
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }

  if ("navigator" in window) {
    if ("clipboard" in window.navigator) {
      window.navigator.clipboard.writeText(content);
      return true;
    }

    copyWithTextarea();
    return true;
  }

  copyWithTextarea();
  return true;
}

export default Copy;
