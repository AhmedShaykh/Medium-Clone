import { ThemeProvider } from "@/Components/ThemeProvider";
import Providers from "@/Components/Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import type { Metadata } from "next";
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
              <main className="grow">
                {children}
              </main>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
};