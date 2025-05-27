import React from "react";

const ExceptionSection = () => (
  <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
    <nav className="mb-6">
      <h2 className="text-2xl font-bold mb-2">Exception</h2>
      <a href="#exception" className="text-blue-600 hover:underline mr-2">What Is an Exception</a>|
      <a href="#kind" className="text-blue-600 hover:underline mx-2">Kinds of Exception</a>|
      <a href="#fix" className="text-blue-600 hover:underline mx-2">How to fix</a>|
      <a href="#example" className="text-blue-600 hover:underline mx-2">Examples</a>|
      <a href="#workshop" className="text-blue-600 hover:underline ml-2">Workshop</a>
    </nav>
    <section>
      <a id="exception"></a>
      <h2 className="text-xl font-semibold mb-2">Exception</h2>
      <p>An exception is an event, which occurs during the execution of a program, that disrupts the normal flow of the program's instructions.</p>
      <p>
        When an error occurs within a method, the method creates an object and hands it off to the runtime system. The object, called an exception object, contains information about the error, including its type and the state of the program when the error occurred. Creating an exception object and handing it to the runtime system is called throwing an exception.<br/>
        <em>[for <a href="http://docs.oracle.com/javase/tutorial/essential/exceptions/index.html" target="_blank" className="text-blue-600 underline">detail</a>]</em>
      </p>
      <p className="mt-4">
        For example:<br/>
        a user might type an invalid filename;<br/>
        An accessed file does not exist or might contain corrupted data;<br/>
        a network link could fail;<br/>
        …<br/><br/>
        Circumstances of this type are called exception conditions in Java and are represented using objects (All exceptions descend from the java.lang.Throwable).<br/><br/>
        Consider the code that cause an exception:<br/>
        <img src="/media/exception.png" alt="exception code example" className="my-4"/>
        At the row 4, the method main causes one error and this method creates an exception object, its type is ArithmaticException. And then JVM will throw it to the method main. Because the method main we do nothing to control this error, the output looks like this.<br/><br/>
        when the error occurs at the row 4, the statement at the row 5 is dismissed.
      </p>
      <a id="kind"></a>
      <h2 className="text-xl font-semibold mb-2 mt-8">Kinds of Exception</h2>
      <span className="font-semibold">Checked exception</span><br/><br/>
      Checked exceptions are the exceptions that are checked at compile time. You must handle them by either the try-catch mechanism or the throws-declaration mechanism.<br/><br/>
      <em>for example:</em><br/>
      <img src="/media/exception2.png" alt="checked exception example" className="my-4"/>
      In the above example, the method FileReader() is throwing an exception to here. So, you must use try-catch mechanism or throws mechanism to handle.<br/><br/>
      <span className="font-semibold">Unchecked exception</span><br/><br/>
      An unchecked exception is an exception that occurs at the time of execution. These are also called as Runtime Exceptions. The program won’t give a compilation error. Most of the times these exception occurs due to the bad data provided by user during the user-program interaction.<br/>
      <em>for example:</em><br/>
      <img src="/media/exception1.png" alt="unchecked exception example" className="my-4"/><br/>
      If you have declared an array of size 5 in your program, and trying to call the 6th element of the array then an error occurs.<br/><br/>
      <em>[for <a href="https://stackify.com/types-of-exceptions-java/" target="_blank" className="text-blue-600 underline">detail</a>]</em><br/><br/>
      <a id="fix"></a>
      <h2 className="text-xl font-semibold mb-2 mt-8">How to fix</h2>
      We can use try-catch mechanism or throws mechanism to handle to avoid this error.<br/><br/>
      <span className="font-semibold">try-catch mechanism</span><br/><br/>
      Consider the flow and syntax:<br/>
      <img src="/media/exception3.png" alt="try-catch syntax" className="my-4"/>
      <br/>The <em>try</em> statement allows you to define a block of code to be tested for errors while it is being executed.<br/><br/>
      The <em>catch</em> statement allows you to define a block of code to be executed, if an error occurs in the try block.<br/><br/>
      The <em>finally</em> statement lets you execute code, after try...catch, regardless of the result.<br/><br/>
      <div className="bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100 border-l-4 border-yellow-500 dark:border-yellow-400 px-4 py-2 my-4 rounded shadow-sm font-medium">
        <span className="font-bold">Note:</span> You cannot use <span className="font-mono">finally</span> without a <span className="font-mono">try</span> block. The <span className="font-mono">finally</span> block is optional.
      </div>
      In the example <b>DemoException2</b>, we will edit<br/>
      <img src="/media/exception5.png" alt="DemoException2 example" className="my-4"/><br/>
      <p>
        When the program runs to the row 14, if the file name "computer.txt" does not exist then an exception object is created (its type is FileNotFoundException) by the method main and JVM will throw the object to catch block, the variable e is used to store the address of the object. In the catch block, you can use the variable e to get error information.<br/>
        <b>The Output will be :</b><br/>
        something are wrong<br/>
        try-catch is finished<br/><br/>
      </p>
      <p>
        In the example <b>ExceptionDemo_1</b>, we will edit<br/>
        <img src="/media/exception4.png" alt="ExceptionDemo_1 example" className="my-4"/><br/>
        When you try to get 6th elements, an exception object is created (its type is ArrayIndexOutOfBoundsException). JVM will throws the object to catch block.<br/>
        <b>The output will be:</b><br/>
        1,2,3,4,5,something are wrong<br/>
        try-catch is finished<br/><br/>
      </p>
      <span className="font-semibold">throws mechanism</span><br/><br/>
      In the example <b>DemoException2</b>, the error occurs in the main, to fix a checked exception we use <b>throws</b> keyword. We will edit:<br/>
      <img src="/media/exception6.png" alt="throws mechanism example" className="my-4"/>
      <b>The output will be:</b> something are wrong if the file name "computer.txt" does not exist.
      <a id="example"></a>
      <h2 className="text-xl font-semibold mb-2 mt-8">Examples</h2>
      The code below to print out "age is 20 or older" if age is below 20 or input a text.<br/>
      <img src="/media/exception7.png" alt="age example code" className="my-4"/><br/>
      When the code runs to the row 20, if you input a text "hello" then this method will create an exception object and JVM will throw it to the catch block to handle. The output will be : <img src="/media/exception8.png" alt="output for hello input" className="my-4 inline"/><br/>
      If you input 18 then the statement <b>throw new Exception()</b> will create an exception object. This object will be thrown to the catch block. The output will be:<br/><img src="/media/exception9.png" alt="output for 18 input" className="my-4 inline"/><br/>
      <span className="font-semibold mt-8">Summary</span><br/><br/>
      <ul className="list-disc list-inside mb-4">
        <li>A try block is always followed by a catch block, which handles the exception that occurs in associated try block.</li>
        <li>A single try block can have multiple catch blocks associated with it. see <em><b><a href="https://docs.oracle.com/javase/7/docs/technotes/guides/language/catch-multiple.html" target="_blank" className="text-blue-600 underline">catching multiple exceptions in java.</a></b></em></li>
        <li>A try statement may be nested inside either the try or catch block of another try statement. see <em><b><a href="https://beginnersbook.com/2013/04/nested-try-catch/#:~:text=When%20a%20try%20catch%20block,that%20that%20catch%20block%20executes." target="_blank" className="text-blue-600 underline">Nesting of try/catch Blocks</a></b></em></li>
        <li>When you write a method that causes an exception. If you do not want to handle this error you can throw it to another method to handle the error by using throws keyword</li>
        <li>You can create your own exception Classes, see <a href="https://www.javatpoint.com/custom-exception" target="_blank" className="text-blue-600 underline">Custom Exception Classes</a></li>
      </ul>
      <h2 className="text-xl font-semibold mb-2 mt-8">Course slide</h2>
      <ul className="list-disc list-inside mb-4">
        <li><a href="/resource/Exception Handling.pdf" download className="text-blue-600 underline">Exceptions.pdf</a></li>
      </ul>
      <a id="workshop"></a>
      <h2 className="text-xl font-semibold mb-2 mt-8">Workshop</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Complete the <a href="/workshop/workshop2.pdf" download className="text-blue-600 underline">workshop2</a></li>
      </ul>
    </section>
  </div>
);

export default ExceptionSection;
