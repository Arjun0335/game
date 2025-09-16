import React, { useState, useEffect } from "react";
import Editor from "./components/Editor";
import SectionsEditor from "./components/SectionsEditor";
import Preview from "./components/Preview";

export default function App() {
  const defaultTemplates = [
    {
      id: "classic",
      name: "Classic Romantic",
      theme: { bg: "bg-gradient-to-r from-pink-100 to-pink-50", accent: "text-pink-600" },
      hero: { title: "Our Story Begins", subtitle: "A little page to celebrate us", cta: "Read More" },
    },
    {
      id: "moody",
      name: "Moody & Elegant",
      theme: { bg: "bg-gradient-to-r from-violet-900 via-purple-800 to-pink-700", accent: "text-white" },
      hero: { title: "We Found Each Other", subtitle: "Moments captured in time", cta: "Start Tour" },
    },
  ];

  const [templates] = useState(defaultTemplates);
  const [activeTemplate, setActiveTemplate] = useState(defaultTemplates[0].id);
  const [siteTitle, setSiteTitle] = useState("A Love Story");
  const [tagline, setTagline] = useState("Two hearts. One journey.");
  const [heroTitle, setHeroTitle] = useState(defaultTemplates[0].hero.title);
  const [heroSubtitle, setHeroSubtitle] = useState(defaultTemplates[0].hero.subtitle);
  const [ctaText, setCtaText] = useState(defaultTemplates[0].hero.cta);
  const [bgColorClass, setBgColorClass] = useState(defaultTemplates[0].theme.bg);
  const [accentClass, setAccentClass] = useState(defaultTemplates[0].theme.accent);
  const [heroImageURL, setHeroImageURL] = useState("");

  const [sections, setSections] = useState([
    { id: 1, title: "Our Story", content: "How we met and magical moments." },
    { id: 2, title: "Gallery", content: "Upload photos to relive memories." },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("romantic_builder_draft_v1");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSiteTitle(data.siteTitle || siteTitle);
        setTagline(data.tagline || tagline);
        setHeroTitle(data.heroTitle || heroTitle);
        setHeroSubtitle(data.heroSubtitle || heroSubtitle);
        setCtaText(data.ctaText || ctaText);
        setBgColorClass(data.bgColorClass || bgColorClass);
        setAccentClass(data.accentClass || accentClass);
        setHeroImageURL(data.heroImageURL || heroImageURL);
        setSections(data.sections || sections);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    const payload = {
      siteTitle, tagline, heroTitle, heroSubtitle, ctaText, bgColorClass, accentClass, heroImageURL, sections,
    };
    localStorage.setItem("romantic_builder_draft_v1", JSON.stringify(payload));
  }, [siteTitle, tagline, heroTitle, heroSubtitle, ctaText, bgColorClass, accentClass, heroImageURL, sections]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row gap-6 p-6 bg-white">
      <Editor
        siteTitle={siteTitle} setSiteTitle={setSiteTitle}
        tagline={tagline} setTagline={setTagline}
        heroTitle={heroTitle} setHeroTitle={setHeroTitle}
        heroSubtitle={heroSubtitle} setHeroSubtitle={setHeroSubtitle}
        ctaText={ctaText} setCtaText={setCtaText}
        heroImageURL={heroImageURL} setHeroImageURL={setHeroImageURL}
        templates={templates} activeTemplate={activeTemplate}
        setActiveTemplate={setActiveTemplate}
        setBgColorClass={setBgColorClass} setAccentClass={setAccentClass}
      />
      <SectionsEditor sections={sections} setSections={setSections} />
      <Preview siteTitle={siteTitle} tagline={tagline} heroTitle={heroTitle} heroSubtitle={heroSubtitle} ctaText={ctaText} sections={sections} bgColorClass={bgColorClass} accentClass={accentClass} heroImageURL={heroImageURL} />
    </div>
  );
}