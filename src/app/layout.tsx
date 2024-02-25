import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({weight:["300"], subsets:["latin"]});

export const metadata: Metadata = {
  title: "YASBC",
  description: "Yet Another Solana Balance Fetcher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
