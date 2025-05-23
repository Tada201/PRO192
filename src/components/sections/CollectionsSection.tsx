import CopyableCodeBlock from './CopyableCodeBlock';

const CollectionsSection = () => {
  return (
    <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Collection Framework in Java</h1>
      <section className="mb-8">
        <p className="mb-4">
          In almost all real problems, data related to a problem are groups, each group contains many objects. A group of objects is called a <b>collection</b>. In Java, a collection framework is introduced to support tools for managing collections more easily.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Overview of Abstract Data Types</h2>
        <p className="mb-4">
          An <b>abstract data type (ADT)</b> is a mathematical model for a data type, defined by its behaviors from the user's point of view. In Java, ADTs are often declared as interfaces. Collections, sets, and maps are all ADTs.
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>Add new element</li>
          <li>Search an element</li>
          <li>Remove an element</li>
          <li>Traverse (access all elements one-by-one)</li>
          <li>Sort elements</li>
        </ul>
        <p className="mb-4 italic">ADT (mathematical model, user view) contrasts with data structure, which is a concrete representation of data (implementer view, physical view).</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Java Collections Framework</h2>
        <p className="mb-4">
          The Java Collections Framework provides a unified architecture for representing and manipulating collections. It includes interfaces, implementations, and algorithms for working with groups of objects.
        </p>
        <ul className="list-disc ml-6 mb-2">
          <li>Reduces programming effort by providing data structures and algorithms so you don't have to write them yourself.</li>
          <li>Increases performance by providing high-performance implementations of data structures and algorithms.</li>
          <li>Provides interoperability between unrelated APIs by establishing a common language to pass collections back and forth.</li>
          <li>Reduces the effort required to learn APIs by requiring you to learn multiple ad hoc collection APIs.</li>
          <li>Reduces the effort required to design and implement APIs by not requiring you to produce ad hoc collections APIs.</li>
          <li>Fosters software reuse by providing a standard interface for collections and algorithms with which to manipulate them.</li>
        </ul>
        <img src="/Org_code/images/7.01.gif" alt="Collections framework interface structure" className="my-4" />
        <img src="/Org_code/images/7.0.1.1.gif" alt="Collection Implementations" className="my-4" />
        <p>For more details, see the <a href="https://docs.oracle.com/javase/7/docs/api/java/util/package-tree.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Javadoc</a>.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">List and ArrayList</h2>
        <p className="mb-4">All references to elements are stored in a one-dimensional array, called an array list. This organization can be used to store arbitrary elements and they can be duplicated.</p>
        <img src="/Org_code/images/7.02.gif" alt="ArrayList demonstration" className="my-4" />
        <img src="/Org_code/images/7.0.2.2.gif" alt="ArrayList characteristics" className="my-4" />
        <p className="mb-4">If objects in a collection do not belong to the same class, references in a collection will behave as references to objects of the Object class. Based on OOP inheritance, the following assignment is valid: <code>Father_reference = Son_reference;</code></p>
        <p className="mb-4">When using generics, you can specify the element type for type safety and to avoid casting.</p>
        <CopyableCodeBlock language="java">
{`ArrayList<Rectangle> list = new ArrayList<>();
list.add(new Rectangle(2, 3));
Rectangle r = list.get(0); // No cast needed`}
        </CopyableCodeBlock>
        <h3 className="text-xl font-semibold mb-2 mt-6">Demonstrations</h3>
        <div className="mb-4">
          <b>Demonstration 1:</b> Using an ArrayList of arbitrary elements.
          <img src="/Org_code/images/7.03a.gif" alt="ArrayList arbitrary elements" className="my-4" />
          <img src="/Org_code/images/7.03b.gif" alt="Objects of Rectangle in ArrayList" className="my-4" />
        </div>
        <div className="mb-4">
          <b>Experiment:</b> If you want to call a method specific to a subclass, you must cast.
        </div>
        <div className="mb-4">
          <b>Demonstration 2:</b> Using an ArrayList for storing the same-type elements.
          <img src="/Org_code/images/7.04.gif" alt="ArrayList same-type elements" className="my-4" />
        </div>
        <div className="mb-4">
          <b>Demonstration 3:</b> Managing a list of students with ArrayList.
          <img src="/Org_code/images/7.05.gif" alt="Class Design" className="my-4" />
          <img src="/Org_code/images/7.06a.gif" alt="Algorithm 1" className="my-4" />
          <img src="/Org_code/images/7.06b.gif" alt="Algorithm 2" className="my-4" />
          <img src="/Org_code/images/7.06c.gif" alt="Algorithm 3" className="my-4" />
          <img src="/Org_code/images/7.06d.gif" alt="Algorithm 4" className="my-4" />
          <img src="/Org_code/images/7.06e.gif" alt="Algorithm 5" className="my-4" />
          <img src="/Org_code/images/7.06f.gif" alt="Algorithm 6" className="my-4" />
          <img src="/Org_code/images/7.06g.gif" alt="Algorithm 7" className="my-4" />
          <img src="/Org_code/images/7.06h.gif" alt="Algorithm 8" className="my-4" />
          <img src="/Org_code/images/7.06i.gif" alt="Algorithm 9" className="my-4" />
          <img src="/Org_code/images/7.06j.gif" alt="Algorithm 10" className="my-4" />
          <img src="/Org_code/images/7.06k.gif" alt="Algorithm 11" className="my-4" />
        </div>
        <div className="mb-4">
          <b>Test cases:</b>
          <CopyableCodeBlock language="text">
{`Student managing Program
1-Add new student
2-Search a student
3-Update name and mark
4-Remove a student
5-List all
6-Quit
Choose 1..6:`}
          </CopyableCodeBlock>
          <img src="/Org_code/images/7.0.6l.gif" alt="Student managing menu" className="my-4" />
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Set and TreeSet</h2>
        <p className="mb-4">A <b>Set</b> is a group of distinct objects. The <b>TreeSet</b> class stores elements in a sorted, self-balancing tree structure. Duplicates are not allowed.</p>
        <img src="/Org_code/images/7.07.gif" alt="TreeSet structure" className="my-4" />
        <p className="mb-4">TreeSet is implemented as a <a href="https://www.tutorialspoint.com/data_structures_algorithms/avl_tree_algorithm.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">self-balanced ordered tree</a>. It guarantees log(n) time cost for the basic operations (add, remove, and contains).</p>
        <ul className="list-disc ml-6 mb-2">
          <li>A sorted group must be maintained.</li>
          <li>Search operation must have high performance.</li>
        </ul>
        <p className="mb-4">Elements must implement <code>Comparable</code> or a <code>Comparator</code> must be provided. The ordering maintained by a set must be consistent with equals if it is to correctly implement the Set interface.</p>
        <h3 className="text-xl font-semibold mb-2 mt-6">Demonstrations</h3>
        <div className="mb-4">
          <b>Demonstration 1:</b> The Student class does not implement any comparison method, so a compile-time error occurs.
          <img src="/Org_code/images/7.13.gif" alt="TreeSet error" className="my-4" />
        </div>
        <div className="mb-4">
          <b>Demonstration 2:</b> TreeSet of integers (Integer implements Comparable, no duplicates allowed).
          <img src="/Org_code/images/7.14.gif" alt="TreeSet of integers" className="my-4" />
        </div>
        <div className="mb-4">
          <b>Demonstration 3:</b> TreeSet of user-defined objects (Student), with add, search, remove, ascending and descending traversal.
          <img src="/Org_code/images/7.15a.gif" alt="TreeSet students a" className="my-4" />
          <img src="/Org_code/images/7.15b.gif" alt="TreeSet students b" className="my-4" />
          <img src="/Org_code/images/7.15c.gif" alt="TreeSet students c" className="my-4" />
          <img src="/Org_code/images/7.15d.gif" alt="TreeSet students d" className="my-4" />
          <img src="/Org_code/images/7.15e.gif" alt="TreeSet students e" className="my-4" />
          <img src="/Org_code/images/7.15f.gif" alt="TreeSet students output" className="my-4" />
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Map and HashMap</h2>
        <p className="mb-4">A <b>Map</b> associates unique keys with values. The <b>HashMap</b> class provides a hash-table-based implementation of the Map interface, allowing fast access to values by key.</p>
        <img src="/Org_code/images/7.16.gif" alt="Map structure" className="my-4" />
        <p className="mb-4">A Map is like a dictionary. Maps check for key uniqueness based on the <code>equals()</code> method, not the <code>==</code> operator. The key can be a number or a string (such as Student ID, product ID).</p>
        <img src="/Org_code/images/7.17.gif" alt="Hash function and hash-table" className="my-4" />
        <p className="mb-4">A hash-table is a set of subsets but the position index is determined by a function, called a <b>hash function (h)</b>. The mathematical operation, <b>modulo</b> (or mod/ % in programming languages), is commonly used in hash functions.</p>
        <p className="mb-4">This implementation provides constant-time performance for the basic operations (get and put), assuming the hash function disperses the elements properly among the buckets.</p>
        <p>For more details, see the <a href="https://docs.oracle.com/javase/7/docs/api/java/util/HashMap.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Javadoc</a>.</p>
        <h3 className="text-xl font-semibold mb-2 mt-6">Demonstration</h3>
        <div className="mb-4">
          <b>Demonstration 1:</b> An empty hashmap is initiated, then some persons (nickName, person) are put and some basic operations on hashmap are performed.
          <img src="/Org_code/images/7.18a.gif" alt="HashMap demo 1" className="my-4" />
          <img src="/Org_code/images/7.18b.gif" alt="HashMap demo 2" className="my-4" />
          <img src="/Org_code/images/7.18c.gif" alt="HashMap demo 3" className="my-4" />
          <img src="/Org_code/images/7.18d.gif" alt="HashMap demo 4" className="my-4" />
          <img src="/Org_code/images/7.18e.gif" alt="HashMap demo 5" className="my-4" />
          <img src="/Org_code/images/7.18f.gif" alt="HashMap demo 6" className="my-4" />
          <img src="/Org_code/images/7.18g.gif" alt="HashMap output" className="my-4" />
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Supporting Classes</h2>
        <p className="mb-4">Along with the Collections framework, the <b>java.util</b> package also contains supporting classes in which many operations on collections and arrays are implemented. Almost all of these methods are public static. Actions such as sorting, shuffling, copying, searching, composition, finding extreme values (min, max), etc. are implemented.</p>
        <table className="mb-4 border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2">Supporting class</th>
              <th className="px-4 py-2">Parameter of methods</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Java.util.Collections</td>
              <td className="border px-4 py-2">Collection</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Java.util.Arrays</td>
              <td className="border px-4 py-2">Array</td>
            </tr>
          </tbody>
        </table>
        <p className="mb-4">
          <a href="https://docs.oracle.com/javase/7/docs/api/java/util/Collections.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Read more Collections in Javadoc</a><br />
          <a href="https://docs.oracle.com/javase/7/docs/api/java/util/Arrays.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Read more Arrays in Javadoc</a>
        </p>
        <div className="mb-4">
          <b>Demonstration:</b> An ArrayList of employees will be sorted with two mechanisms: (1) sorting by ascending ID; (2) Sorting by descending order by salary.
          <img src="/Org_code/images/7.19a.gif" alt="Sorting ArrayList of employees" className="my-4" />
          <img src="/Org_code/images/7.19b.gif" alt="Sorting by salary" className="my-4" />
          <img src="/Org_code/images/7.19c.gif" alt="Sorting output" className="my-4" />
          <img src="/Org_code/images/7.19d.gif" alt="Sorting output 2" className="my-4" />
        </div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Summary</h2>
        <ul className="list-disc ml-6 mb-2">
          <li>Abstract data type (ADT) is a mathematical model for a data type that is determined based on generalization in which data structure is omitted. In programming languages, an ADT is commonly declared as an interface</li>
          <li>Collection, Set, Map are ADTs</li>
          <li>Java Collections framework, in the java.util package, supports all basic common manipulations on collections, maps, and basic algorithms on collections, arrays are implemented in two supporting classes Collections, Arrays.</li>
          <li>Suggestions for choosing a class for managing a group of elements:</li>
        </ul>
        <table className="mb-4 border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="px-4 py-2">Group characteristics</th>
              <th className="px-4 py-2">The class should be chosen</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Elements can be duplicated</td>
              <td className="border px-4 py-2">Java.util.ArrayList</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Elements must be distinct and sorted and each operation needs high performance.</td>
              <td className="border px-4 py-2">Java.util.TreeSet</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Each element contains a unique key and operations must have very high performance</td>
              <td className="border px-4 py-2">Java.util.HashMap</td>
            </tr>
          </tbody>
        </table>
        <p className="mb-4">For extra operations on collections and arrays such as sorting, copying, etc., refer to classes: java.util.Collections and java.util.Arrays.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Course Slide</h2>
        <ul>
          <li><a href="/Org_code/resource/Collections.pdf" download className="text-blue-600 underline">Collections.pdf</a></li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Reading</h2>
        <ul>
          <li><a href="/Org_code/resource/Support Classes.pdf" download className="text-blue-600 underline">Support Classes.pdf</a></li>
        </ul>
      </section>
    </div>
  );
};

export default CollectionsSection;
