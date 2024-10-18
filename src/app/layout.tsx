import { ThemeProvider } from "@/Components/ThemeProvider";
import Providers from "@/Components/Providers";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
import "./prosemirror.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Medium Clone",
  description: "Full Stack Next.JS Medium Clone"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark
      }}
    >
      <html lang="en" className="scroll-smooth" suppressHydrationWarning>
        <body className={`flex h-screen flex-col`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <Providers>
              <Navbar />
              <main className="grow">
                {children}
              </main>
              <Footer />
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
};