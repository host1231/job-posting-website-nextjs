import { Inter } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/AuthProvider";
import ReduxProvider from "@/components/ReduxProvider";
import { ThemeProvider } from "@/components/theme-provider";

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
    <html lang="en">
        <ReduxProvider>
          <AuthProvider>
            <body
              className={`${inter.variable} antialiased`}
            >
              <HeaderWrapper />
              <main>{children}</main>
              <Toaster />
            </body>
          </AuthProvider>
        </ReduxProvider>
    </html>
  );
}
