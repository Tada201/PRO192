import React from 'react';
import CopyableCodeBlock from './CopyableCodeBlock';

const FileIOSection: React.FC = () => (
  <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
    <nav className="mb-6">
      <h2 className="text-3xl font-bold mb-2">Standard Input and Output</h2>
      <div className="space-x-2 text-blue-600">
        <a href="#stream" className="hover:underline">I/O Streams</a>|
        <a href="#commandline" className="hover:underline">I/O from the Command Line</a>|
        <a href="#example" className="hover:underline">Example</a>
      </div>
    </nav>
    <section className="mb-8">
      <p className="mb-4">This topic covers the Java platform classes used for basic input and output. It focuses primarily on I/O Streams, a powerful concept that greatly simplifies I/O operations.</p>
      <span id="stream" className="block text-xl font-semibold mb-2">I/O Stream</span>
      <p className="mb-2">An I/O Stream represents an input source or an output destination. A stream can represent many different kinds of sources and destinations, including disk files, devices, other programs, and memory arrays.</p>
      <p className="mb-2">Streams support many different kinds of data, including simple bytes, primitive data types, localized characters, and objects. Some streams simply pass on data; others manipulate and transform the data in useful ways.</p>
      <em className="mb-4 block">[for <a href="https://docs.oracle.com/javase/tutorial/essential/io/streams.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">detail</a>]</em>
      <span id="commandline" className="block text-xl font-semibold mb-2 mt-6">I/O from the Command Line</span>
      <p className="mb-2">A program is often run from the command line and interacts with the user in the command line environment. The Java platform supports this kind of interaction in two ways: through the Standard Streams and through the Console.</p>
      <p className="mb-2">The Java platform supports three Standard Streams: Standard Input, accessed through <code>System.in</code>; Standard Output, accessed through <code>System.out</code>; and Standard Error, accessed through <code>System.err</code>.<br /><br />These objects are defined automatically and do not need to be opened. Standard Output and Standard Error are both for output; having error output separately allows the user to divert regular output to a file and still be able to read error messages. For more information, refer to the <a href="https://docs.oracle.com/javase/tutorial/essential/io/cl.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">documentation</a> for your command line interpreter.</p>
      <p className="mb-2">To get user input, we can also use the Scanner class <em>[for <a href="https://docs.oracle.com/javase/tutorial/essential/io/scanning.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">detail</a>]</em>. This class supports some methods to get various types from the user</p>
      <div className="overflow-x-auto my-4">
        <table id="tbl2" className="min-w-max w-full border border-gray-300 dark:border-gray-700 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr><th className="p-2 border">Method</th><th className="p-2 border">Description</th></tr>
          </thead>
          <tbody>
            <tr><td className="p-2 border">nextBoolean()</td><td className="p-2 border">Reads a boolean value from the user</td></tr>
            <tr><td className="p-2 border">nextByte()</td><td className="p-2 border">Reads a byte value from the user</td></tr>
            <tr><td className="p-2 border">nextDouble()</td><td className="p-2 border">Reads a double value from the user</td></tr>
            <tr><td className="p-2 border">nextFloat()</td><td className="p-2 border">Reads a float value from the user</td></tr>
            <tr><td className="p-2 border">nextInt()</td><td className="p-2 border">Reads a int value from the user</td></tr>
            <tr><td className="p-2 border">nextLine()</td><td className="p-2 border">Reads a String value from the user</td></tr>
            <tr><td className="p-2 border">nextLong()</td><td className="p-2 border">Reads a long value from the user</td></tr>
            <tr><td className="p-2 border">nextShort()</td><td className="p-2 border">Reads a short value from the user</td></tr>
          </tbody>
        </table>
      </div>
      <span id="example" className="block text-xl font-semibold mb-2 mt-6">Example</span>
      <img src="/media/ioexample.png" alt="ioexample.png" className="my-4 max-w-full rounded border" />
      <p className="mb-2">In the above example, we need to import the library class <em>Scanner</em> from the package <em>java.util.Scanner</em>. To use this class at the row 10, we declare the variable sc and create an object from this class. Why do we need this? Do not worry, when you go to the topic <em>class and object</em>, you will be explained that why you do this.</p>
      <p className="mb-2">At the row 11, a message <em>Enter number of elements</em> is printed out.</p>
      <p className="mb-2">At the row 12, the statement <em>sc.nextLine()</em> to get a string from the user and then, we use <em>Integer.parseInt()</em> to convert the inputted string to the integer value.</p>
      <p className="mb-2">At the row 19, <em>System.out.format</em> is used in Java to format output.</p>
      <span className="block text-xl font-semibold mb-2 mt-6">Summary</span>
      <ul className="list-disc ml-6 mb-2">
        <li>Easy way to get the user data is to use the library class Scanner</li>
        <li>Using System.out to print out data to the console</li>
        <li>We can convert a string to the number by using some classes Integer, Float,....</li>
      </ul>
    </section>
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-2">Reading from a File</h2>
      <CopyableCodeBlock language="java">
{`try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}`}
      </CopyableCodeBlock>
    </section>
  </div>
);

export default FileIOSection;