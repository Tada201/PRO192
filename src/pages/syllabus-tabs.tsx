import React from 'react';
import Tabstrip from '../components/Tabstrip';

export const metadata = {
  title: 'Syllabus Tabs',
  description: 'Tab navigation for Syllabus sections',
};

export default function SyllabusTabsPage() {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-4">Syllabus Navigation</h2>
      <Tabstrip />
      <div className="mt-6 text-gray-600 text-sm">
        <p>Click a tab to view the corresponding section.</p>
      </div>
    </div>
  );
}
