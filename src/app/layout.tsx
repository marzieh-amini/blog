import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import localFont from "next/font/local";
import "./globals.css";
import { Footer, Header } from "@/components";
import { ToastContainer } from "react-toastify";
import { Providers } from "./providers";
const inter = localFont({
  src: "../assets/fonts/IRANSans.ttf",
});

export const metadata: Metadata = {
  title: { default: "blog", template: "blog | %s" },
  description: "this is a blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col flex-1 h-[100vh]">
            <Header />
            <main className="flex-col flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
