import Header from "@components/Header";
import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";

import { RootStoreProvider } from "../providers/RootStoreProvider";

import { InitAuth } from "./initAuth";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Интернет-магазин",
  description: "Каталог товаров",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={roboto.variable}>
        <RootStoreProvider>
          <InitAuth />
          <Header />
          {children}
        </RootStoreProvider>
      </body>
    </html>
  );
}
