import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootStoreProvider } from "../providers/RootStoreProvider";
import { InitAuth } from "./initAuth";
import { Header } from "@/shared/components/Layout/Header";
import { Roboto } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Интернет-магазин",
  description: "Каталог товаров",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RootStoreProvider>
          <InitAuth/>
          <Header/>
            {children}
        </RootStoreProvider>
      </body>
    </html>
  );
}
