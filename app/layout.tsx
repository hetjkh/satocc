import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Home/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { MusicProvider } from "@/contexts/MusicContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Satocci – Skip the Line & Shop Smart",
  description:
    "Satocci is a seamless scan-and-pay solution that lets shoppers skip checkout lines, pay instantly, and enjoy faster, smarter, and sustainable shopping experiences.",
  keywords: [
    "Satocci",
    "scan and pay app",
    "skip the line shopping",
    "smart retail checkout",
    "seamless shopping solution",
    "mobile payment app",
    "cashless checkout",
    "retail technology",
    "sustainable shopping",
    "future of retail",
  ],
  authors: [{ name: "Satocci Team", url: "https://satocci.com" }],
  creator: "Satocci",
  publisher: "Satocci Finance AB",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
    other: [
      {
        rel: "icon",
        url: "/favicon.png",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: "Satocci – Skip the Line & Shop Smart",
    description:
      "Discover Satocci’s scan-and-pay technology for seamless checkout. Skip lines, pay instantly, and enjoy a faster, smarter, and eco-friendly shopping experience.",
    url: "https://satocci.com",
    siteName: "Satocci",
    images: [
      {
        url: "https://satocci.com/preview.jpg", // Replace with your preview image URL
        width: 1200,
        height: 630,
        alt: "Satocci App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satocci – Skip the Line & Shop Smart",
    description:
      "Satocci makes shopping faster and smarter with instant mobile payments. Scan, pay, and skip the line effortlessly.",
    images: ["https://satocci.com/preview.jpg"], // Replace with actual image
  },
  metadataBase: new URL("https://satocci.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class" // adds `class="dark"` or `class="light"` on <html>
          defaultTheme="system" // can be "light" | "dark" | "system"
          enableSystem
          disableTransitionOnChange
        >
          <MusicProvider>
            <NavBar />
            {children}
          </MusicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
