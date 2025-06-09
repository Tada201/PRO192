import React from 'react';
import SyllabusSheet001 from '../../docs/Syllabus_mat/sheet001.mdx';
import SyllabusSheet002 from '../../docs/Syllabus_mat/sheet002.mdx';
import SyllabusSheet003 from '../../docs/Syllabus_mat/sheet003.mdx';
import SyllabusSheet004 from '../../docs/Syllabus_mat/sheet004.mdx';
import SyllabusSheet005 from '../../docs/Syllabus_mat/sheet005.mdx';

const TABS = [
  { label: 'Syllabus', content: <SyllabusSheet001 /> },
  { label: 'Materials', content: <SyllabusSheet002 /> },
  { label: 'Learning Outcomes', content: <SyllabusSheet003 /> },
  { label: 'Schedule', content: <SyllabusSheet004 /> },
  { label: 'Grading Structure', content: <SyllabusSheet005 /> },
];

export default function SyllabusPage() {
  const [tab, setTab] = React.useState(0);
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-6">Course Syllabus</h1>
      <nav className="flex gap-2 mb-6 border-b" aria-label="Syllabus Sections">
        {TABS.map((t, i) => (
          <button
            key={t.label}
            className={`px-4 py-2 font-semibold border-b-2 rounded-t transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${tab === i ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-blue-50'}`}
            onClick={() => setTab(i)}
            type="button"
            aria-current={tab === i ? 'page' : undefined}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <section className="prose max-w-none bg-white p-4 rounded shadow-inner min-h-[300px]">
        {TABS[tab].content}
      </section>
    </div>
  );
}
