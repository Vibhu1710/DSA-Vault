---
tags:
  - Strings
---



### What if string has upper case letters as well?

How do I handle uppercase characters in Rabin Karp algo..
- This is one of the methods:

![[Screenshot 2025-11-13 at 10.44.06 AM.png]]This requires the hash function to be changed a bit: basically the character mapping (ch - 'a' + 1)and the prime number coefficient

- We could also do:
  `int(ch)`
  So, we use ascii value of each character and choose a prime number as `131` (greater than 127 {actual range is -128 to 127})
  
  but this is likely to increase collisions due to large value computations and then their corresponding reduction after modulo arithmetic!!



[Open File in VS Code](vscode://file/Users/vibhubhanot/Documents/DSA/strings/string 1/rabinKarpAlgo.cpp)
```embed-cpp
PATH: "vault://Assets/Code/strings/string 1/rabinKarpAlgo.cpp"
TITLE: "strings/string 1/rabinKarpAlgo.cpp"
LINES: "1-200"
```
