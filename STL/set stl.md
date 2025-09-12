
This is internally a Red Black tree implementation.

## Basic Functionality

[Open File in VS Code](vscode://file/Users/vibhubhanot/Documents/DSA/stl/ordered/set/basic.cpp)
```embed-cpp
PATH: "vault://Assets/Code/stl/ordered/set/basic.cpp"
TITLE: "stl/ordered/set/basic.cpp"
LINES: "1-200"
```


## How is uniqueness determined in sets?

![[Screenshot 2025-09-02 at 4.48.31 PM.png]]


## Custom Sets (using Node)

[Open File in VS Code](vscode://file/Users/vibhubhanot/Documents/DSA/stl/ordered/set/customSets.cpp)
```embed-cpp
PATH: "vault://Assets/Code/stl/ordered/set/customSets.cpp"
TITLE: "stl/ordered/set/customSets.cpp"
LINES: "1-200"
```



## Negative Example

Why don't we use custom set (having 2 data variables) over a map.
Answer is: the data members in a set cannot be modified.
`itr->second = 10` is not possible in a set but is possible in a map ^mt30qj


[Open File in VS Code](vscode://file/Users/vibhubhanot/Documents/DSA/stl/ordered/set/negativeExample.cpp)
```embed-cpp
PATH: "vault://Assets/Code/stl/ordered/set/negativeExample.cpp"
TITLE: "stl/ordered/set/negativeExample.cpp"
LINES: "1-200"
```


## Next, Prev And Distance funcs.

These are funcs that help in moving set iterators to a desired position.
itr + 3 is not possible in sets and maps, unlike vectors. Hence, these functions come handy.


[Open File in VS Code](vscode://file/Users/vibhubhanot/Documents/DSA/stl/ordered/set/nextAndDist.cpp)
```embed-cpp
PATH: "vault://Assets/Code/stl/ordered/set/nextAndDist.cpp"
TITLE: "stl/ordered/set/nextAndDist.cpp"
LINES: "1-200"
```



### To know how BinarySearchFuncs work on set

See [[BinarySearchFuncs for set]]