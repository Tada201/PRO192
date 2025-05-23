import CopyableCodeBlock from './CopyableCodeBlock';

const DynamicMemorySection = () => {
  return (
    <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Memory Management in Java</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Static and Dynamic Heap and Stack</h2>
        <p className="mb-4">
          In Java, memory management is the process of allocation and de-allocation of objects. Java does memory management automatically using a garbage collector, so you do not need to implement memory management logic in your application.
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>Read more: <a href="https://docs.oracle.com/cd/E13150_01/jrockit_jvm/jrockit/geninfo/diagnos/garbage_collect.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Oracle Docs</a></li>
          <li>Read more: <a href="https://www.javatpoint.com/memory-management-in-java" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">JavaTpoint</a></li>
        </ul>
        <p className="mb-4">
          Allocation happens directly when you create an object with <code>new</code> and indirectly when you call a method with local variables or arguments. Local data of a method (return data, parameters, variables) is allocated on the <b>stack</b> and discarded when the method exits, but objects are allocated on the <b>heap</b> and have a longer lifetime.
        </p>
        <h3 className="text-xl font-semibold mb-2">Static and Dynamic Heap and Stack</h3>
        <ul className="list-disc ml-6 mb-2">
          <li><b>Static heap</b>: Contains class declarations when classes are loaded. Use the <code>static</code> keyword for static methods, variables, classes, and blocks.</li>
          <li><b>Dynamic heap</b>: The runtime data area for all Java objects and arrays. Created when the JVM starts and may grow/shrink as the application runs. Objects not used become garbage and are de-allocated.</li>
          <li><b>Stack</b>: Memory for temporary variables and method calls. Each method call creates a new block in the stack for its local values and references. When the method ends, the block is erased.</li>
        </ul>
        <img src="/Org_code/images/memory.png" alt="Java memory layout" className="my-4" />
        <ol className="list-decimal ml-6 mb-2">
          <li>When the program runs, the class definition <b>Tester</b> is loaded to static heap.</li>
          <li>Running <b>main</b> creates stack space for variables <code>age</code> and <code>sc</code>. <code>age</code> is stored directly in stack; <code>sc</code> points to a <b>Scanner</b> object in heap.</li>
          <li>When <b>main</b> finishes, its stack space is discarded. <code>age</code> and <code>sc</code> are killed.</li>
          <li>The <b>Scanner</b> object in heap still exists and becomes garbage.</li>
        </ol>
        <img src="/Org_code/images/memory2.png" alt="Java memory after main" className="my-4" />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Dynamic Allocation</h2>
        <p className="mb-4">Example code:</p>
        <CopyableCodeBlock language="java">
{`public static void main(String[] args) {
    int a[] = new int[5];   // [1]
    String s = new String("hello");  // [2]
}`}
        </CopyableCodeBlock>
        <ul className="list-disc ml-6 mb-2">
          <li>When <b>main</b> runs, <code>a</code> and <code>s</code> are allocated in stack memory as references.</li>
          <li>At [1], <code>new</code> allocates memory in heap for an array of 5 elements and returns its address to <code>a</code>.</li>
          <li>At [2], <code>new</code> allocates memory in heap for the string "hello" and returns its address to <code>s</code>.</li>
        </ul>
        <img src="/Org_code/images/allocation.png" alt="Dynamic allocation" className="my-4" />
        <p className="mb-4">To make a reference point to nothing, use <code>null</code>:</p>
        <CopyableCodeBlock language="java">
{`int a[]=null;
String s=null;`}
        </CopyableCodeBlock>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Dynamic Deallocation</h2>
        <p className="mb-4">
          In Java, you never explicitly free memory. Java provides <b>automatic garbage collection</b>. Local variables in a method are allocated when the method runs and deallocated automatically when it terminates. Unused objects in heap memory are deallocated by the Java system.
        </p>
        <img src="/Org_code/images/memory3.png" alt="Scope and garbage collection" className="my-4" />
        <p className="mb-4">
          When the program runs to a certain line, variables may go out of scope and objects become garbage. Setting a reference to <code>null</code> also makes the object eligible for garbage collection.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Garbage Collection</h2>
        <p className="mb-4">
          The JVM supports a garbage collector to free Java programmers from explicitly managing heap memory. It is called by the JVM only and cannot be activated manually. The Java heap is managed by two lists: free block list and allocated block list. After many allocations and de-allocations, memory may become fragmented.
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>Read more: <a href="https://www.oracle.com/technetwork/java/javase/memorymanagement-whitepaper-150215.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Java Memory Management Whitepaper</a></li>
          <li>Read more: <a href="https://www.oracle.com/webfolder/technetwork/tutorials/obe/java/gc01/index.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Garbage Collection in Java</a></li>
        </ul>
        <p className="mb-4">
          The runtime system keeps track of allocated memory and determines whether it is still usable. The garbage collector runs only when the system heap becomes exhausted and has the lowest priority. If objects are garbage, they are deallocated automatically.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Summary</h2>
        <ul className="list-disc ml-6 mb-2">
          <li>The memory available to an application at run-time consists of static and dynamic heap and stack</li>
          <li>Static memory contains class definitions and shared data of the application</li>
          <li>Java supports dynamic memory for applications at run-time upon request</li>
          <li>The keyword <b>new</b> allocates a region of dynamic memory and returns its starting address</li>
          <li>We store the address of dynamically allocated memory in the reference variable</li>
          <li>Deallocation is made by Garbage Collector</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Course Slide</h2>
        <ul>
          <li><a href="/resource/Memory Management in Java.pdf" download className="text-blue-600 underline">Memory Management in Java.pdf</a></li>
        </ul>
      </section>
    </div>
  );
};

export default DynamicMemorySection;
