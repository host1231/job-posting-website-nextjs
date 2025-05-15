import { Inter } from "next/font/google";
import "./globals.css";
import HeaderWrapper from "@/components/HeaderWrapper";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/components/providers/AuthProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";

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
          </body>
        </AuthProvider>
      </ReduxProvider>
    </html>
  );
}
