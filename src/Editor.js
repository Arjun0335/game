import React from "react";

export default function Editor({ siteTitle, setSiteTitle, tagline, setTagline, heroTitle, setHeroTitle, heroSubtitle, setHeroSubtitle, ctaText, setCtaText, heroImageURL, setHeroImageURL, templates, activeTemplate, setActiveTemplate, setBgColorClass, setAccentClass }) {
  function handleImageUpload(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
      setHeroImageURL(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  function applyTemplate(id) {
    const t = templates.find((x) => x.id === id);
    if (!t) return;
    setActiveTemplate(t.id);
    setBgColorClass(t.theme.bg);
    setAccentClass(t.theme.accent);
    setHeroTitle(t.hero.title);
    setHeroSubtitle(t.hero.subtitle);
    setCtaText(t.hero.cta);
  }

  return (
    <aside className="w-full md:w-1/3 bg-white rounded-2xl p-4 shadow-lg">
      <h3 className="text-xl font-bold mb-3">Editor</h3>
      <label className="text-sm font-medium">Site title</label>
      <input className="w-full p-2 rounded mt-1 border" value={siteTitle} onChange={(e) => setSiteTitle(e.target.value)} />
      <label className="text-sm font-medium mt-3">Tagline</label>
      <input className="w-full p-2 rounded mt-1 border" value={tagline} onChange={(e) => setTagline(e.target.value)} />
      <hr className="my-4" />
      <label className="text-sm font-medium">Hero title</label>
      <input className="w-full p-2 rounded mt-1 border" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} />
      <label className="text-sm font-medium mt-3">Hero subtitle</label>
      <input className="w-full p-2 rounded mt-1 border" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} />
      <label className="text-sm font-medium mt-3">CTA text</label>
      <input className="w-full p-2 rounded mt-1 border" value={ctaText} onChange={(e) => setCtaText(e.target.value)} />
      <label className="text-sm font-medium mt-3">Hero image (optional)</label>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full mt-1" />
      <hr className="my-4" />
      <label className="text-sm font-medium">Templates</label>
      <div className="flex gap-2 mt-2">
        {templates.map((t) => (
          <button key={t.id} onClick={() => applyTemplate(t.id)} className={`px-3 py-1 rounded ${activeTemplate === t.id ? "ring-2 ring-pink-400" : "border"}`}>
            {t.name}
          </button>
        ))}
      </div>
    </aside>
  );
}