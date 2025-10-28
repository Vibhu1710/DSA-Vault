---
solution_file: dp/01knapsack.cpp
tags:
  - DP
type:
solved: true
platform: CodingNinjas
date_created: Wed, 01 Oct
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250095/offering/3394716/problem/845?leftPanelTabValue=PROBLEM)

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

A thief is robbing a store and can carry a maximal weight of W into his knapsack. There are N items and ith item weighs wi and is of value vi. Considering the constraints of maximum weight that knapsack can carry, you have to find and return the maximum value that thief can generate by stealing items.
**Note**

```
Space complexity should be O(W).
```

Detailed explanation ( Input/output format, Notes, Images )

**Input Format :**

```
The first line contains an integers, that denote the value of N. The following line contains N space separated integers, that denote the values of weight of items. The following line contains N space separated integers, that denote the values associated with the items. The following line contains an integer that denote the value of W. W denotes maximum weight that thief can carry.
```
**Output Format :**

```
The first and only line of output contains the maximum value that thief can generate, as described in the task. 
```

**Constraints**

```
1 <= N <= 10^4
1<= wi <= 100
1 <= vi <= 100
Time Limit: 1 second
```

**Sample Input 1 :**

```
4
1 2 4 5
5 4 8 6
5
```
**Sample Output 1 :**

```
13
```

---

**Starter Code:**

```cpp
#include<vector>
#include<climits>


// DP - Top-Down Approach
// TC - O(N * W), SC-  O(W) (space complexity optimized)
int knapsack(int* weight, int* value, int n, int maxWeight) {
    vector<int> curMaxValueStore(maxWeight+1), prevMaxValueStore(maxWeight + 1);

    for(int i=1; i<=n; ++i){
        for(int W = 1; W <= maxWeight; ++W){
            int valueForSelected = INT_MIN;
            // choose the weight
            if(W - weight[i-1] >= 0){
                valueForSelected = value[i-1] + prevMaxValueStore[W - weight[i-1]];
            }
            // do not choose the weight
            int valueForUnSelected = prevMaxValueStore[W];
            curMaxValueStore[W] = max(valueForSelected, valueForUnSelected);
        }
        prevMaxValueStore = curMaxValueStore;
    }

    return curMaxValueStore[maxWeight];
}

// DP - Top-Down Approach
// TC - O(N * W), SC-  O(N * W)
// int knapsack(int* weight, int* value, int n, int maxWeight) {
// 	vector<vector<int>> dp(n+1, vector<int>(maxWeight + 1)); // prefilled with 0

//     for(int i=1; i<=n; ++i){
//         for(int W = 1; W <= maxWeight; ++W){
//             int valueForSelected = INT_MIN;
//             // choose the weight
//             if(W - weight[i-1] >= 0){
//                 valueForSelected = value[i-1] + dp[i-1][W - weight[i-1]];
//             }
//             // do not choose the weight
//             int valueForUnSelected = dp[i-1][W];
//             dp[i][W] = max(valueForSelected, valueForUnSelected);
//         }
//     }

//     return dp[n][maxWeight];
// }


// Memoization - Top-Down Approach
// int maxValInSack(int *weight, int *value, int n, int index, int capacity, vector<vector<int>> &mem){
//     if(index == n){
//         return 0;
//     }
    
//     if(mem[index][capacity] != -1)
//         return mem[index][capacity];
    
//     if(weight[index] > capacity){
//         return mem[index][capacity] = maxValInSack(weight, value, n, index+1, capacity, mem);
//     }
    
//     int valWhenItemRejected = maxValInSack(weight, value, n, index+1, capacity, mem);
//     int valWhenItemSelected = value[index] + maxValInSack(weight, value, n, index+1, capacity - weight[index], mem);
//     return mem[index][capacity] = max(valWhenItemRejected, valWhenItemSelected);
// }
// int knapsack(int* weight, int* value, int n, int maxWeight) {
// 	// Write your code here
//     vector<vector<int>> mem(n, vector<int>(maxWeight+1, -1));
    
//     return maxValInSack(weight, value, n, 0, maxWeight, mem);
// }
```


- Making space complexity O(W) is interesting with DP