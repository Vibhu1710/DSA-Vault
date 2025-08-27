
Just a basic point to keep in mind.

 `vector1Ref = vector2Ref` calls the copy function
 Remember that these are aliases and not pointers ^cdz7bs
 
 So, in my opinion if:
 
 ```cpp
 void func(vector<int> &nums, vector<int> &result){
	 if(...){
		 result = nums;
		 return;
	 }

	func(nums, result);
 }
```



#### Tested Code Snippet

```cpp
#include<bits/stdc++.h>

using namespace std;

int main(){

	vector<int> v1(10, 1);
	vector<int> &v1R = v1;
	
	vector<int> v2 = {3, 4, 5, 6};
	vector<int> &v2R = v2;
	
	for(auto ele: v1) cout << ele << " ";
	cout << endl;
	for(auto ele: v2) cout << ele << " ";
	cout << endl;

	// copy function called, because it is an alias & not a pointer !!
	v2R = v1R;
	
	for(auto ele: v1R) cout << ele << " ";
	cout << endl;
	for(auto ele: v2R) cout << ele << " ";
	cout << endl;
	
	for(auto ele: v1) cout << ele << " ";
	cout << endl;
	for(auto ele: v2) cout << ele << " ";
	cout << endl;
	
	return 0;
}
```
