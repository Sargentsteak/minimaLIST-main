import React from "react";
import { HomeHeroHeader } from "../partials/HomeHeroHeader";
import { HomeFeatureSection } from "../partials/HomeFeatureSection";
import { FooterPlain } from "../partials/FooterPlain";
import { FAQSection } from "../partials/FAQSection";
import { HeaderMenu } from "../partials/HeaderMenu";
import { useTheme } from "@emotion/react";

export default function Home() {
  const theme = useTheme();
  return (
    <>
      <HeaderMenu theme={theme} />
      <HomeHeroHeader />
      <HomeFeatureSection />
      <FAQSection />
      <FooterPlain />
    </>
  );
}
