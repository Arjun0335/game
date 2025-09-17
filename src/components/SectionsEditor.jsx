import React from "react";

export default function SectionsEditor({ sections, setSections }) {
  function updateSection(id, field, value) {
    setSections(sections.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  }
  function addSection() {
    const nid = sections.length ? Math.max(...sections.map((s) => s.id)) + 1 : 1;
    setSections([...sections, { id: nid, title: "New Section", content: "Add your content here" }]);
  }
  function removeSection(id) {
    setSections(sections.filter((s) => s.id !== id));
  }
  return (
    <main className="w-full md:w-1/3 overflow-auto bg-white rounded-2xl p-4 shadow-lg">
      <h3 className="text-xl font-bold mb-3">Sections</h3>
      {sections.map((s) => (
        <div key={s.id} className="mb-4 p-3 border rounded">
          <div className="flex gap-2 mb-2">
            <input value={s.title} onChange={(e) => updateSection(s.id, "title", e.target.value)} className="flex-1 p-2 rounded border" />
            <button onClick={() => removeSection(s.id)} className="px-3 rounded bg-red-100 text-red-600">Delete</button>
          </div>
          <textarea value={s.content} onChange={(e) => updateSection(s.id, "content", e.target.value)} className="w-full p-2 h-24 rounded border" />
        </div>
      ))}
      <button onClick={addSection} className="px-3 py-2 rounded bg-pink-600 text-white">Add Section</button>
    </main>
  );
}
