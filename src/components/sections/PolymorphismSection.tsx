import CopyableCodeBlock from './CopyableCodeBlock';

const PolymorphismSection = () => {
  return (
    <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Polymorphism</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Overloading &amp; Overriding</h2>
        <p>Polymorphism allows methods and objects to appear in many forms. This is achieved in Java through <b>overloading</b> and <b>overriding</b> methods.</p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Overloading</h3>
        <p>Overloading allows a class to have multiple methods with the same name but different parameter types or counts.</p>
        <CopyableCodeBlock language="java">
{`public class Vase extends Item {
    private int height;
    private String material;

    public Vase() {
        super();
        height = 0;
        material = "";
    }
    public Vase(int height, String material) {
        super();
        this.height = height;
        this.material = material;
    }
    public Vase(int value, String creator, int height, String material) {
        super(value, creator);
        this.height = height;
        this.material = material;
    }
}`}
        </CopyableCodeBlock>
        <p>Each constructor has a unique signature. The compiler selects the correct one based on the arguments provided.</p>
        <CopyableCodeBlock language="java">
{`Vase v1 = new Vase(0, "Dave", 50, "bronze");
Vase v2 = new Vase(100, "plaster");`}
        </CopyableCodeBlock>
        <h3 className="text-xl font-semibold mt-4 mb-2">Overriding</h3>
        <p>Overriding allows a subclass to provide a specific implementation of a method already defined in its superclass.</p>
        <CopyableCodeBlock language="java">
{`public class Item {
    protected int value;
    protected String creator;
    public void input() {
        // ...
    }
    public void output() {
        // ...
    }
}

public class Vase extends Item {
    private int height;
    private String material;
    @Override
    public void input() {
        super.input();
        // ...
    }
    @Override
    public void output() {
        super.output();
        // ...
    }
}`}
        </CopyableCodeBlock>
        <p>Use the <b>@Override</b> annotation to indicate you are overriding a superclass method.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Function Bindings</h2>
        <p>Java uses <b>static binding</b> (compile time) for overloaded methods and <b>dynamic binding</b> (runtime) for overridden methods.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Abstract Classes</h2>
        <p>An <b>abstract class</b> contains abstract methods (no implementation) that must be implemented by subclasses.</p>
        <CopyableCodeBlock language="java">
{`public abstract class Item {
    protected int value;
    protected String creator;
    public abstract void displayPrice();
}

public class Vase extends Item {
    private int height;
    private String material;
    @Override
    public void displayPrice() {
        if (height < 100)
            System.out.println("The price is 1000$");
        else
            System.out.println("The price is 2000$");
    }
}`}
        </CopyableCodeBlock>
        <p>Subclasses must implement all abstract methods from their superclass.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Interfaces</h2>
        <p>An <b>interface</b> defines method signatures that implementing classes must provide. Interfaces enable multiple inheritance of type.</p>
        <CopyableCodeBlock language="java">
{`public interface Menu {
    void getSalad();
    void getBeefsteak();
}

public class Chef implements Menu {
    public void getSalad() {
        System.out.println("This is a salad");
    }
    public void getBeefsteak() {
        System.out.println("This is a beefsteak");
    }
}`}
        </CopyableCodeBlock>
        <p>A class can implement multiple interfaces, providing polymorphic behavior.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Summary</h2>
        <ul className="list-disc ml-6 mb-2">
          <li>Polymorphism allows objects and methods to take many forms.</li>
          <li>Overloading and overriding are key techniques for polymorphism.</li>
          <li>Abstract classes and interfaces enable flexible and reusable code.</li>
          <li>In OOP, a parent class or interface reference can refer to a child class object.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Course Slide</h2>
        <ul>
          <li><a href="/Org_code/resource/Polymorphism.pdf" download className="text-blue-600 underline">Polymorphism.pdf</a></li>
        </ul>
      </section>
    </div>
  );
};

export default PolymorphismSection;
