
"use client";
import type { Metadata } from "next";
import { useState, useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Presentation",
  description: "AI-powered bilingual presentation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const savedLang = localStorage.getItem("lang");
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleLang = () => {
    const nextLang = lang === "en" ? "kr" : "en";
    setLang(nextLang);
    localStorage.setItem("lang", nextLang);
  };

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <button onClick={toggleLang} style={{ position: 'fixed', top: 10, right: 10, zIndex: 999 }}>
          {lang === "en" ? "한국어로 보기" : "View in English"}
        </button>
        {children}
      </body>
    </html>
  );
}
