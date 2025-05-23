import CopyableCodeBlock from './CopyableCodeBlock';

const ArrayOfObjectsSection = () => {
  return (
    <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Array of Objects</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Basic Operators</h2>
        <p>Arrays of objects allow you to manage collections of related objects, even if they are of different dynamic types but share the same static type (superclass).</p>
        
        <CopyableCodeBlock language="java">
{`public class ItemList {
    private Item[] list;
    private int count;
    
    public ItemList() {
        list = new Item[100];
        count = 0;
    }
    
    public void add(Item item) {
        list[count++] = item;
    }
    
    public void display() {
        for(int i = 0; i < count; i++) {
            System.out.println(list[i].toString());
        }
    }
}`}
        </CopyableCodeBlock>
      </section>
    </div>
  );
};

export default ArrayOfObjectsSection;
