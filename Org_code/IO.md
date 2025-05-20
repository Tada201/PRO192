## Standard Input and Output

### I/O Streams

This topic covers the Java platform classes used for basic input and output. It focuses primarily on I/O Streams, a powerful concept that greatly simplifies I/O operations.

### I/O Stream

An I/O Stream represents an input source or an output destination. A stream can represent many different kinds of sources and destinations, including disk files, devices, other programs, and memory arrays.

Streams support many different kinds of data, including simple bytes, primitive data types, localized characters, and objects. Some streams simply pass on data; others manipulate and transform the data in useful ways.  
[for detail](https://docs.oracle.com/javase/tutorial/essential/io/streams.html)

### I/O from the Command Line

A program is often run from the command line and interacts with the user in the command line environment. The Java platform supports this kind of interaction in two ways: through the Standard Streams and through the Console.

The Java platform supports three Standard Streams: Standard Input, accessed through System.in; Standard Output, accessed through System.out; and Standard Error, accessed through System.err.  

These objects are defined automatically and do not need to be opened. Standard Output and Standard Error are both for output; having error output separately allows the user to divert regular output to a file and still be able to read error messages. For more information, refer to the [documentation](https://docs.oracle.com/javase/tutorial/essential/io/cl.html) for your command line interpreter.

To get user input, we can also use the Scanner class [for detail](https://docs.oracle.com/javase/tutorial/essential/io/scanning.html). This class supports some methods to get various types from the user.

| Method         | Description                  |
|----------------|------------------------------|
| nextBoolean()  | Reads a boolean value from the user |
| nextByte()     | Reads a byte value from the user    |
| nextDouble()   | Reads a double value from the user  |
| nextFloat()    | Reads a float value from the user   |
| nextInt()      | Reads an int value from the user    |
| nextLine()     | Reads a String value from the user  |
| nextLong()     | Reads a long value from the user    |
| nextShort()    | Reads a short value from the user   |

### Example

![ioexample.png](images/ioexample.png)

In the above example, we need to import the library class *Scanner* from the package *java.util.Scanner*. To use this class at the row 10, we declare the variable sc and create an object from this class. Why do we need this? Do not worry, when you go to the topic *class and object*, you will be explained that why you do this.

At the row 11, a message *Enter number of elements* is printed out.

At the row 12, the statement *sc.nextLine()* to get a string from the user and then, we use *Integer.parseInt()* to convert the inputted string to the integer value.

At the row 19, *System.out.format* is used in Java to format output.

### Summary

- Easy way to get the user data is to use the library class Scanner
- Using System.out to print out data to the console
- We can convert a string to the number by using some classes Integer, Float,....

### Workshop

- Complete the [workshop1](workshop/workshop1.pdf)
