import  { Book, Code, Package, Shield, Layers, Database, AlertTriangle, FileText, List } from 'lucide-react';

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  icon: any;
}

export const courseSections: CourseSection[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    description: 'Introduction to object-oriented programming using Java and course overview.',
    icon: Book
  },
  {
    id: 'introduction',
    title: 'Introduction',
    description: 'Overview of object-oriented thinking, complexity, abstraction, and core OOP concepts.',
    icon: Code
  },
  {
    id: 'foundations',
    title: 'Foundations',
    description: 'Java basics including JVM, platform independence, data types, variables, and logic constructs.',
    icon: Package
  },
  {
    id: 'encapsulation',
    title: 'Encapsulation',
    description: 'Classes, objects, constructors, member functions, and access modifiers in Java.',
    icon: Shield
  },
  {
    id: 'inheritance',
    title: 'Inheritance',
    description: 'Inheritance, is-a relationships, super/derived classes, and code reuse patterns.',
    icon: Layers
  },
  {
    id: 'polymorphism',
    title: 'Polymorphism',
    description: 'Method overloading, overriding, abstract classes, and interfaces for flexible designs.',
    icon: Code
  },
  {
    id: 'array-of-objects',
    title: 'Array of Objects',
    description: 'Managing collections of objects using arrays and related operations.',
    icon: List
  },
  {
    id: 'collections',
    title: 'Collections',
    description: 'Java Collections Framework: lists, sets, maps, and related classes for data storage.',
    icon: Database
  },
  {
    id: 'exception-handling',
    title: 'Exception Handling',
    description: 'Java exception types, try-catch blocks, throws clause, and error handling best practices.',
    icon: AlertTriangle
  },
  {
    id: 'file-io',
    title: 'File IO',
    description: 'Input/output streams, file reading/writing, and command line I/O operations.',
    icon: FileText
  },
  {
    id: 'syllabus',
    title: 'Syllabus',
    description: 'Detailed course syllabus including expectations, grading, and schedule.',
    icon: Book
  }
];
