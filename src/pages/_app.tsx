import { AuthContextProvider } from "@/auth.context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ResponsiveTemplate from "@/components/template/ResponsiveTemplate";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ResponsiveTemplate>
        <Component {...pageProps} />
      </ResponsiveTemplate>
    </AuthContextProvider>
  );
}
