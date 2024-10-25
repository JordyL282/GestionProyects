import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider"


const poppins = Poppins({ subsets: ["latin"], weight: ["200","400","500", "800"] });

export const metadata: Metadata = {
  title: "Gestion de Proyectos",
  description: "Seminario de privados",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={poppins.className}>
      <ThemeProvider
            attribute="class"
            enableSystem
            disableTransitionOnChange
          > 
        {children}
      </ThemeProvider>  
      </body>
    </html>
    </ClerkProvider>

  );
}
