import type { AppProps } from "next/app";

import { Navbar } from "@/components";

import "@/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
