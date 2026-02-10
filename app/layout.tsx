import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/context/BookingContext";
import BookingModal from "@/components/BookingModal";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CamShoot | We Shoot the Moment, We Deliver the Emotion",
  description: "Professional cinematography and photography services by CamShoot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <BookingProvider>
          <Header />
          <BookingModal />
          {children}
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
