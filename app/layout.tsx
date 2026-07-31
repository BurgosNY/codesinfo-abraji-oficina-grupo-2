import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codesinfo-abraji-oficina-grupo-2.burgos.chatgpt.site"),
  title: "Evidência em pauta — laboratório de checagem",
  description: "Demonstração interativa com alegações simuladas e registros verificáveis do PubMed para apoiar a apuração jornalística.",
  openGraph: {
    title: "Evidência em pauta",
    description: "Da alegação à evidência: uma demonstração para apoiar a apuração jornalística em saúde.",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
