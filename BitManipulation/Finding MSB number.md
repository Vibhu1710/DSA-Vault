---
tags:
  - BitManipulation
---


In **O(no. of set bits)**, it is the easiest:

```cpp
int msbNum(int n){
	int lastN = n;
	// remove set bits one by one from lowest to highest bit side
	while(n > 0){
		lastN = n;
		n = (n & (n-1));
	}
	return lastN;
}
```


There exists a O(1) trick as well:
**Bit Spread Method**
Here we shift MSB to all possible lower position to form a number like: 0001111 (for a number like 0001001)

```cpp
int findHighestPowerOf2(int n){
	if(n == 0) return 0;
	
	n |= (n >> 1);
	n |= (n >> 2);
	n |= (n >> 4);
	n |= (n >> 8);
	n |= (n >> 16);
	// for 64 bit ints, n |= (n >> 32);
	return (n + 1) >> 1;
}
```



[Open File in VS Code](vscode://file/Users/vibhubhanot/Documents/DSA/bitManipulation/msbNum.cpp)
```embed-cpp
PATH: "vault://Assets/Code/bitManipulation/msbNum.cpp"
TITLE: "bitManipulation/msbNum.cpp"
LINES: "1-200"
```
