import { AuthContextProvider } from "@/auth.context";
import ResponsiveTemplate from "@/components/template/ResponsiveTemplate";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <AuthContextProvider>
        <ResponsiveTemplate>
        <Component {...pageProps} />
        </ResponsiveTemplate>
    </AuthContextProvider>
      <Script src="https://pay.nicepay.co.kr/v1/js/"></Script>
    </>
    );
}
