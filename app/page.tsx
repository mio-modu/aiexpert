
"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) setLang(storedLang);
  }, []);

  const content = {
    en: {
      title: "Welcome to AI Expert Presentation",
      intro: "Explore real-world AI-powered workflows",
    },
    kr: {
      title: "AI 전문가 프레젠테이션에 오신 것을 환영합니다",
      intro: "실전 기반 AI 자동화 흐름을 확인해보세요",
    },
  };

  return (
    <main style={{ height: "100vh", scrollSnapAlign: "start", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <h1>{content[lang].title}</h1>
      <p>{content[lang].intro}</p>
    </main>
  );
}
