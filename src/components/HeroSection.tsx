import  { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="py-12 bg-[#BEE3F8] dark:bg-gray-800 rounded-lg shadow-sm mb-8 border border-[#3B82F6]">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-[#1E3A8A] dark:text-white mb-4">
          PRO192: Object Oriented Programming using Java
        </h1>
        <p className="text-xl text-[#1E3A8A] dark:text-gray-300 mb-8">
          A comprehensive course exploring object-oriented programming concepts, 
          design principles, and practical implementation in Java.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a 
            href="#course-sections"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            Explore Course Sections
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
          <button 
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm"
            onClick={() => {
              window.location.href = 'https://drive.google.com/file/d/1F-MrzcO8qpKdOirw5AA0-ZzfHs6Su0XG/view';
            }}
          >
            Download Syllabus
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
