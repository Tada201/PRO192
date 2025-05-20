import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const FoundationsCourseSection = () => {
  return (
    <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Foundations</h2>

      <h3 className="text-xl font-semibold mb-2">Java Virtual Machine</h3>
      <p className="mb-4">
        The Java Virtual Machine is an abstract computing machine. Like a real computing machine, it has an instruction set and manipulates various memory areas at run time. It is reasonably common to implement a programming language using a virtual machine; the best-known virtual machine may be the P-Code machine of UCSD Pascal.  
        <a href="http://en.wikipedia.org/wiki/Java_virtual_machine" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">See Wiki for a detailed exposition</a>.
      </p>
      <img src="/Org_code/images/JVM.png" alt="Java Virtual Machine" className="mb-4 rounded shadow" />

      <h3 className="text-xl font-semibold mb-2">Java Platform</h3>
      <p className="mb-4">
        A platform is the hardware or software environment in which a program runs.  
        The Java platform has two components:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>The Java Virtual Machine</li>
        <li>The Java Application Programming Interface (API)</li>
      </ul>
      <img src="/Org_code/images/JavaPlatform.png" alt="Java Platform" className="mb-4 rounded shadow" />

      <h3 className="text-xl font-semibold mb-2">The first Java program in the NetBeans</h3>
      <p className="mb-4">
        This program will show the string “Hello World” to the screen.  
        Steps:
      </p>
      <ol className="list-decimal list-inside mb-4">
        <li>Create a new Java NetBeans project</li>
        <li>Add a Java class</li>
        <li>Write code</li>
        <li>Compile/Run the program</li>
      </ol>
      <img src="/Org_code/images/firstProgram.png" alt="First Java Program" className="mb-4 rounded shadow" />
      <img src="/Org_code/images/step2.png" alt="Step 2" className="mb-4 rounded shadow" />
      <img src="/Org_code/images/step22.png" alt="Step 2.2" className="mb-4 rounded shadow" />
      <img src="/Org_code/images/step3.png" alt="Step 3" className="mb-4 rounded shadow" />
      <img src="/Org_code/images/step4.png" alt="Step 4" className="mb-4 rounded shadow" />

      <h3 className="text-xl font-semibold mb-2">Keywords and Identifiers</h3>
      <p className="mb-4">
        Keywords: Almost all of them are similar to those in C language.  
        Naming Convention:  
      </p>
      <img src="/Org_code/images/keyword.png" alt="Keywords and Identifiers" className="mb-4 rounded shadow" />
      <p className="mb-4">
        Java is a case-sensitive language.  
        Identifiers must be different from keywords.
      </p>

      <h3 className="text-xl font-semibold mb-2">Data Type</h3>
      <p className="mb-4">
        The types of the Java programming language are divided into two categories: primitive types and reference types.
      </p>

      <h4 className="text-lg font-semibold mb-2">Primitive Type</h4>
      <p className="mb-4">
        A primitive is a simple non-object data type that represents a single value. Java’s primitive data types are:
      </p>
      <img src="/Org_code/images/datatype.png" alt="Primitive Data Types" className="mb-4 rounded shadow" />
      <SyntaxHighlighter language="java" style={atomDark} customStyle={{ borderRadius: '0.375rem', padding: '1rem', margin: '1rem 0' }} className="text-sm shadow-md max-w-full overflow-x-auto">
        {`Type var [=Initial value];`}
      </SyntaxHighlighter>
      <SyntaxHighlighter language="java" style={atomDark} customStyle={{ borderRadius: '0.375rem', padding: '1rem', margin: '1rem 0' }} className="text-sm shadow-md max-w-full overflow-x-auto">
        {`int RollID;
char type='A';`}
      </SyntaxHighlighter>
      <img src="/Org_code/images/PrimaryDataType.png" alt="Primary Data Types" className="mb-4 rounded shadow" />

      <h4 className="text-lg font-semibold mb-2">Reference Type</h4>
      <p className="mb-4">
        Following are the reference types in Java.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Class</strong> types − This reference type points to an object of a class.</li>
        <li><strong>Array</strong> types − This reference type points to an array.</li>
        <li><strong>Interface</strong> types − This reference type points to an object of a class which implements an interface.</li>
      </ul>
      <p className="mb-4">
        Once we create a variable of these types (i.e. when we create an array or object, class or interface). These variables only store the address of these values. Default value of any reference variable is null. A reference variable can be used to refer any object of the declared type or any compatible type.
      </p>
      <p className="mb-4 font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
        String s=new String("Hello");
      </p>
      <SyntaxHighlighter language="java" style={atomDark} customStyle={{ borderRadius: '0.375rem', padding: '1rem', margin: '1rem 0' }} className="text-sm shadow-md max-w-full overflow-x-auto">
        {`int[] ar;
ar= new int[3];
ar[0]=1; ar[1]=2; ar[2]=3;`}
      </SyntaxHighlighter>
      <img src="/Org_code/images/referenceDatatype.png" alt="Reference Data Types" className="mb-4 rounded shadow" />
      <img src="/Org_code/images/array.png" alt="Array" className="mb-4 rounded shadow" />

      <h3 className="text-xl font-semibold mb-2">Scope</h3>
      <p className="mb-4">
        The scope of a declaration is the portion of a program over which that declaration is visible. Scopes include:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>function scope - visible to the source code within the function</li>
        <li>class scope - visible to the member functions of the class</li>
        <li>block scope - visible to the code block</li>
        <li>global scope - visible to the entire program</li>
        <li>file scope - visible to the source code within the file</li>
      </ul>
      <p className="mb-4">
        The scope of a non-global declaration begins at the declaration and ends at the closing brace for that declaration. A non-global declaration is called a local declaration.
      </p>

      <h3 className="text-xl font-semibold mb-2">One Dimensional Arrays</h3>
      <p className="mb-4">
        An array is a container object that holds a fixed number of values of a single type.  
        The length of an array is established when the array is created.  
        Each item in an array is called an element, and each element is accessed by its numerical index.
      </p>
      <img src="/Org_code/images/array2.png" alt="One Dimensional Array" className="mb-4 rounded shadow" />
      <SyntaxHighlighter language="java" style={atomDark} customStyle={{ borderRadius: '0.375rem', padding: '1rem', margin: '1rem 0' }} className="text-sm shadow-md max-w-full overflow-x-auto">
        {`int[] ar;  // for detail click here
float anArrayOfFloats[];`}
      </SyntaxHighlighter>

      <h3 className="text-xl font-semibold mb-2">Multiple Dimensional Arrays</h3>
      <p className="mb-4">
        Consider the example:
      </p>
      <img src="/Org_code/images/2DarrayCode.png" alt="2D Array Code" className="mb-4 rounded shadow" />
      <p className="mb-4">
        This is a sample memory map of the above code
      </p>
      <img src="/Org_code/images/2Darray.png" alt="2D Array Memory Map" className="mb-4 rounded shadow" />

      <p className="mb-4">
        we have created a multidimensional array named <em>m</em>, it holds 8 elements. The variable m is storing the value: <em>8000</em> that is the address of an array. m can be seen as an array of one–dimensional array.  
        In the above example, the statement: m[1]=replacement to assign 1000 to m at index 1.  
        Now, the m can hold 12 elements.  
        output: <em>1,2,3,4,5,6,7,8,9,10,2001,2002</em>
      </p>

      <h3 className="text-xl font-semibold mb-2">Operators</h3>
      <img src="/Org_code/images/Operator.png" alt="Operators" className="mb-4 rounded shadow" />
      <img src="/Org_code/images/operator2.png" alt="Operators 2" className="mb-4 rounded shadow" />
      <img src="/Org_code/images/operator3.png" alt="Operators 3" className="mb-4 rounded shadow" />

      <h3 className="text-xl font-semibold mb-2">Logic constructs</h3>
      <p className="mb-4">
        The statements inside your source files are generally executed from top to bottom, in the order that they appear. Control flow statements, however, break up the flow of execution by employing decision making, looping, and branching, enabling your program to conditionally execute particular blocks of code. This section describes the decision-making statements (if-then, if-then-else, switch), the looping statements (for, while, do-while), and the branching statements (break, continue, return) supported by the Java programming language.
      </p>
      <ul className="list-disc list-inside mb-4">
        <li><a href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/if.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">if statement</a> [for detail]</li>
        <li><a href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">switch statement</a> [for detail]</li>
        <li><a href="https://docs.oracle.com/javase/tutorial/java/nutsandbolts/while.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">while, do, for statements</a> [for detail]</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Summary</h3>
      <ul className="list-disc list-inside mb-4">
        <li>a declaration associates an identifier with a type</li>
        <li>a definition attaches meaning to an identifier and is an executable statement</li>
        <li>the scope of a declaration is that part of the program throughout which the declaration is visible</li>
        <li>The types of the Java are primitive types and reference types</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">Course Slide</h3>
      <p>
        - <a href="/Org_code/resource/Learning the Java Language.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Learning the Java Language.pdf</a>
      </p>

      <h3 className="text-xl font-semibold mb-2">Reading</h3>
      <ul className="list-disc list-inside mb-4">
        <li><a href="/Org_code/resource/Download & Install JDK & NetBeans 8.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Download & Install JDK & NetBeans 8.pdf</a></li>
        <li><a href="/Org_code/resource/Get start.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">How to compile and run a Java program.pdf</a></li>
        <li><a href="/Org_code/resource/Numbers and Strings.pdf" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Number and String in Java.pdf</a></li>
      </ul>
    </div>
  );
};

export default FoundationsCourseSection;
