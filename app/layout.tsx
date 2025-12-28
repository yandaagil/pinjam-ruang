import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css";
import { Toaster } from 'sonner';
import Providers from "./providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: "Sistem Pinjam Ruang",
  description: "Sistem untuk meminjam ruang",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.className} suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <Toaster expand={true} position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
