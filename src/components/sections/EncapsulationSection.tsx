import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

const javaCode = `public class Car {
    //fields
    private String Colour;
    private int EnginePower;
    private boolean Convertible;
    private boolean parkingBrake;
    //methods
    public Car(){
        Colour="";
        EnginePower=0;
        Convertible=false;
        parkingBrake=false;
    }

    public Car(String Colour, int EnginePower, boolean Convertible, boolean parkingBrake) {
        this.Colour = Colour;
        this.EnginePower = EnginePower;
        this.Convertible = Convertible;
        this.parkingBrake = parkingBrake;
    }
    
    public void pressStartButton(){
        System.out.println("You can press the star button");
    }
    public void pressAcceleratorButton(){
        System.out.println("You can press the accelerator button");
        System.out.println("Colour:"+ Colour);
        System.out.println("Engine power:"+ EnginePower);
        System.out.println("Convertible:"+ Convertible);
        System.out.println("parking brake:"+ parkingBrake);
    }

    public void setColour(String Colour) {
        this.Colour = Colour;
    }

    public String getColour() {
        return Colour;
    }

    public int getEnginePower() {
        return EnginePower;
    }

    public void setEnginePower(int EnginePower) {
        this.EnginePower = EnginePower;
    }

    public boolean isConvertible() {
        return Convertible;
    }

    public void setConvertible(boolean Convertible) {
        this.Convertible = Convertible;
    }

    public boolean isParkingBrake() {
        return parkingBrake;
    }

    public void setParkingBrake(boolean parkingBrake) {
        this.parkingBrake = parkingBrake;
    }
    
    public static void main(String[] args) {
          Car c=new Car();
          c.pressStartButton();
          c.pressAcceleratorButton();
          
          Car c2=new Car();
          c2.pressAcceleratorButton();
          
          Car c3=new Car("red", 100, true, true);
          c3.pressAcceleratorButton();
          c3.setColour("black");
          System.out.println("Colour of c3:" + c3.getColour());
    }
}`;

const EncapsulationSection = () => {
  return (
    <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Encapsulation</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Class and Object</h2>
        <p className="mb-2"><b>Class</b></p>
        <p>In the previous topic, we saw the term “class” but did not give enough consideration to its meaning. Now we can establish a useful definition:</p>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-2 dark:bg-blue-900 dark:border-blue-300 dark:text-white">A <b>class</b> is an organisational unit of an Object Oriented design and program.</div>
        <div className="mb-2">
          <a href="https://www.w3schools.com/java/java_oop.asp" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">see class definitions on the w3schools page</a><br/>
          <a href="https://open.umn.edu/opentextbooks/textbooks/java-java-java-object-oriented-problem-solving?fbclid=IwAR2_jsAY7ldx2i-178wHimdAkCz0k65ZBVUR7G7OJSNpN3cikA3sPlGQBcQ" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">see class definitions from other authors</a>
        </div>
        <ul className="list-disc ml-6 mb-2">
          <li><b>Highly cohesive:</b> the class represents a single useful entity or organisational unit and does that job well.</li>
          <li><b>Minimally coupled:</b> the class limits its interactions with other classes to only those that are really necessary for it to do what it is designed to do.</li>
          <li><b>Encapsulation:</b> the class keeps information necessary to its internal operation private and does not expose it to other classes, and only makes public the information.</li>
        </ul>
        <p>So whenever we want to create an OO program, we should give thought to the notion of OO design and think about what classes or entities we need to create, using the principles of high cohesion, low coupling and encapsulation as our guide.</p>
        <p className="mt-2">A formal definition of a <b>class</b> includes two key components: <b>Fields(Attributes)</b> and <b>Methods(Behaviors)</b></p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-2 dark:bg-yellow-600 dark:border-yellow-300 dark:text-white">This is a good time to start.</div>
        <div className="bg-gray-50 border-l-4 border-gray-400 p-4 my-2 dark:bg-gray-700 dark:border-gray-300 dark:text-white"><b>Problem:</b> A sports car can be one of a variety of colours, with an engine power between 100 HP and 200 HP. It can be a convertible or a regular model. The car has a button that starts the engine and a parking brake. When the parking brake is released and you press the accelerator, it drives in the direction determined by the transmission setting.</div>
        <h3 className="font-semibold mt-4">Design guideline:</h3>
        <ol className="list-decimal ml-6 mb-2">
          <li><b>Looking for main nouns</b>, classes are often described by main nouns in the problem.</li>
          <li><b>Looking for auxiliary nouns</b> that describe details of the main noun, Fields or Attributes are often described by auxiliary nouns.</li>
          <li><b>Looking for verbs</b>, methods or behaviors are often described by verbs.</li>
          <li><b>Find the relationship</b> among classes. <b>TIPS</b>: <em>If your problem has two main nouns. They have often the relationship.</em></li>
        </ol>
        <img src="/Org_code/images/encapsulation1.png" alt="Encapsulation example 1" className="my-4" />
        <p>We use Unified Modeling Language(UML) to describe the class structure. UML provides mechanisms to represent class members, such as attributes and methods, and additional information.</p>
          <a href="https://en.wikipedia.org/wiki/Class_diagram" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Read this article to get more about UML{'>'}</a>
        <p className="mt-2">A UML class diagram is used to represent the Car class</p>
        <img src="/Org_code/images/encapsulation2.png" alt="Encapsulation example 2" className="my-4" />
        <h3 className="font-semibold mt-4">How to draw the class structure?</h3>
        <ul className="list-disc ml-6 mb-2">
          <li>put main noun(Car) to make the class name</li>
          <li>put auxiliary nouns(nouns describe the detail of Car) to make fields</li>
          <li>put verbs to make methods</li>
          <li>To specify the visibility of a class member from other classes (i.e. any attribute or method), these notations(-,+,#,~) must be placed before the member's name. (In Java, '~' is replaced by ' '). <a href="https://en.wikipedia.org/wiki/Class_diagram" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">get more notations{'>'}</a></li>
        </ul>
        <p>Now, You will implement this class in Java. In your editor, create a new file named Car.java (<b>Note</b>: the file named the same as the class name). The code of Car class:</p>
        <SyntaxHighlighter
          language="java"
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            borderRadius: '0.375rem',
            padding: '1rem',
            margin: '1rem 0',
          }}
          className="text-sm shadow-md max-w-full overflow-x-auto"
        >
          {javaCode}
        </SyntaxHighlighter>
        <img src="/Org_code/images/demoCarClass.png" alt="Demo Car Class" className="my-4" />
        <img src="/Org_code/images/outputCarClass.png" alt="Output Car Class" className="my-4" />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Constructor</h2>
        <p>Complete encapsulation requires a mechanism for initializing data members at creation-time. Without initialization at creation-time, an object's data members contain undefined values until client code calls a modifier that sets that data.</p>
        <p>The special member function that any object invokes at creation-time is called its class' constructor.</p>
        <p>The example above, the special method <b>Car()&#123;...&#125;</b> is inserted to the file Car.java. It is called the <b>default constructor</b>. Therefore, all fields of c or c2 are assigned to empty values. Values are called the <b>state of object</b>. Initializing an object's instance variables in a constructor ensures that the object has a well-defined state from the time of its creation.</p>
        <p>The default constructor takes its name from the class itself. The prototype for this no-argument constructor takes the form <b>ClassName()</b></p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Overloading Constructor</h2>
        <p>Overloading a class' constructor adds communication options for client code. Client code can select the most appropriate set of arguments at creation time.</p>
        <img src="/Org_code/images/Encapsulation8.png" alt="Encapsulation8" className="my-4" />
        <p>This method is called the <b>constructor with parameters</b>.</p>
        <img src="/Org_code/images/encapsulation9.png" alt="Encapsulation9" className="my-4" />
        <p>In the above code, the third object c3 is created and c3 invokes the constructor with parameters. All fields of c3 are assigned as {'{"red", 100, true, true}'}. </p>
        <img src="/Org_code/images/encapsulation10.png" alt="Encapsulation10" className="my-4" />
        <p>Because c3 invokes pressAcceleratorButton(), The state of c3 is printed out.</p>
        <img src="/Org_code/images/encapsulation11.png" alt="Encapsulation11" className="my-4" />
        <p><b>Note</b>: If the class definition includes the prototype for a constructor with some parameters but does not include the prototype for a no-argument default constructor, the compiler DOES NOT insert an empty-body, no-argument default constructor. The compiler only inserts an empty-body, no-argument default constructor if the class definition does not declare ANY constructor.</p>
        <p>All methods that are implemented in the Car class at the time are called member methods/functions.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">The current Object</h2>
        <p>When run <b>"c1.pressAcceleratorButton();"</b>, c1 invokes the method =&gt; the object (is handled by c1) is the current object at the time.</p>
        <p>When run <b>"c2.pressAcceleratorButton();"</b>, c2 invokes the method =&gt; the object (is handled by c2) is the current object at the time.</p>
        <p><b>This</b></p>
        <p>The keyword <b>this</b> returns the address of the current object. That is, this holds the address of the region of memory that contains all of the data stored in the instance variables of current object.</p>
        <p><b>Scope of this:</b> This is created and used just when the member method is called. After the member method terminates <b>this</b> will be discarded.</p>
        <a href="https://www.javatpoint.com/this-keyword" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">more</a>
        <img src="/Org_code/images/Encapsulation12.png" alt="Encapsulation12" className="my-4" />
        <p>Upon entering the constructor with parameters, the pointer <b>this</b> is created by Java and it is storing the address of the object (4000). <b>c3 and this</b> are pointing to the current object. Using <b>this</b> in here to distinguish local variable and instance variable/field. After assigning values of input parameters to instance variables of c3, <b>this</b> will be discarded.</p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-2 dark:bg-yellow-600 dark:border-yellow-300 dark:text-white"><b>TIPS</b>: If parameters (formal arguments) of a member method and instance variables/fields are same. So, we are using this keyword to distinguish local variable and instance variable.</div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Member functions</h2>
        <p>Member functions are the functions, which have their declaration inside the class definition and work on the data members of the class.</p>
        <p>At the time, the Car class contains member functions as:</p>
        <img src="/Org_code/images/encapsulation13.png" alt="Encapsulation13" className="my-4" />
        <p>After an object is created and assigned default values. Now, if you want to set one instance variable to other value. for example, change only one instance variable colour of c3 to 'black'. What solution for this case?</p>
        <p>It's OK, we will add more a method <b>setColour()</b> to the Car class design. The code as:</p>
        <img src="/Org_code/images/encapsulation14.png" alt="Encapsulation14" className="my-4" />
        <p>The main code:</p>
        <img src="/Org_code/images/encapsulation15.png" alt="Encapsulation15" className="my-4" />
        <p>the pointer <b>c3 invokes setColour("black")</b>. Therefore, at the time <b>this.Colour=...</b> is used to access to instance variable of c3.</p>
        <p>The same above idea, if you want to get the value of one instance variable you should add more a method <b>getColour()</b></p>
        <img src="/Org_code/images/encapsulation16.png" alt="Encapsulation16" className="my-4" />
        <p>You can also add more other getters/setters. The completed code:</p>
        <SyntaxHighlighter
          language="java"
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            borderRadius: '0.375rem',
            padding: '1rem',
            margin: '1rem 0',
          }}
          className="text-sm shadow-md max-w-full overflow-x-auto"
        >
          {javaCode}
        </SyntaxHighlighter>
        <div className="bg-gray-50 border-l-4 border-gray-400 p-4 my-2 dark:bg-gray-700 dark:border-gray-300 dark:text-white">
          <b>Output:</b>
          <pre className="whitespace-pre-wrap">You can press the star button
You can press the accelerator button
Colour:
Engine power:0
Convertible:false
parking brake:false
You can press the accelerator button
Colour:
Engine power:0
Convertible:false
parking brake:false
You can press the accelerator button
Colour:red
Engine power:100
Convertible:true
parking brake:true
Colour of c3:black</pre>
        </div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-2 dark:bg-yellow-600 dark:border-yellow-300 dark:text-white"><b>TIPS</b>: A class often has method four groups. Constructors, getters, setters and other logic methods. Any method that is put in the class will operate on fields in its class.</div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Package</h2>
        <p>A <i>package</i> is a namespace that organizes a set of related classes and interfaces. Conceptually you can think of packages as being similar to different folders on your computer.</p>
        <p>Because software written in the Java programming language can be composed of hundreds or thousands of individual classes, it makes sense to keep things organized by placing related classes and interfaces into packages.</p>
        <a href="https://docs.oracle.com/javase/tutorial/java/concepts/package.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">see more at Oracle</a><br/>
        <a href="https://www.geeksforgeeks.org/packages-in-java/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">see more at other page</a>
        <h3 className="font-semibold mt-4">Creating a package</h3>
        <p>To create a package, you choose a name for the package and put a package statement with that name at the top of every source file that contains the types (classes, interfaces, enumerations, and annotation types) that you want to include in the package.</p>
        <p>The package statement (for example, <i>package mypkg;</i>) must be the first line in the source file. There can be only one package statement in each source file, and it applies to all types in the file.</p>
        <img src="/Org_code/images/package.png" alt="Package Example" className="my-4" />
          <a href="https://docs.oracle.com/javase/tutorial/java/package/createpkgs.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">read more{'>'}</a>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Access Modifier</h2>
        <p>To specify the visibility of a class member (i.e. any attribute or method), we use:</p>
        <ul className="list-disc ml-6 mb-2">
          <li>private: -</li>
          <li>public: +</li>
          <li>protected: #</li>
          <li>default: if don't any notation, it is treated as default</li>
        </ul>
        <p>these keywords are called <b>access modifier</b></p>
        <img src="/Org_code/images/encapsulation20.png" alt="Encapsulation20" className="my-4" />
        <p>Let's understand the access modifiers in Java by a simple table.</p>
        <img src="/Org_code/images/encapsulation21.png" alt="Encapsulation21" className="my-4" />
        <h3 className="font-semibold mt-4">private</h3>
        <p>The private access modifier is accessible only within the class.</p>
        <p>We cut the method main in the file Car.java. Paste it to the other file named Tester.java.</p>
        <SyntaxHighlighter
          language="java"
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            borderRadius: '0.375rem',
            padding: '1rem',
            margin: '1rem 0',
          }}
          className="text-sm shadow-md max-w-full overflow-x-auto"
        >
{`public class Tester {
        public static void main(String[] args) {
          Car c=new Car();
          c.pressStartButton();
          c.pressAcceleratorButton();
          
          Car c2=new Car();
          c2.pressAcceleratorButton();
          
          Car c3=new Car("red", 100, true, true);
          c3.pressAcceleratorButton();
          c3.setColour("black");
          System.out.println("Colour of c3:" + c3.getColour());
          //access the instance variable Colour of c
          c.Colour="Gray"; // error
    }
}`}
        </SyntaxHighlighter>
        <p>In the method main, Using <b>c.Colour="Gray"</b> will cause an error because it is private data. Also , all private members can not access from other classes</p>
        <h3 className="font-semibold mt-4">public</h3>
        <p>The <b>public</b> access modifier is accessible everywhere.</p>
        <p>In the above example, the Car class is public to can use it everywhere. In the Tester.java, we can also access to public methods.</p>
        <h3 className="font-semibold mt-4">default</h3>
        <p>If you don't use any modifier, it is treated as default by default. The default modifier is accessible only within package. It cannot be accessed from outside the package. It provides more accessibility than private. But, it is more restrictive than protected, and public.</p>
        <p>Edit the file Car.java</p>
        <SyntaxHighlighter
          language="java"
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            borderRadius: '0.375rem',
            padding: '1rem',
            margin: '1rem 0',
          }}
          className="text-sm shadow-md max-w-full overflow-x-auto"
        >
{`package A;
public class Car {
    //fields
    private String Colour;
    private int EnginePower;
    private boolean Convertible;
    private boolean parkingBrake;
    //methods
    public Car(){
        Colour="";
        EnginePower=0;
        Convertible=false;
        parkingBrake=false;
    }

    public Car(String Colour, int EnginePower, boolean Convertible, boolean parkingBrake) {
        this.Colour = Colour;
        this.EnginePower = EnginePower;
        this.Convertible = Convertible;
        this.parkingBrake = parkingBrake;
    }
    
    void pressStartButton(){
        System.out.println("You can press the star button");
    }
}`}
        </SyntaxHighlighter>
        <p>Edit the file Tester.java</p>
        <SyntaxHighlighter
          language="java"
          style={vscDarkPlus}
          showLineNumbers={true}
          customStyle={{
            borderRadius: '0.375rem',
            padding: '1rem',
            margin: '1rem 0',
          }}
          className="text-sm shadow-md max-w-full overflow-x-auto"
        >
{`package B;
import A.Car;
public class Tester {
        public static void main(String[] args) {
          Car c=new Car();
          c.pressStartButton();        // error
          c.pressAcceleratorButton();
          
          Car c2=new Car();
          c2.pressAcceleratorButton();
          
          Car c3=new Car("red", 100, true, true);
          c3.pressAcceleratorButton();
          c3.setColour("black");
          System.out.println("Colour of c3:" + c3.getColour());
    }
}`}
        </SyntaxHighlighter>
        <p>Because the method <b>pressStartButton()</b> is default, in the method main we can not invoke this.</p>
        <h3 className="font-semibold mt-4">protected</h3>
        <p>The protected access modifier is accessible within package and outside the package but through inheritance only.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Summary</h2>
        <ul className="list-disc ml-6 mb-2">
          <li>Encapsulation is a way of packaging data and methods together into one unit. <a href="https://www.w3schools.in/java-tutorial/encapsulation" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">more</a></li>
          <li>To achieve encapsulation, declare fields as private</li>
          <li>Provide public get and set methods to access and update the value of a private variable</li>
          <li>The constructor is a special member function that an object invokes at creation time, the name of the constructor is the name of the class, not have return types</li>
          <li>The compiler inserts an empty body constructor into any class definition that does not declare a constructor</li>
          <li>The current values are storing in instance variables of a object is called the state</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Course Slide</h2>
        <ul>
          <li><a href="/Org_code/resource/Encapsulation.pdf" download className="text-blue-600 underline">Encapsulation.pdf</a></li>
        </ul>
      </section>
    </div>
  );
};

export default EncapsulationSection;
