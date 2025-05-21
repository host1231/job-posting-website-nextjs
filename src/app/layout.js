import { Inter } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/providers/AuthProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Head from "next/head";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
})

export const metadata = {
  title: "HiJobsAZ",
  description: "İş axtarış proqramı",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ReduxProvider>
        <AuthProvider>
          <Head>
            <link rel="icon" href="https://vuxz9tznczckbg5g.public.blob.vercel-storage.com/Logo-lo6v2oUeBqG9OcMtA2GWbBAl2zQBC7.svg" />
          </Head> 
          <body
            className={`${inter.variable} antialiased`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <HeaderWrapper />
              <main>{children}</main>
              
              <Toaster />
            </ThemeProvider>
            <Analytics />
          </body>
        </AuthProvider>
      </ReduxProvider>
    </html>
  );
}
