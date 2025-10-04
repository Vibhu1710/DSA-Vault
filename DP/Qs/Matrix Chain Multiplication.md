---
solution_file: dp/mcmResolved.cpp
tags:
  - DP
type:
solved: true
platform: CodingNinjas
date_created: Fri, 03 Oct
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250095/offering/3394724/problem/860)

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

Given a chain of matrices A1, A2, A3,.....An, you have to figure out the most efficient way to multiply these matrices. In other words, determine where to place parentheses to minimize the number of multiplications.

You will be given an array p\[\] of size n + 1. Dimension of matrix Ai is p\[i - 1\]\*p\[i\]. You need to find minimum number of multiplications needed to multiply the chain.

Detailed explanation ( Input/output format, Notes, Images )

**Input Format:**

```
The first line of input contains an integer, that denotes the value of n. The following line contains n+1 integers, that denote the value of elements of array p[].
```

###### Output Format:

```
The first and only line of output prints the minimum number of multiplication needed.
```

###### Constraints :

```
1 <= n <= 100
Time limit: 1 second
```

##### Sample Input 1:

```
3
10 15 20 25
```

##### Sample Output 1:

```
8000
```

##### Sample Output Explanation:

```
There are two ways to multiply the chain - A1*(A2*A3) or (A1*A2)*A3.
If we multiply in order- A1*(A2*A3), then number of multiplications required are 11250.
If we multiply in order- (A1*A2)*A3, then number of multiplications required are 8000.
Thus minimum number of multiplications required are 8000. 
```

---

**Starter Code:**

```cpp
#include<bits/stdc++.h>

// Bottom Up Approach - DP
// TC - O(n^3), SC - O(n^2)
int matrixChainMultiplication(int* arr, int n) {
    vector<vector<int>> dp(n, vector<int>(n)); // prefilled with 0 (base case already covered)
    // all diagonals already filled with 0

    // looping
    for(int j = 1; j<n; ++j){
        for(int i=0; (i + j) < n; ++i){

            int startIndex = i;
            int endIndex = i+j;

            // dp logic here
            int minOperations = INT_MAX;
            for(int splitIndex = startIndex; splitIndex < endIndex; ++splitIndex){
                int minOperationCountLeft = dp[startIndex][splitIndex];
                int minOperationCountRight = dp[splitIndex+1][endIndex];

                int operationsForCurrentSplit = (arr[startIndex] * arr[splitIndex+1] * arr[endIndex+1]);
                // arr[endIndex+1] because, the size of the array is n+1

                minOperations = min(minOperations, operationsForCurrentSplit + minOperationCountLeft + minOperationCountRight);
            }

            dp[startIndex][endIndex] = minOperations;
        }
    }

    return dp[0][n-1];
}

// Top Down Approach - Memoization
// TC - O(n^3), SC - O(n^2)
// int findMCM(vector<vector<int>> &memo, int* arr, int startIndex, int endIndex){
//     if(startIndex == endIndex){
//         return 0;
//     }

//     // using memoization
//     if(memo[startIndex][endIndex] != -1) return memo[startIndex][endIndex];

//     //  recursive logic
//     int minOperations = INT_MAX;
//     for(int splitIndex = startIndex; splitIndex < endIndex; ++splitIndex){
//         int minOperationCountLeft = findMCM(memo, arr, startIndex, splitIndex);
//         int minOperationCountRight = findMCM(memo, arr, splitIndex+1, endIndex);

//         int operationsForCurrentSplit = (arr[startIndex] * arr[splitIndex+1] * arr[endIndex+1]);
//         // arr[endIndex+1] because, the size of the array is n+1

//         minOperations = min(minOperations, operationsForCurrentSplit + minOperationCountLeft + minOperationCountRight);
//     }
//     return memo[startIndex][endIndex] = minOperations;
// }
// int matrixChainMultiplication(int* arr, int n) {
//     vector<vector<int>> memo(n, vector<int>(n, -1));
//     return findMCM(memo, arr, 0, n-1);
// }
```

