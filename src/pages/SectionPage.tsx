import  { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { sections } from '../data/sections';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';
import IntroductionSection from '../components/sections/IntroductionSection';
import IntroductionCourseSection from '../components/sections/IntroductionCourseSection';
import FoundationsCourseSection from '../components/sections/FoundationsCourseSection';
import EncapsulationSection from '../components/sections/EncapsulationSection';
import InheritanceSection from '../components/sections/InheritanceSection';
import PolymorphismSection from '../components/sections/PolymorphismSection';
import ArrayOfObjectsSection from '../components/sections/ArrayOfObjectsSection';
import CollectionsSection from '../components/sections/CollectionsSection';
import DynamicMemorySection from '../components/sections/DynamicMemorySection';
import ExceptionSection from '../components/sections/ExceptionSection';
import FileIOSection from '../components/sections/FileIOSection';

const SectionPage = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const [section, setSection] = useState(sections.find(s => s.id === sectionId));
  const { t } = useTranslation();
  
  useEffect(() => {
    setSection(sections.find(s => s.id === sectionId));
    // Scroll to top when section changes
    window.scrollTo(0, 0);
  }, [sectionId]);
  
  if (!section) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-700 dark:text-red-300">
            {t('sectionNotFound') || 'Section not found. Please select a valid course section.'}
          </p>
        </div>
      </div>
    );
  }
  
  // Find the index of the current section
  const currentIndex = sections.findIndex(s => s.id === sectionId);
  const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {section.id !== 'introductionCourse' && (
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t(`${section.translationKey}Title`)}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t(`${section.translationKey}Description`)}
          </p>
        </div>
      )}
      
      {/* Removed placeholder lesson blocks and unwanted sections as per user request */}
      
      {section.id === 'welcome' && (
        <>
          <div className="info-section">
            <h2>Subject title</h2>
            <p>The Object Oriented Programming using Java (PRO192)</p>
          </div>

          <div className="info-section">
            <h2>Subject Description</h2>
            <p>
              This subject introduces the student to object-oriented programming. The student learns to build reusable objects, encapsulate data and logic within a class, inherit one class from another and implement polymorphism.
              Adhere to object-oriented programming principles including encapsulation, polymorphism and inheritance when writing program code.
            </p>
          </div>

          <div className="info-section">
            <h2>Learning outcomes</h2>
            <ul>
              <li>Understand the concepts of object oriented (OO) programs to solve problems and fundamentals of object-oriented programming in Java</li>
              <li>Practice basic Java language syntax and semantics to write Java programs and use concepts such as variables, conditional and iterative execution methods</li>
              <li>Uses streams to read and write data from/to different types of sources/targets</li>
              <li>Discuss the benefits and the use of JAVA’s Exceptional handling mechanism</li>
              <li>Identify classes, objects, members of a class and relationships among them needed for a specific problem</li>
              <li>Explain the concept and demonstrates the use of Polymorphism, Encapsulation, Abstraction and Inheritance in java</li>
              <li>Discuss the principles and the use of abstract classes and interfaces in java</li>
              <li>Understand and implement a complete program using object array</li>
              <li>Explain the principles and the use of some (java collections) abstract data types (list, set, map)</li>
            </ul>
          </div>

          <div className="info-section">
            <h2>Academic policy</h2>
            <p>Cheating, plagiarism and breach of copyright are serious offenses under this Policy.</p>
            <p><strong>Cheating:</strong> Cheating during a test or exam is construed as talking, peeking at another student’s paper or any other clandestine method of transmitting information.</p>
            <p><strong>Plagiarism:</strong> Plagiarism is using the work of others without citing it; that is, holding the work of others out as your own work.</p>
            <p><strong>Breach of Copyright:</strong> If you photocopy a textbook without the copyright holder's permission, you violate copyright law.</p>
          </div>

          <div className="info-section">
            <h2>Prerequisite(s)</h2>
            <p>PRF192</p>
          </div>
        </>
      )}

      {section.id === 'introduction' && <IntroductionSection />}
      {section.id === 'introductionCourse' && <IntroductionCourseSection />}
      {section.id === 'foundations' && <FoundationsCourseSection />}
      {section.id === 'encapsulation' && <EncapsulationSection />}
      {section.id === 'inheritance' && <InheritanceSection />}
      {section.id === 'polymorphism' && <PolymorphismSection />}
      {section.id === 'arrayofobjects' && <ArrayOfObjectsSection />}
      {section.id === 'collection' && <CollectionsSection />}
      {section.id === 'collections' && <CollectionsSection />}
      {section.id === 'dynamicmemory' && <DynamicMemorySection />}
      {section.id === 'exception' && <ExceptionSection />}
      {section.id === 'io' && <FileIOSection />}
      {/* TODO: Add FileIOSection when implemented */}

      <div className="mt-8 flex justify-between">
        {prevSection ? (
          <Link 
            to={`/section/${prevSection.id}`} 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {t('previous')}: {t(`${prevSection.translationKey}Title`)}
          </Link>
        ) : (
          <div></div>
        )}
        
        {nextSection ? (
          <Link 
            to={`/section/${nextSection.id}`} 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            {t('next')}: {t(`${nextSection.translationKey}Title`)}
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default SectionPage;
