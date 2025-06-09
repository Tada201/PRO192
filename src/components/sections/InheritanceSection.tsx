import CopyableCodeBlock from './CopyableCodeBlock';

const InheritanceSection = () => {
  return (
    <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Inheritance</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Definition</h2>
        <p>Object-oriented languages implement reusability of coding structure through inheritance. Inheritance is the second most prominent concept next to encapsulation. It refers to the relationship between classes where one class inherits the entire structure of another class. Inheritance is naturally hierarchical, a tighter relationship than composition and the most highly coupled relationship after friendship.</p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Hierarchies in the Real World</h3>
        <p>For example, the staffing structures in traditional human resource management, with a CEO at the top of the structure, deputies and senior managers beneath that, followed by team leaders and workers. Such structures are useful in making the day to day operations of an organisation manageable. In a retail shop, products are organised and managed in thematic grouping such as hard goods, perishable foods and so on. Such groupings form an integral part of the stock control and checkout management operations. We often use tree diagrams and organograms to capture and visualise these relationships. For example, for the retail shop example:</p>
        <a href="references.html" className="text-blue-600 underline">reference</a> | <a href="https://howtodoinjava.com/java/oops/java-inheritance/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">other definitions</a>
        <img src="/media/inheritance1.png" alt="Inheritance Example 1" className="my-4" />
        <p>In the context of OO design, we are interested in hierarchies that represent the progressive design of a set of classes. The root of our design is a relatively abstract entity, and we build upon that entity to produce progressively more concrete entities. Considering our previous example closer up</p>
        <img src="/media/inheritance2.png" alt="Inheritance Example 2" className="my-4" />
        <p>We note that the entity of an Item is relatively abstract in the sense that we could not go into a shop and purchase one. If we said to a member of staff that we “wish to purchase an item”, we would expect the response “which item?”. We can purchase specific, or concrete entities, but not those that are relatively abstract in their conceptualisation. But that does not mean that the higher-level entities have no value. They just serve as base definitions onto which we can build more concrete entities. We say that that the higher-level entities are <b>“parent”, “base” or “super”</b> classes, and the lower-level ones built from them are <b>“child”, "derived" or “sub”</b> classes.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">"is-a" relationship</h2>
        <p>The key idea here is the <b>“is-a”</b> relationship. Looking at our shop example, we see that <b>HardGood is-a Item</b> and that <b>ElectricalGood is-a HardGood</b> and by extension is-a Item. That suggests that, in type terms, ElectricalGood has type ElectricalGood and also has type of HardGood and ultimately Item. This is the kind of hierarchical relationship that Java and other OO programs are designed to capture.</p>
        <p>Not every real-world hierarchy as we might construe it is suited to this kind of super and sub class analysis. Consider the human resources example referred to earlier. The CEO is the head of the organisation, but does not make much sense as a base class. A senior manager is not also the CEO. A team member is not also a senior manager. So instead of the classic staffing organogram that you might be used to seeing, a more appropriate OO relationship might look something like this:</p>
        <img src="/media/inheritance3.png" alt="Inheritance Example 3" className="my-4" />
        <p>Such an OO compatible hierarchical relationship is an example of the key OO concept of “polymorphism”.</p>
        <p><b>Polymorphism</b> at the class level is the concept that an object can take on more than one form. If an object of class type X has a parent class of type Y, then X can take the form of an object of type either X or Y, and can thus appear in many forms.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Derived and Super Classes</h2>
        <p>In OO design terms we need to consider what attributes and methods a set of classes share. Where we can identify common attributes and methods, we can factorise the design of those classes so that the commonly shared attributes and methods form part of the super class.</p>
        <p>We will use an example to help us understand how this works. Consider a shop that sells antiques items, namely <b>vases</b>, <b>statues and paintings</b>. For now we shall consider just some appropriate attributes for our initial OO analysis:</p>
        <img src="/media/inheritance4.png" alt="Inheritance Example 4" className="my-4" />
        <p>We will make three classes for each of the things that our shop sells. We can see that the classes have some attributes in common, and some that are unique to each class. But we can also see that in reality all three classes are examples of <b>“items”</b> — things that the shop sells. So we can factorise our design with an <b>Item superclass</b>, and then make our <b>three specific classes a sub class</b> of that super class. This is beneficial as it reduces un-necessary code duplication (as well as being a better model of a real-world problem).The super and sub class relationship is represented by an arrow pointing from the sub class towards its super class:</p>
        <img src="/media/inheritance5.png" alt="Inheritance Example 5" className="my-4" />
        <p>To implement the "is-a" relationship of the above class diagram, we use the keyword <b>"extends"</b></p>
        <p>Assume that, these classes are stored in the same package</p>
        <CopyableCodeBlock language="java">
{`public class Item
{ 
     int value;
     String creator;

    //The below is methods that you need to implement
    //default constructor
    public Item(){
         value=0;
         creator="";
     }
     //constructor with parameters
     public Item(int value, String creator){
         this.value=value;
         this.creator=creator;
     }
    //getter
    //setter
    //other logic methods
} 
`}
        </CopyableCodeBlock>
        <CopyableCodeBlock language="java">
{`public class Vase extends Item
{ 
     int height;
     String material;

    //The below is methods that you need to implement
    //constructors 
    //getter
    //setter
    //other logic methods
} 
`}
        </CopyableCodeBlock>
        <CopyableCodeBlock language="java">
{`public class Statue extends Item
{ 
     int weight;
     String colour;

    //The below is methods that you need to implement
    //constructors 
    //getter
    //setter
    //other logic methods
} 
`}
        </CopyableCodeBlock>
        <CopyableCodeBlock language="java">
{`public class Painting extends Item
{ 
     int height;
     int width;
     boolean isWatercolour;
     boolean isFramed;

    //The below is methods that you need to implement
    //constructors 
    //getter
    //setter
    //other logic methods
} 
`}
        </CopyableCodeBlock>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">AntiqueShop Example</h2>
        <p>The <i>Vase</i> class has a total of <b>four</b> attributes. Two of these are unique to it, and two are “inherited” from its superclass. Similarly, the <i>Painting</i> class has <b>six</b> attributes, four unique to it, and two inherited from its superclass. So a super, base or parent class contains a basic set of attributes that are intended to form a part of the implementation of sub classes that are built from it. The sub classes have their own attributes that make them unique, and they inherit attributes from their superclass.</p>
        <p>Now, you create the file named "AntiqueShop.java", the method main is in here</p>
        <CopyableCodeBlock language="java">
{`public class AntiqueShop
{ 
    public static void main(String[] args){

        Vase v1 = new Vase();
        v1.value = 100;
        v1.creator="Test1";
        // you can assign values to other attributies of v1
        v1.height=100;
        v1.material="wood";
        // this code only uses to check v1's  fields


        Statue s1=new Statue();
        s1.value=200;
        s1.creator="Test2";
        // you can assign values to other attributies of s1
        s1.weight=100;
        s1.colour="blue";
        // this code only uses to check s1's  fields

        Painting p1=new Painting();
        p1.value=300;
        p1.creator="Test3";
        // you can assign values to other attributies of p1
        p1.height=200;
        p1.width=100;
        p1.isWatercolour=true;
        p1.isFramed=true;
        // this code only uses to check p1's  fields


    } 
} 
`}
        </CopyableCodeBlock>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Functions in Inheritance</h2>
        <p>We create three objects v1,s1,p1 from three subclasses. These objects have "inherited" attributes</p>
        <p>Similarly, we add a method to the super class Item, it is also inherited in three sub classes. we are able to call those inherited methods as if they had been defined in their own class definitions. For example, we add the method "output()" to the Item class.</p>
        <CopyableCodeBlock language="java">
{`public class Item
{ 
    public int value;
    public String creator;

    //The below is methods that you need to implement
    //constructors 
    //getter
    //setter
    public void output(){
        System.out.println("This item is worth " + value + " pounds");
        System.out.println("This item is created by " + creator );
    }
} 
`}
        </CopyableCodeBlock>
        <p>Edit the method main:</p>
        <CopyableCodeBlock language="java">
{`public class AntiqueShop
{ 
    public static void main(String[] args){

        Vase v1 = new Vase();
        v1.value = 100;
        v1.creator="Test1";
        v1.output();

        Statue s1=new Statue();
        s1.value=200;
        s1.creator="Test2";
        s1.output();

        Painting p1=new Painting();
        p1.value=300;
        p1.creator="Test3";
        p1.output();    
    } 
} 
`}
        </CopyableCodeBlock>
        <div className="bg-gray-200 border-l-4 border-gray-600 p-4 my-2 text-gray-900 dark:bg-gray-700 dark:border-gray-300 dark:text-white rounded">
          <b>Output:</b>
          <pre className="whitespace-pre-wrap">This item is worth 100 pounds
This item is created by Test1
This item is worth 200 pounds
This item is created by Test2
This item is worth 300 pounds
This item is created by Test3</pre>
        </div>
        <p>Note that, for now, all the attributes and methods have been declared as <b>public</b>. This is not necessarily good OO design practice and we need to apply the principle of encapsulation. This suggests that attributes of super class are <b>protected</b>.</p>
        <p>The rules that govern how we can guarantee inheritance are as follows:</p>
        <ul className="list-disc ml-6 mb-2">
          <li><b>private</b>: attributes and methods are only accessible from within the class itself, and are not guaranteed to be available in any class extended from it.</li>
          <li><b>protected</b>: attributes and methods that are private and only available from within the class itself and any class extended from it.</li>
          <li><b>public</b>: attributes and methods that are accessible from within the class and from any other class or calling code.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Adding Constructors</h2>
        <p>We now know that inheritance allows sub classes to inherit attributes and methods from a super class. We now consider how we should build constructor methods so that instances of our sub classes are created in the most efficient manner.</p>
        <p>Consider the constructors is added to the Vase class.</p>
        <CopyableCodeBlock language="java">
{`public class Vase extends Item
{ 
    private int height;
    private String material;

    //The below is methods that you need to implement
    public Vase(){    
         value=0;
         creator="";
         height=0;
         material="";
    }
    public Vase(int value, String creator, int height, String material){
         this.value=value;
         this.creator=creator;
         this.height=height;
         this.material=material;
    }
} 
`}
        </CopyableCodeBlock>
        <p>Because the Vase class has four fields, you can implement constructors that look like the above. But, that is not efficient coding. It would involve code duplication</p>
        <p>To reduce code duplication, common fields are initialized by using constructors of the superclass.</p>
        <p>We edit the code of the Vase class as follows:</p>
        <CopyableCodeBlock language="java">
{`public class Vase extends Item
{ 
    private int height;
    private String material;

    //The below is methods that you need to implement
    public Vase(){    
        super(); //call the default constructor of the Item class
        height=0;
        material="";
    }
    public Vase(int value, String creator, int height, String material){
        super(value, creator);  //call the constructor with 2 parameters of the Item class
        this.height=height;
        this.material=material;
    }
} 
`}
        </CopyableCodeBlock>
        <p>The <b>super</b> keyword refers to the super class</p>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-2 text-yellow-900 dark:bg-yellow-800 dark:border-yellow-500 dark:text-yellow-100"><b>Note</b>: Where a sub class is to call a constructor in its parent class using the super() method call, it must be so as the first line of its own constructor. This is to ensure that objects are constructed from their most distant super class first.</div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-2 text-yellow-900 dark:bg-yellow-800 dark:border-yellow-500 dark:text-yellow-100"><b>Note</b>: A derived class does <b>not inherit a superclass constructor by default</b></div>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-2 text-yellow-900 dark:bg-yellow-800 dark:border-yellow-500 dark:text-yellow-100"><b>Note</b>: If a constructor <i>does not explicitly invoke a superclass constructor</i>, the Java compiler <i>automatically inserts a call to the no-argument constructor of the superclass</i>. If the super class does not have a no-argument constructor, you will get a compile-time error. Object does have such a constructor, so if Object is the only superclass, there is no problem.</div>
        <p>Similarly, we add constructors to other sub classes</p>
        <p>We use the Java keyword <b>super</b> as the qualifier for calling a superclass method:  <br/><b>super.methodName(arguments);</b></p>
        <p>for example:</p>
        <CopyableCodeBlock language="java">
{`public class Item{
     ...
     void displayDiscount(){  System.out.println("discounting ...");}  
}  
public class Vase extends Item{  
    ...
    @Override
    void displayDiscount(){
           super.displayDiscount();
           System.out.println("and taking ...");
    }
    public static void main(String[] args){

        Vase obj=new Vase();
        obj.displayDiscount();
    }  
}`}
        </CopyableCodeBlock>
        <p>In a Vase subclass, The "displayDiscount" method has the same signature (name, plus the number and the type of its parameters) and return type as in the superclass. It is called the override the superclass's method. We will learn the override method in the next topic</p>
        <p>Whenever we wish to invoke the version of super's methods (for example "displayDiscount") that was defined by our superclass. We use the <b>"super"</b> keyword</p>
        <div className="bg-gray-200 border-l-4 border-gray-600 p-4 my-2 text-gray-900 dark:bg-gray-700 dark:border-gray-300 dark:text-white rounded">
          <b>Output:</b>
          <pre className="whitespace-pre-wrap">discounting ...
and taking ...</pre>
        </div>
        <p><b>Hidden methods</b>: Re-implementing a static method implemented in super class</p>
        <img src="/media/hidden method.png" alt="Hidden Method" className="my-4" />
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Using instanceof operator</h2>
        <p>Consider the code in the file AntiqueShop.java:</p>
        <CopyableCodeBlock language="java">
{`public class AntiqueShop
{ 
    public static void main(String[] args){

        Vase v1 = new Vase(100,"Paris",200,"rock");  
        Statue s1= new Statue(200,"VN", 1000,"white");
        Painting p1=new Painting(300,"USA",2000,1500,true,true);

        Item tmp=v1;  
    } 
} 
`}
        </CopyableCodeBlock>
        <p>In the above code, we create three objects v1, s1, p1 and initialize values by the constructor with parameters. And then, a reference variable tmp that has the type to be the Item superclass. It is storing the address of object v1. See the figure below:</p>
        <img src="/media/inheritance6.png" alt="Inheritance Example 6" className="my-4" />
        <p><b>dynamic type</b>: A reference variable that has the type of the superclass can store the address of the object of sub class. It is called to be <i>dynamic type</i>, the type that is has at runtime.</p>
        <p><b>static type</b>: the type that it has when first declared. Static type checking is enforced by the compiler.</p>
        <p>Similarly, we can use the variable tmp to store the address of objects s1, p1.</p>
        <p>How to check the tmp variable is pointing to the address of a specified object?</p>
        <p>Using the <b>instanceof</b> keyword. <a href="https://www.javatpoint.com/downcasting-with-instanceof-operator" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">read more</a></p>
        <p>Consider the code:</p>
        <CopyableCodeBlock language="java">
{`public class AntiqueShop
{ 
    public static void main(String[] args){

        Vase v1 = new Vase(100,"Paris",200,"rock");  
        Statue s1= new Statue(200,"VN", 1000,"white");
        Painting p1=new Painting(300,"USA",2000,1500,true,true);
        Item tmp=v1;
        if(tmp instanceof Vase)
            System.out.println("tmp is pointing to the Vase object");
        else if(tmp instanceof Statue)
            System.out.println("tmp is pointing to the Statue object");
        else
            System.out.println("tmp is pointing to the Painting object");    
    } 
} 
`}
        </CopyableCodeBlock>
        <div className="bg-gray-200 border-l-4 border-gray-600 p-4 my-2 text-gray-900 dark:bg-gray-700 dark:border-gray-300 dark:text-white rounded">
          <b>Output:</b>
          <pre className="whitespace-pre-wrap">tmp is pointing to the Vase object</pre>
        </div>
        <p>The instanceof operator will return true or false. In the above example, Because the variable tmp is pointing to the Vase object, the instruction "tmp instanceof Vase" returns true.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Casting</h2>
        <p>Now, we add a method "putFlowers()" to the Vase class</p>
        <CopyableCodeBlock language="java">
{`public class Vase extends Item
{ 
    private int height;
    private String material;

    //The below is methods that you need to implement
    public Vase(){    
         super();
         height=0;
         material="";
    }
    public Vase(int value, String creator, int height, String material){
         super(value, creator);
         this.height=height;
         this.material=material;
    }
    public void putFlowers(){
          System.out.println("flowers are put in the vase");
    }
} 
`}
        </CopyableCodeBlock>
        <p>In the method main, we edit</p>
        <CopyableCodeBlock language="java">
{`public class AntiqueShop
{ 
    public static void main(String[] args){

        Vase v1 = new Vase(100,"Paris",200,"rock");  
        Statue s1= new Statue(200,"VN", 1000,"white");
        Painting p1=new Painting(300,"USA",2000,1500,true,true);
        Item tmp=v1;
        if(tmp instanceof Vase){
            System.out.println("tmp is pointing to the Vase object");
            ((Vase)tmp).putFlowers();
        }
        else if(tmp instanceof Statue)
            System.out.println("tmp is pointing to the Statue object");
        else
            System.out.println("tmp is pointing to the Painting object");

    } 
} 
`}
        </CopyableCodeBlock>
        <p>The <i>tmp</i> variable that has the type of the superclass only calls methods of the superclass. To call methods of the subclass we must <i>cast explicitly</i>. If the code has attempted to cast an object to a subclass of which it is not an instance then a <i>ClassCastException</i> error will be thrown. For example,</p>
        <CopyableCodeBlock language="java">
{`...
System.out.println("tmp is pointing to the Vase object");
((Statue)tmp).setColour("Gray"); // causes an error
...`}
        </CopyableCodeBlock>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-2 text-yellow-900 dark:bg-yellow-800 dark:border-yellow-500 dark:text-yellow-100"><b>Note</b>: In Java, The Object class is the parent class of all the classes by default.</div>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Summary</h2>
        <ul className="list-disc ml-6 mb-2">
          <li>Object-oriented languages implement reusability of coding structure through inheritance</li>
          <li>A derived class does not by default inherit the constructor of a super class</li>
          <li>Constructors in an inheritance hierarchy execute in order from the super class to the derived class</li>
          <li>Using the instanceof keyword if we need to check the type of the reference variable.</li>
          <li>Check the type of the reference variable before casting it explicitly.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Course Slide</h2>
        <ul>
          <li><a href="/resource/Inheritance.pdf" download className="text-blue-600 underline">Inheritance.pdf</a></li>
        </ul>
      </section>
    </div>
  );
};

export default InheritanceSection;
