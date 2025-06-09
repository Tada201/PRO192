import React from "react";

const WelcomeSection = () => {
  return (
    <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-200">Welcome to Object-Oriented</h2>
      <nav className="mb-4">
        <a href="#COMPLEXITY" className="mr-2 text-blue-600 hover:underline">A Language for Complex Applications</a> | 
        <a href="#ObjectTerminology" className="ml-2 text-blue-600 hover:underline">Object Terminology</a>
      </nav>
      <section className="mb-8">
        <p>
          Modern software applications are <em>intricate</em>, <em>dynamic</em> and <em>complex</em>. The number of lines of code can exceed the hundreds of thousands or millions. These applications evolve over time. Some take years of programming effort to mature. Creating such applications involves many developers with different levels of expertise. Their work consists of smaller stand alone and testable sub-projects; sub-projects that are transferrable, practical, upgradeable and possibly even usable within other future applications. The principles of software engineering suggest that each component should be <em>highly cohesive</em> and that the collection of components should be <em>loosely coupled</em>. Object-oriented languages provide the tools for implementing these principles.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Subject title</h2>
        <p>The Object Oriented Programming using Java (PRO192)</p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Subject Description</h2>
        <p>
          This subject introduces the student to object-oriented programming. The student learns to build reusable objects, encapsulate data and logic within a class, inherit one class from another and implement polymorphism. Adhere to object-oriented programming principles including encapsulation, polymorphism and inheritance when writing program code.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Learning outcomes</h2>
        <ul className="list-disc ml-6 mt-2">
          <li>Understand the concepts of object oriented (OO) programs to solve problems and fundamentals of object-oriented programming in Java</li>
          <li>Practice basic Java language syntax and semantics to write Java programs and use concepts such as variables, conditional and iterative execution methods</li>
          <li>Uses streams to read and write data from/to different types of sources/targets</li>
          <li>Discuss the benefits and the use of JAVA's Exceptional handling mechanism</li>
          <li>Identify classes, objects, members of a class and relationships among them needed for a specific problem</li>
          <li>Explain the concept and demonstrates the use of Polymorphism, Encapsulation, Abstraction and Inheritance in java</li>
          <li>Discuss the principles and the use of abstract classes and interfaces in java</li>
          <li>Understand and implement a complete program using object array</li>
          <li>Explain the principles and the use of some (java collections) abstract data types (list, set, map)</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Academic policy</h2>
        <p>
          Cheating, plagiarism and breach of copyright are serious offenses under this Policy.<br />
          <b>Cheating</b><br />
          Cheating during a test or exam is construed as talking, peeking at another student's paper or any other clandestine method of transmitting information.<br />
          <b>Plagiarism</b><br />
          Plagiarism is using the work of others without citing it; that is, holding the work of others out as your own work.<br />
          <b>Breach of Copyright</b><br />
          If you photocopy a textbook without the copyright holder's permission, you violate copyright law.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-blue-800 dark:text-blue-300">Prerequisite(s)</h2>
        <p>PRF192</p>
      </section>
      <section>
        For further information, see the <a href="/syllabus-pro192-spring2021" className="text-blue-600 underline">syllabus</a>
      </section>
    </div>
  );
};

export default WelcomeSection;