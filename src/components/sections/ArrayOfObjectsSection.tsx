import CopyableCodeBlock from './CopyableCodeBlock';

const ArrayOfObjectsSection = () => {
  return (
    <div className="info-section p-4 mb-4 bg-white dark:bg-gray-800 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Array of Objects</h1>
      <nav className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Array of Objects</h2>
        <a href="#array" className="text-blue-600 hover:underline mr-2">Basic operators</a>|
        <a href="#file" className="text-blue-600 hover:underline ml-2">File I/O</a>
      </nav>
      <section className="mb-8" id="array">
        <h2 className="text-2xl font-semibold mb-2">Array of Objects</h2>
        <p>A systematic technique for accessing objects of different dynamic type within the same hierarchy is through an array of pointers of their static type.  The executable code dereferences each pointer at run time based on its object's dynamic type.  [read <a href="/Org_code/Inheritance.html#instanceof" className="text-blue-600 hover:underline">dynamic & static type</a> again]</p>
        <p className="mt-4">In the previous topic, A antique shop that sells antique items, namely vases, statues, and paintings. For now, we want to manage the list of objects such as vases, statues, paintings in an array.  The objects pointed to by the array elements may be of differing dynamic type, but are of the same static type(type of the superclass).</p>
        <p className="mt-4">for example, we create the file named <em>ItemList.java</em>, it contains an array as follows:</p>
        <CopyableCodeBlock language="java">{`public class ItemList{
	Item [] list;   // an array to store all items
	int numOfItem;  // to store the number of items that added to the list
	final int MAX=100;   // is the size of the array
	public ItemList(){
              list=new Item[MAX];
              numOfItem=0;
    }    
}`}</CopyableCodeBlock>
        <p className="mt-4">Following are the basic operations supported by an array.</p>
        <ul className="list-disc list-inside mb-4">
          <li>print all the array elements(objects) one by one.</li>
          <li>Adds an object at the given index.</li>
          <li>Deletes an object at the given index.</li>
          <li>Searches an object using the given index or by the value.</li>
          <li>Updates an object at the given index.</li>
        </ul>
        <p>we will implement these later. For now, the main method to test some basic functions in the antique shop.</p>
        <CopyableCodeBlock language="java">{`public class antiqueShop{
	public static void main(String[] args){
            ItemList obj=new ItemList();
            Scanner sc=new Scanner(System.in);
            int choice=0;
            do{
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
                choice=sc.nextInt();
                switch(choice){
 				case 1:
 				         Item tmp=new Vase();
 				         tmp.input();
 				         //call the addItem method at here
 				         break;
 				case 2:
 				         Item tmp2=new Statue();
 				         tmp2.input();
 				         //call the addItem method at here
 				         break;   
 				case 3:
 				         Item tmp3=new Painting();
 				         tmp3.input();
 				         //call the addItem method at here
 				         break;  
 				case 4:
 				         //call the displayAll method at here
 				         break;
 				case 5:
 				         //call the findItems method at here
 				         break;  
 				case 6:
 				         //call the updateItem method at here
 				         break;
 				case 7:
 				         //call the removeItem method at here
 				         break; 
 				case 8:
 				          //call the displayItemByType method at here
 				         break;
 				case 9:
 				        //call the sortItems() method at here
 				        break;                             	                               
                }
            }while(choice<=9);
        }
}`}</CopyableCodeBlock>
        <p className="mt-4">To explore the instruction that is highlighted, consider the figure below </p>
        <img src="/media/array3.png" alt="array3" className="my-4" />
        <p>After starting, the obj variable points to address 1000, this block contains the reference variable <em>list</em> that is pointing to address 2000. It is an array of pointers. All elements are initiated to <em>null</em> </p>
        <p className="mt-4">To complete the program, we add a method named <em>addItem</em> to the ItemList class. </p>
        <CopyableCodeBlock language="java">{`public class ItemList{
	...
	public boolean addItem(Item item){
          if( item==null || numOfItem>=MAX)
              return false;
          list[numOfItem]=item;
          numOfItem++;
          return true;
    }
}`}</CopyableCodeBlock>
        <p>Edit the <em>case 1</em> in the main method</p>
        <CopyableCodeBlock language="java">{`public class antiqueShop{
	public static void main(String[] args){
         ....
         switch(choice){
            case 1:
                Item tmp=new Vase();
                tmp.input();
                if(obj.addItem(tmp)){
                    System.out.println("added");
                }
                break;
     }
}`}</CopyableCodeBlock>
        <p>If the choice is 1, steps are performed:</p>
        <ol className="list-decimal list-inside mb-4">
          <li> A Vase object is created at address 300.</li>
          <li> Its state likes the sample after inputting.</li>
          <li>Address 300 is passed to the addItem method.</li>
          <li>Add this address to the array at an index that is numOfItem. </li>
          <li>Increase the numOfItem by 1</li>
        </ol>
        <img src="/media/array4.png" alt="array4" className="my-4" />
        <p> We add more some methods to the ItemList class</p>
        <CopyableCodeBlock language="java">{`public class ItemList{
	...
	//this method prints out information of all items
	public void displayAll(){
          if(numOfItem==0)
              System.out.println("the list is empty");
          for(int i=0; i< numOfItem; i++){
               System.out.println(list[i]);
      }
    }
    //this method finds the item by its creator
    //return the item that is found of the first occurrence.
    pulic Item findItem(String creator){
        for(int i=0; i< numOfItem; i++)
             if( list[i].getCreator().equals(creator))
                  return list[i];
        return null;
    }
    //this method returns the zero_based index of the first occurrence.
    pulic int findItemIndex(String creator){
        for(int i=0; i< numOfItem; i++)
             if( list[i].getCreator().equals(creator))
                  return i;
        return -1;
    }
    //this method updates the item at the specified position in this list
    //input: the index you wish to update

    pulic boolean updateItem(int index){
        if( index >= 0 && index < numOfItem){
              list[i].input();
              return true;
        }
        return false;
    }

    //this method removes the item at the specified position in this list. 
    //Shifts any subsequent elements to the left   
    //input: the index you wish to remove    
    pulic boolean removeItem(int index){
        if( index >= 0 && index < numOfItem){
              for(int j=index; j< numOfItem; j++ ){
                   list[j]=list[j+1];
               }
              numOfItem --; 
              return true;
        }
        return false;
    }
    //this method prints out all items that belong to the given type in the list.
    public void displayItemsByType(String type){

        if (type.equals("Vase")){   
          for(int i=0; i < numOfItem; i++)
             if ( list[i] instanceof Vase) System.out.println( list[i]);
        }
        else if (type.equals("Statue")){   
          for(int i=0; i < numOfItem; i++)
             if ( list[i] instanceof Statue) System.out.println( list[i]);
        }
        else {
           for(int i=0; i < numOfItem; i++)
             if ( list[i] instanceof Painting) System.out.println( list[i]);
        }
    }
    //this method sorts items in ascending order based on their values.
    public void sortItems(){
        for(int i=0; i< numOfItem; i++)
            for(int j=numOfItem-1; j>i ;j--){
                if( list[i].getValue()< list[j-1].getValue()){
                     Item tmp=list[j];
                     list[j]=list[j-1];
                     list[j-1]=tmp;
                 }
            }

    }  
       
}`}</CopyableCodeBlock>
        <CopyableCodeBlock language="java">{`public class antiqueShop{
	public static void main(String[] args){
         ....
         switch(choice){
                case 1:
                    Item tmp=new Vase();
                    tmp.input();
                    if(obj.addItem(tmp)){
                        System.out.println("added");
                     }
                    break;
                case 2:
                    Item tmp2=new Statue();
                    tmp2.input();
                    if(obj.addItem(tmp2)){
                        System.out.println("added");
                    }
                    break;
                case 3:
                    Item tmp3=new Painting();
                    tmp3.input();
                    if(obj.addItem(tmp3)){
                        System.out.println("added");
                    }
                    break;
                case 4:
                    obj.displayAll();
                    break;
                case 5:
                    String creator="Paris";
                    Item result=obj.findItemIndex(creator);
                    if( Item==null) System.out.println("not found");
                    else System.out.println("the item is found " + result);
                    break;
                case 6:
                    int index=2;
                    if( obj.updateItem(index)){
                        System.out.println("After updating: ");
                        obj.displayAll();
                    }
                    else System.out.println("can not update the item");
                    break;
                case 7:
                    int index=1;
                    if( obj.removeItem(index)){
                        System.out.println("After removing: ");
                        obj.displayAll();
                    }
                    else System.out.println("can not remove the item");
                    break;
                case 8:
                    String type="Painting";
                    obj.displayItemsByType(type);
                    break;
                case 9:
                    obj.sortItems();
                    obj.displayAll();
            }//end switch
            ... 
     }
}`}</CopyableCodeBlock>
        <p>To explore what is doing, we look at the figure:</p>
        <img src="/media/array5.png" alt="array5" className="my-4" />
        <p>The <em>findItemIndex</em> method finds the item within the list and returns the position of the first occurrence in the list. For example, if you wish to get the <em>position</em> of the item which value is <em>100</em> then the method returns <em>0</em></p>
        <p className="mt-4">The <em>findItem</em> method finds the item within the list and returns the address of the first occurrence in the list. For example, if you wish to get the <em>item</em> which creator is <em>Paris</em> then the method returns <em>300</em></p>
        <p className="mt-4">If you wish to remove the item at index 1, the method <em>removeItem(index)</em> will shift any subsequent elements to the up. After shifting, the old item that was at position 1 becomes garbage and Java will deallocate it.</p>
        <p className="mt-4">In the <em>sortItem</em> method, we implement the bubble sorting algorithm. </p>
        <p><em>[ read bubble sorting algorithm in <a href="https://en.wikipedia.org/wiki/Bubble_sort#:~:text=Bubble%20sort,%20sometimes%20referred%20to%20as%20sinking%20sort,,list%20is%20repeated%20until%20the%20list%20is%20sorted." target="_blank" className="text-blue-600 hover:underline">Wiki</a>]</em><br/>
        <em>[ read the <a href="https://makeinjava.com/sort-user-defined-objects-pojo-array-java-example-comparator-interface/" target="_blank" className="text-blue-600 hover:underline">Arrays</a> class to sort user-defined objects]</em></p>
      </section>
      <section className="mb-8" id="file">
        <h2 className="text-2xl font-semibold mb-2">I/O Stream</h2>
        <p>Input and output data sources of a program can be the keyboard, monitor, file in an external disk. In this lesson, basic concepts and tools for handling all kinds of data, from primitive values to advanced objects are introduced. </p>
        <p className="mt-4">File is a group of related data which are stored in external memory (disk) for the common use between some programs. The file designer will decide the format of stored data. In general, a thing containing data is called a file. So, a directory is a file, a device( keyboard, monitor, network interface card, disk,…) is a file. Data in a normal file can include text, images, sounds.  Information stored in a file must be persistent. This means that data in a file must be survived even when the process, which created it, terminated.</p>
        <div className="my-4 p-2 bg-gray-100 dark:bg-gray-700 rounded"><b>Text format</b>: a data unit is a character or digit (ASCII code). So, all numbers in a program (numeric variables) must be transferred to a string of digits before they are written to file.</div>
        <div className="my-4 p-2 bg-gray-100 dark:bg-gray-700 rounded"><b>Binary format</b>: data in a file is a figure of a variable’s memory bitmap in the program.</div>
        <p>Text format is flexible than binary format but costs must be paid for type conversions. Files in text format can be viewed, updated using any normal editor such as Notepad, MS Word, …</p>
        <p>The binary format is efficient because no data type transfer is needed but data in a file can be accessed by appropriate programs only.</p>
        <p className="mt-4">The link to read more: <a href="https://docs.oracle.com/javase/tutorial/essential/io/streams.html" target="_blank" className="text-blue-600 hover:underline">IO Streams</a></p>
        <p className="mt-4">Steps for accessing a file:</p>
        <ol className="list-decimal list-inside mb-4">
          <li>Open file</li>
          <li>Read data from file to a program’s variable or write the value in the program’s variable to file</li>
          <li>Close file</li>
        </ol>
        <span className="font-semibold">Stream</span>
        <p className="mt-4">An I/O Stream represents an input source or an output destination. A stream can represent many different kinds of sources and destinations, including disk files, devices, other programs, and memory arrays.</p>
        <p>I/O Stream contains a reference to a data source, methods for accessing data in the source, and methods for type conversions</p>
        <p>Streams support many different kinds of data, including simple bytes, primitive data types, localized characters, and objects. Some streams simply pass on data; others manipulate and transform the data in useful ways (type conversions may be needed).</p>
        <p>No matter how they work internally, all streams present the same simple model to programs that use them: A stream is a sequence of data. A program uses an input stream to read data from a source, one item at a time and uses an output stream to write data to a destination, one item at a time.</p>
        <img src="/media/IO.01.gif" alt="IO.01" className="my-4" />
        <img src="/media/IO.02.gif" alt="IO.02" className="my-4" />
        <p><em>[ Introduction to the <a href="https://docs.oracle.com/javase/7/docs/api/java/io/package-summary.html" target="_blank" className="text-blue-600 hover:underline">java.io package</a>]</em></p>
        <p><em>[ Introduction to I/O <a href="https://docs.oracle.com/javase/tutorial/essential/io/streams.html" target="_blank" className="text-blue-600 hover:underline">Stream</a>]</em></p>
        <p><em>[ Introduction to the <a href="https://docs.oracle.com/javase/7/docs/api/java/io/File.html" target="_blank" className="text-blue-600 hover:underline">File</a> class]</em></p>
        <div className="my-4 p-2 bg-yellow-100 dark:bg-yellow-900 rounded border-l-4 border-yellow-400"><b>In the following program, the user will give a pathname, the program will show information about this pathname in the file system.</b></div>
        <img src="/media/IO.09A.gif" alt="IO.09A" className="my-4" />
        <img src="/media/IO.09B.gif" alt="IO.09B" className="my-4" />
        <img src="/media/IO.09C.gif" alt="IO.09C" className="my-4" />
        <img src="/media/IO.09D.gif" alt="IO.09D" className="my-4" />
        <p>Result in 3 cases:</p>
        <img src="/media/IO.09E.gif" alt="IO.09E" className="my-4" />
        <span className="font-semibold">Accessing ASCII text files</span>
        <p className="mt-4">When a text file is used, the file designer will decide text organization (data meanings) in a file. So, all read/write operations must perform appropriately. </p>
        <p>Two following pictures depict ways we can use to access a text file:</p>
        <img src="/media/IO.10.gif" alt="IO.10" className="my-4" />
        <img src="/media/IO.11.gif" alt="IO.11" className="my-4" />
      </section>
      <section className="mb-8" id="build">
        <h2 className="text-2xl font-semibold mb-2">Build a complete program</h2>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-4 whitespace-pre-line">
          Build a program that is needed to help users managing a list of products.<br />
          Details of a product include String ID, String name, int price.<br />
          An initial list of products is stored in a text file, named products.txt.<br />
          Initial data in the file as below:
          <br />
          P001,  Sony TV 65, 850 <br />
          P006, Sharp TV 40, 210<br />
          P003, TCL TV 55, 310<br />
          P007, Bose sounddock 30 III, 500<br />
          P002, Bose soundbar 230 I, 800<br />
          P004, Denon soundbar S330, 1100
          <br />
          users can choose an operation at a time using a simple menu. Operations are required:
          - Add a product
          - Search a product based on its ID
          - Print products based on a part of its name. For example, “TV” or “soundbar”
          - Print all products in descending order of prices.
          - Save the current list to file, named Products.txt
          <br />
          <b>Constraints:</b>
          - The ID of a product must be in the “P000” format.
          - The product name is not blank and there is no extra blank.
          - The product’s price must be &gt;0.
          - The product’s ID is unique. 
          <br />
          <b>Class design</b>
          - Class Inputter for inputting data to ensure that they satisfy the problem’s constraints.
          - Class Menu for program’s menu
          - Class Product for a product
          - Class ProductList for a list of products
          - Class ProductManager for the program.
        </div>
        <p className="font-bold">Software structure and menu:</p>
        <img src="/media/IO.12A.gif" alt="IO.12A" className="my-4" />
        <p>Note: A class that uses classes in a package should be outside of the package. The ProductManger class is put outside of the products package.</p>
        <img src="/media/IO.12B.gif" alt="IO.12B" className="my-4" />
        <p className="font-bold">Implementations</p>
        <p>The Inputter class is the tool for inputting data based on the program’s constraints.</p>
        <img src="/media/IO.12C.gif" alt="IO.12C" className="my-4" />
        <img src="/media/IO.12D.gif" alt="IO.12D" className="my-4" />
        <div className="my-4 p-2 bg-gray-100 dark:bg-gray-700 rounded"><b>Regular Expression</b> A regular expression is a way or a language that helps us to describe strings that are in a pre-defined specific pattern.<br />
         Example: “[pP][\\d]{3}”:  Pattern for “p000", “P001”, “P909” <br />
        Meanings of parts:<br />
        -  [pP] : One character and it must be ‘p’ or ‘P’<br />
        - [\\d]{3}: 3 digits<br />
        In the String class, we can use the boolean matches(String regEx) method to check a string whether it matches the specified regular expression or not.<br />
        <em>[For <a href="https://docs.oracle.com/en/java/javase/16/docs/api/java.base/java/util/regex/Pattern.html" target="_blank" className="text-blue-600 hover:underline">more details</a>]</em>
        </div>
        <img src="/media/IO.12E.gif" alt="IO.12E" className="my-4" />
        <img src="/media/IO.12F.gif" alt="IO.12F" className="my-4" />
        <img src="/media/IO.12G.gif" alt="IO.12G" className="my-4" />
        <img src="/media/IO.12H.gif" alt="IO.12H" className="my-4" />
        <img src="/media/IO.12I.gif" alt="IO.12I" className="my-4" />
        <img src="/media/IO.12J.gif" alt="IO.12J" className="my-4" />
        <img src="/media/IO.12K.gif" alt="IO.12K" className="my-4" />
        <img src="/media/IO.12L.gif" alt="IO.12L" className="my-4" />
        <img src="/media/IO.12M.gif" alt="IO.12M" className="my-4" />
        <img src="/media/IO.12N.gif" alt="IO.12N" className="my-4" />
        <img src="/media/IO.12O.gif" alt="IO.12O" className="my-4" />
        <img src="/media/IO.12P.gif" alt="IO.12P" className="my-4" />
        <img src="/media/IO.12Q.gif" alt="IO.12Q" className="my-4" />
        <img src="/media/IO.12R.gif" alt="IO.12R" className="my-4" />
        <img src="/media/IO.12S.gif" alt="IO.12S" className="my-4" />
        <img src="/media/IO.12T.gif" alt="IO.12T" className="my-4" />
        <span className="font-semibold">Exercise</span>
        <div className="my-4 p-2 bg-yellow-100 dark:bg-yellow-900 rounded border-l-4 border-yellow-400">
          Upgrade the Product Manager program above. Add the following extra operations to this program:<br />
          - Print products whose prices are between min Price and max Price<br />
          - Update name and price of a product based on its ID.<br />
          - Remove a product based on its ID<br />
        </div>
        <span className="font-semibold">Accessing object files</span>
        <div className="my-4 p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <b>Serialization</b> is a process in which binary data bytes of an object will be transferred to a stream.
        </div>
        <div className="my-4 p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <b>De-serialization</b> is a process in which binary data bytes in a stream will be transferred to fields of an object.
        </div>
        <p>Each programming language chooses a way to serialize an object. Following are some concerns: <br />
        - Whether class information of the object is stored in a file or not.<br />
        - What is the order of fields that will be stored? Down order (field 1, filed 2,…) is applied or up order should be used?</p>
        <span className="font-semibold">How to serialize a Java object to s stream?</span>
        <p className="mt-4">To serialize data of objects to a stream, a class of objects must implement the java.io.Serializabe interface. This interface has no method. The Java compiler will add systematic codes needed to serialize and de-serialize between objects and a binary stream.</p>
        <p>Because object files are binary, users can not use text editors to see or edit data. All read and write operations must be performed by suitable programs. </p>
        <span className="font-semibold">What are fields will be serialized?</span>
        <p className="mt-4">Not all data of an object are serialized to a stream. static and transient fields are not serialized.<br />
        Note:<br />
        - the static modifier is used when a field is the common field of a class.<br />
        - the transient modifier is used when a field having value as a result of computation from other fields.  [read <a href="https://www.geeksforgeeks.org/transient-keyword-java/#:~:text=transient%20keyword%20in%20Java.%20transient%20is%20a%20variables,save%20default%20value%20of%20that%20variable%20data%20type." target="_blank" className="text-blue-600 hover:underline">more</a>]
        </p>
        <p>Model for reading objects from and writing objects to an object stream.</p>
        <img src="/media/IO.16.gif" alt="IO.16" className="my-4" />
        <p>The following image helps us explore the structure of an object file in Java.</p>
        <img src="/media/IO.17.gif" alt="IO.17" className="my-4" />
        <ol className="list-decimal list-inside mb-4">
          <li> Package and class information including field names, field types (I: int) are put at the beginning of the file.</li>
          <li>Fields are written to file in reverse order.</li>
        </ol>
        <p>Each time objects are written to file, information about package and class will be written.  We are noticed about properties when manipulating object files as below:</p>
        <ol className="list-decimal list-inside mb-4">
          <li>All objects in the file should be loaded to memory.</li>
          <li>Use the override mode to write objects to the file.</li>
        </ol>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-4 whitespace-pre-line">
          <b>Problem</b>:The following demonstration will depict the way to access an object file containing some books.
        </div>
        <p>Software structure of Book Managing Program</p>
        <img src="/media/IO.18A.gif" alt="IO.18A" className="my-4" />
        <img src="/media/IO.18B.gif" alt="IO.18B" className="my-4" />
        <img src="/media/IO.18C.gif" alt="IO.18C" className="my-4" />
        <img src="/media/IO.18D.gif" alt="IO.18D" className="my-4" />
        <img src="/media/IO.18E.gif" alt="IO.18E" className="my-4" />
        <img src="/media/IO.18F.gif" alt="IO.18F" className="my-4" />
        <img src="/media/IO.18G.gif" alt="IO.18G" className="my-4" />
        <img src="/media/IO.18H.gif" alt="IO.18H" className="my-4" />
        <p>The result:</p>
        <img src="/media/IO.18I.gif" alt="IO.18I" className="my-4" />
        <span className="font-semibold">Exercise</span>
        <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded mb-4 whitespace-pre-line">
          Develop the above demonstration program for managing books with the following specifications:
          - Book {'<'}String ID, String title, String author, int edition, int price{'>'}.
          - Filename: books.dat
          - Menu of the program:
          - Add a book
          - Search a book based on ID
          - Update a book
          - Remove a book
          - Print books of an author
          - Print books having titles containing a sub-string
          - Print books in ascending order of authors then ascending prices  
          - Save the list to file
        </div>
        <span className="font-semibold">Summary</span>
        <ul className="list-disc list-inside mb-4">
          <li>File is a group of related data which are stored in external memory (disk) for the common use between some programs.</li>
          <li>A thing containing data is called a file. So, a directory is a file, a device (keyboard, monitor, network interface card, disk,…) is a file.  </li>
          <li>An I/O Stream represents an input source or an output destination. A stream can represent many different kinds of sources and destinations, including disk files, devices, other programs, and memory arrays.</li>
          <li>The java.io package contains interfaces and almost of classes for accessing text files and binary files including object files.</li>
          <li>The java.io.File supports methods for accessing basic information of a file or folder.</li>
        </ul>
      </section>
      <section className="mb-8" id="course-slide">
        <h2 className="text-2xl font-semibold mb-2">Course Slide</h2>
        <ul className="list-disc list-inside mb-4">
          <li><a href="/resource/ArrayOfObjects.pdf" download className="text-blue-600 hover:underline">Array of Objects.pdf</a></li>
          <li><a href="/resource/File IO.pdf" download className="text-blue-600 hover:underline">File I/O.pdf</a></li>
        </ul>
      </section>
    </div>
  );
};

export default ArrayOfObjectsSection;
