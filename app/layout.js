import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./component/sessionWrapper";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Site metadata
export const metadata = {
  title: "AI Fitness Buddy",
  description: "Your personal AI-powered fitness companion.",
};

// Root layout component
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full bg-slate-950`}
      >
        <SessionWrapper>
          {/* Site-wide Navigation */}
          <Navbar />

          {/* Main Page Content */}
          <main className="pt-16 px-4 sm:px-6 lg:px-8">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
