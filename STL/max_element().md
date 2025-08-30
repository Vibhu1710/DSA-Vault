

<br/>

### Get Index of Element with Max Value (in given vector)

- *Scenario I encountered*
> **Note that**, if all indices have the same value, the maximum index will be chosen (in this case, rightChildIndex)
> 
> This is because, in Pairs, comparison first happens for the 'first' element and then the 'second'


```cpp
int getMaxEleIndex(vector<int> &maxHeap, int parentIndex, int leftChildIndex, int rightChildIndex){
	vector<pair<int, int>> candidates = {
		{maxHeap[parentIndex], parentIndex},
		{leftChildIndex < maxHeap.size() ? maxHeap[leftChildIndex] : INT_MIN, leftChildIndex},
		{rightChildIndex < maxHeap.size() ? maxHeap[rightChildIndex] : INT_MIN, rightChildIndex}
	};
	
	return max_element(candidates.begin(), candidates.end()) -> second;
}
```


- *Generic usecase*

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> arr = {5, 8, 2, 10, 3};

    int maxIndex = max_element(arr.begin(), arr.end()) - arr.begin();

    cout << "Max element index: " << maxIndex << "\n";  // Output: 3
    cout << "Max element value: " << 
    arr[maxIndex] << " " << 
    *max_element(arr.begin(), arr.end()) << "\n"; // Output: 10
}
```