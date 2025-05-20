import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ArrayOfObjectsSection = () => {
  return (
    <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Array of Objects</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Basic Operators</h2>
        <p>
          Arrays of objects allow you to manage collections of related objects, even if they are of different dynamic types but share the same static type (superclass).
        </p>
        <SyntaxHighlighter language="java" style={atomDark} showLineNumbers={true} customStyle={{ borderRadius: '0.375rem', padding: '1rem', margin: '1rem 0' }} className="text-sm shadow-md max-w-full overflow-x-auto">
{`public class ItemList {
    Item[] list;   // an array to store all items
    int numOfItem; // to store the number of items added
    final int MAX = 100; // size of the array
    public ItemList() {
        list = new Item[MAX];
        numOfItem = 0;
    }
}`}
        </SyntaxHighlighter>
        <p>Common operations include adding, removing, updating, searching, and displaying objects in the array.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Example: Antique Shop</h2>
        <p>This example demonstrates managing vases, statues, and paintings in an array of their superclass type <code>Item</code>.</p>
        <SyntaxHighlighter language="java" style={atomDark} showLineNumbers={true} customStyle={{ borderRadius: '0.375rem', padding: '1rem', margin: '1rem 0' }} className="text-sm shadow-md max-w-full overflow-x-auto">
{`public class antiqueShop {
    public static void main(String[] args) {
        ItemList obj = new ItemList();
        Scanner sc = new Scanner(System.in);
        int choice = 0;
        do {
            System.out.println("1. add a new vase");
            System.out.println("2. add a new statue");
            System.out.println("3. add a new painting");
            System.out.println("4. display all items");
            System.out.println("5. find the items by the creator ");
            System.out.println("6. update the item by its index");
            System.out.println("7. remove the item by its index");
            System.out.println("8. display the list of vase items ");
            System.out.println("9. sorts items in ascending order based on their values ");
            System.out.println("10. exit");
            System.out.println("input your choice:");
            choice = sc.nextInt();
            switch (choice) {
                case 1:
                    Item tmp = new Vase();
                    tmp.input();
                    if (obj.addItem(tmp)) {
                        System.out.println("added");
                    }
                    break;
                case 2:
                    Item tmp2 = new Statue();
                    tmp2.input();
                    if (obj.addItem(tmp2)) {
                        System.out.println("added");
                    }
                    break;
                case 3:
                    Item tmp3 = new Painting();
                    tmp3.input();
                    if (obj.addItem(tmp3)) {
                        System.out.println("added");
                    }
                    break;
                case 4:
                    obj.displayAll();
                    break;
                case 5:
                    String creator = "Paris";
                    int result = obj.findItemIndex(creator);
                    if (result == -1) System.out.println("not found");
                    else System.out.println("the item is found at index " + result);
                    break;
                case 6:
                    int index = 2;
                    if (obj.updateItem(index)) {
                        System.out.println("After updating: ");
                        obj.displayAll();
                    } else System.out.println("can not update the item");
                    break;
                case 7:
                    int index2 = 1;
                    if (obj.removeItem(index2)) {
                        System.out.println("After removing: ");
                        obj.displayAll();
                    } else System.out.println("can not remove the item");
                    break;
                case 8:
                    String type = "Painting";
                    obj.displayItemsByType(type);
                    break;
                case 9:
                    obj.sortItems();
                    obj.displayAll();
                    break;
            }
        } while (choice <= 9);
    }
}`}
        </SyntaxHighlighter>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">ItemList Methods</h2>
        <p>Key methods for managing the array of objects:</p>
        <SyntaxHighlighter language="java" style={atomDark} showLineNumbers={true} customStyle={{ borderRadius: '0.375rem', padding: '1rem', margin: '1rem 0' }} className="text-sm shadow-md max-w-full overflow-x-auto">
{`public boolean addItem(Item item) {
    if (item == null || numOfItem >= MAX)
        return false;
    list[numOfItem] = item;
    numOfItem++;
    return true;
}

public void displayAll() {
    if (numOfItem == 0)
        System.out.println("the list is empty");
    for (int i = 0; i < numOfItem; i++) {
        System.out.println(list[i]);
    }
}

public Item findItem(String creator) {
    for (int i = 0; i < numOfItem; i++)
        if (list[i].getCreator().equals(creator))
            return list[i];
    return null;
}

public int findItemIndex(String creator) {
    for (int i = 0; i < numOfItem; i++)
        if (list[i].getCreator().equals(creator))
            return i;
    return -1;
}

public boolean updateItem(int index) {
    if (index >= 0 && index < numOfItem) {
        list[index].input();
        return true;
    }
    return false;
}

public boolean removeItem(int index) {
    if (index >= 0 && index < numOfItem) {
        for (int j = index; j < numOfItem - 1; j++) {
            list[j] = list[j + 1];
        }
        numOfItem--;
        return true;
    }
    return false;
}

public void displayItemsByType(String type) {
    if (type.equals("Vase")) {
        for (int i = 0; i < numOfItem; i++)
            if (list[i] instanceof Vase) System.out.println(list[i]);
    } else if (type.equals("Statue")) {
        for (int i = 0; i < numOfItem; i++)
            if (list[i] instanceof Statue) System.out.println(list[i]);
    } else {
        for (int i = 0; i < numOfItem; i++)
            if (list[i] instanceof Painting) System.out.println(list[i]);
    }
}

public void sortItems() {
    for (int i = 0; i < numOfItem; i++)
        for (int j = numOfItem - 1; j > i; j--) {
            if (list[j].getValue() < list[j - 1].getValue()) {
                Item tmp = list[j];
                list[j] = list[j - 1];
                list[j - 1] = tmp;
            }
        }
}
`}
        </SyntaxHighlighter>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Summary</h2>
        <ul className="list-disc ml-6 mb-2">
          <li>Arrays of objects allow you to manage collections of related objects efficiently.</li>
          <li>Objects in the array can be of different dynamic types but must share the same static type.</li>
          <li>Common operations include add, remove, update, search, and sort.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Course Slide</h2>
        <ul>
          <li><a href="/Org_code/resource/ArrayOfObjects.pdf" download className="text-blue-600 underline">ArrayOfObjects.pdf</a></li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Workshop</h2>
        <ul>
          <li>Complete the <a href="/Org_code/workshop/workshop6.pdf" download className="text-blue-600 underline">workshop6</a></li>
        </ul>
      </section>
    </div>
  );
};

export default ArrayOfObjectsSection;
