import CopyableCodeBlock from './CopyableCodeBlock';

const ExceptionSection = () => {
  return (
    <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Exception Handling in Java</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What Is an Exception?</h2>
        <p className="mb-4">
          An <b>exception</b> is an event that occurs during the execution of a program that disrupts the normal flow of instructions. When an error occurs, the method creates an exception object and hands it off to the runtime system. This is called <b>throwing an exception</b>.
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>Invalid filename input</li>
          <li>File not found or corrupted</li>
          <li>Network link failure</li>
        </ul>
        <img src="/Org_code/images/exception.png" alt="Exception example" className="my-4" />
        <p className="mb-4">
          When an error occurs, the statement after the error is dismissed. The exception object contains information about the error, including its type and the state of the program when the error occurred.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Kinds of Exception</h2>
        <h3 className="text-xl font-semibold mb-2">Checked Exception</h3>
        <p className="mb-4">Checked exceptions are checked at compile time. You must handle them using try-catch or throws.</p>
        <img src="/Org_code/images/exception2.png" alt="Checked Exception" className="my-4" />
        <h3 className="text-xl font-semibold mb-2">Unchecked Exception</h3>
        <p className="mb-4">Unchecked exceptions occur at runtime (also called Runtime Exceptions). The program compiles, but may fail at runtime due to bad data or logic.</p>
        <img src="/Org_code/images/exception1.png" alt="Unchecked Exception" className="my-4" />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">How to Fix</h2>
        <h3 className="text-xl font-semibold mb-2">try-catch Mechanism</h3>
        <img src="/Org_code/images/exception3.png" alt="try-catch flow" className="my-4" />
        <p className="mb-4">The <b>try</b> block contains code to test for errors. The <b>catch</b> block handles the error. The <b>finally</b> block (optional) runs after try/catch, regardless of the result.</p>
        <img src="/Org_code/images/exception5.png" alt="try-catch example" className="my-4" />
        <p className="mb-4">If the file does not exist, an exception is thrown and caught. The output will be: <br /><b>something are wrong<br />try-catch is finished</b></p>
        <img src="/Org_code/images/exception4.png" alt="ArrayIndexOutOfBounds example" className="my-4" />
        <p className="mb-4">If you try to access an invalid array index, an exception is thrown and caught. The output will be: <br /><b>1,2,3,4,5,something are wrong<br />try-catch is finished</b></p>
        <h3 className="text-xl font-semibold mb-2">throws Mechanism</h3>
        <img src="/Org_code/images/exception6.png" alt="throws example" className="my-4" />
        <p className="mb-4">The <b>throws</b> keyword can be used to declare that a method may throw a checked exception.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Examples</h2>
        <img src="/Org_code/images/exception7.png" alt="Exception example code" className="my-4" />
        <p className="mb-4">If you input a text instead of a number, an exception is thrown and caught. The output will be:</p>
        <img src="/Org_code/images/exception8.png" alt="Exception output 1" className="my-4" />
        <p className="mb-4">If you input 18, the code throws a new Exception. The output will be:</p>
        <img src="/Org_code/images/exception9.png" alt="Exception output 2" className="my-4" />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Summary</h2>
        <ul className="list-disc ml-6 mb-2">
          <li>A try block is always followed by a catch block, which handles the exception that occurs in the associated try block.</li>
          <li>A single try block can have multiple catch blocks. <a href="https://docs.oracle.com/javase/7/docs/technotes/guides/language/catch-multiple.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">See catching multiple exceptions in Java</a></li>
          <li>A try statement may be nested inside either the try or catch block of another try statement. <a href="https://beginnersbook.com/2013/04/nested-try-catch/#:~:text=When%20a%20try%20catch%20block,that%20that%20catch%20block%20executes." target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">See nesting of try/catch blocks</a></li>
        </ul>
      </section>
      <CopyableCodeBlock language="java">
{`try {
  // code that may throw an exception
  FileReader file = new FileReader("file.txt");
} catch (FileNotFoundException e) {
  // handle the exception
  System.out.println("File not found");
} finally {
  // code that always executes
  System.out.println("Finally block executed");
}`}
      </CopyableCodeBlock>
    </div>
  );
};

export default ExceptionSection;
