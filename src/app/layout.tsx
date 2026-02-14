import type { Metadata } from "next";
import Providers from "@/components/Providers";
import { Geist, Geist_Mono } from "next/font/google";
import { dark } from "@clerk/themes";
import { ClerkProvider, SignIn, SignOutButton, SignUpButton } from "@clerk/nextjs";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ai Code Editor",
  icons: '/logo.svg',
  description: "Ai code editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >

          <Providers>
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider >
  );
}
