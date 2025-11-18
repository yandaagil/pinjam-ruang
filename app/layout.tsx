import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css";
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import { NuqsAdapter } from 'nuqs/adapters/next/app'

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster expand={true} richColors position="top-center" />
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
