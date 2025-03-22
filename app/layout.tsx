import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@fortawesome/fontawesome-free/css/all.css";
import Link from "next/link";
import "./globals.css";
import logo from "@/public/antiMykiLogo.png";
import { Button } from "@/components/ui/button";
import { PostHogProvider } from "@/components/PostHogProvider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Inspector Alert",
  description: "Keep up to date with the latest activities from inspectors.",
  icon: logo,
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main className="min-h-screen flex flex-col items-between">
              <div className="flex-1 w-full flex flex-col items-between">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                  <div className="w-full max-w-6xl flex justify-between items-center p-3 px-5 text-sm">
                    <div className="flex gap-2 justify-between w-full items-center">
                      <Link href="/">
                        <i className="fa-solid fa-home text-xl"></i>
                      </Link>
                      <div className="gap-4 flex">
                        <Button
                          asChild
                          size="sm"
                          variant={"report"}
                        >
                          <Link href="/report"><i className="fa-solid fa-exclamation-triangle mr-2"></i>Report</Link>
                        </Button>
                        <Button
                          asChild
                          size="sm"
                          variant={"default"}
                        >
                          <Link href="/dashboard"><i className="fa-solid fa-list mr-2"></i>Dashboard</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </nav>
                <div className="flex flex-col gap-20 max-w-6xl p-5 justify-between md:mx-auto md:w-full">
                  {children}
                </div>

                <footer className="w-full flex items-center justify-center border-t mt-auto text-center text-xs gap-8 py-6">
                  <p>Made with ❤ by Victor</p>
                </footer>
              </div>
            </main>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
