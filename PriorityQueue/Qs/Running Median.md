---
solution_file:
tags:
  - PriorityQueue
type:
solved: false
platform: CodingNinjas
date_created: Fri, 29 Aug
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250074/offering/3394402/problem/1642)

---

##### Solved Example  
```dataviewjs
const linkPrefix = "vscode://file/Users/vibhubhanot/Documents/DSA/";
let path = dv.current().file.path;
let meta = app.metadataCache.getCache(path);
const frontmatter = meta.frontmatter;

if (frontmatter?.solution_file) {
    // File path already exists → show link
    dv.el("a", "Link", { href: linkPrefix + frontmatter?.solution_file });
} else {
    // No file path yet → show Add button
    const btn = dv.el("button", "Add solution file");

    btn.onclick = async () => {
        const qa = app.plugins.plugins.quickadd.api;
        const filePath = await qa.inputPrompt("Enter relative file path:");

        if (filePath) {
            // --- Update YAML frontmatter ---
            const file = app.vault.getAbstractFileByPath(dv.current().file.path);
            await app.fileManager.processFrontMatter(file, fm => {
                fm.solution_file = filePath;
                fm.solved = true;
            });

            // Replace button with link
            btn.remove();
            dv.el("a", "Link", { href: linkPrefix + filePath });
        }
    };
}
```

---


## Problem statement
<ninjas-problems-ui-send-feedback-button><button>Send feedback</button></ninjas-problems-ui-send-feedback-button>

You are given a stream of 'N' integers. For every 'i-th' integer added to the running list of integers, print the resulting median.

Print only the integer part of the median.

Detailed explanation ( Input/output format, Notes, Images )

**Input Format :**

```
The first line of input contains an integer 'N', denoting the number of integers in the stream.

The second line of input contains 'N' integers separated by a single space.
```
**Output Format :**

```
Print the running median for every integer added to the running list in one line (space-separated).
```
**Input Constraints**

```
0 <= N <= 10 ^ 5
1 <= ARR[i] <= 10 ^ 5

Time Limit: 1 sec
```

##### Sample Input 1 :

```
6
6 2 1 3 7 5
```

##### Sample Output 1 :

```
6 4 2 2 3 4
```

##### Explanation of Sample Output 1 :

```
S = {6}, median = 6
S = {6, 2} -> {2, 6}, median = 4
S = {6, 2, 1} -> {1, 2, 6}, median = 2
S = {6, 2, 1, 3} -> {1, 2, 3, 6}, median = 2
S = {6, 2, 1, 3, 7} -> {1, 2, 3, 6, 7}, median = 3
S = {6, 2, 1, 3, 7, 5} -> {1, 2, 3, 5, 6, 7}, median = 4
```

##### Sample Input 2 :

```
5
5 4 3 2 1
```

##### Sample Output 2 :

```
5 4 4 3 3
```

---

**Starter Code:**

```cpp
#include<queue>

void findMedian(int *arr, int n)
{
    if(n == 0)
        return;

    priority_queue<int> firstHalf; // max pq
    priority_queue<int, vector<int>, greater<int>> secondHalf; // min pq
    
    secondHalf.push(arr[0]);
    cout << arr[0] << " ";
    
    int median;
    
    for(int i=1; i<n; ++i){
        
        if(arr[i] >= secondHalf.top()){
            secondHalf.push(arr[i]);
        }
        else {
            firstHalf.push(arr[i]);
        }
        int secondSize = secondHalf.size();
        int firstSize = firstHalf.size();
        int sizeDiff = abs(secondSize - firstSize);
        
        if(sizeDiff > 1){
            if (firstHalf.size() > secondHalf.size()){
                secondHalf.push(firstHalf.top());
            	firstHalf.pop();
            }
            else {
                firstHalf.push(secondHalf.top());
            	secondHalf.pop();
            }
            sizeDiff = 0;
        }
        
        
        if (sizeDiff == 1) {
            if (firstHalf.size() > secondHalf.size())
                median = firstHalf.top();
            else
                median = secondHalf.top();
        }
        else  // sizeDiff == 0
            median = (firstHalf.top() + secondHalf.top()) / 2;
        
        cout << median << " ";
    }
    cout << endl;
}


// void findMedian(int *arr, int n)
// {
//     if(n == 0)
//         return;

//     priority_queue<int> firstHalf; // max pq
//     priority_queue<int, vector<int>, greater<int>> secondHalf; // min pq
    
//     secondHalf.push(arr[0]);
//     cout << arr[0] << " ";
    
    
//     for(int i=1; i<n; ++i){
        
//         if(arr[i] >= secondHalf.top()){
//             secondHalf.push(arr[i]);
//         }
//         else {
//             firstHalf.push(arr[i]);
//         }
        
        
//         if(firstHalf.size() > secondHalf.size()){
//             secondHalf.push(firstHalf.top());
//             firstHalf.pop();
//         }
//         if(secondHalf.size() - firstHalf.size() > 1){
//             firstHalf.push(secondHalf.top());
//             secondHalf.pop();
//         }
        
        
//         if(secondHalf.size() - firstHalf.size() == 1){
//             cout << secondHalf.top() << " ";
//         }
//         else if(secondHalf.size() - firstHalf.size() == 0){
//             int med = (firstHalf.top() + secondHalf.top()) / 2;
//             cout << med << " ";
//         }
//     }
//     cout << endl;
// }
```

