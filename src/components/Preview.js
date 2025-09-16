import React from "react";

export default function Preview({ siteTitle, tagline, heroTitle, heroSubtitle, ctaText, sections, bgColorClass, accentClass, heroImageURL }) {
  function escapeHtml(str) {
    if (!str && str !== 0) return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function previewMarkup() {
    return {
      __html: `
      <div class="w-full">
        <div class="hero py-24 px-6 rounded-b-3xl shadow-lg" style="${heroImageURL ? `background-image:url(${heroImageURL}); background-size:cover; background-position:center;` : ''}">
          <div class="container mx-auto text-center py-12">
            <h1 class="text-4xl md:text-5xl font-extrabold ${accentClass.split(' ').slice(-1)}">${escapeHtml(heroTitle)}</h1>
            <p class="mt-4 text-lg md:text-xl text-opacity-90">${escapeHtml(heroSubtitle)}</p>
            <div class="mt-6"><button class="px-4 py-2 rounded-2xl border bg-white/10">${escapeHtml(ctaText)}</button></div>
          </div>
        </div>
        ${sections.map((s) => `
          <section class="py-12 px-6">
            <div class="max-w-3xl mx-auto">
              <h2 class="text-2xl font-semibold mb-3">${escapeHtml(s.title)}</h2>
              <p class="text-base leading-7">${escapeHtml(s.content)}</p>
            </div>
          </section>`).join('')}
      </div>`
    };
  }
  return (
    <section className={`w-full md:w-1/3 rounded-2xl p-0 overflow-hidden shadow-lg ${bgColorClass}`}>
      <div className="p-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-800">Preview</div>
          <div className="text-lg font-semibold">{siteTitle}</div>
        </div>
        <div className="text-right">
          <div className="text-sm">{tagline}</div>
        </div>
      </div>
      <div className="bg-white/30 p-4" style={{ minHeight: 420 }}>
        <div dangerouslySetInnerHTML={previewMarkup()} />
      </div>
    </section>
  );
}
