---
solution_file: 
tags: []
type: 
solved: false
platform: CodingNinjas
date_created: Sat, 27 Sep
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/14262/content/262229/offering/3757168/problem/9737)

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

You are given an array ***'arr'*** consisting of ***'n'*** integers which denote the position of a stall.

You are also given an integer ***'k'*** which denotes the number of aggressive cows.

You are given the task of assigning stalls to 'k' cows such that the minimum distance between any two of them is the maximum possible.

Print the maximum possible minimum distance.
**Example:**

```
Input: 'n' = 3, 'k' = 2 and 'arr' = {1, 2, 3}

Output: 2

Explanation: The maximum possible minimum distance will be 2 when 2 cows are placed at positions {1, 3}. Here distance between cows is 2.
```

Detailed explanation ( Input/output format, Notes, Images )

**Input format :**

```
The first line contains two integers ‘n’ and ‘k’ denoting the number of elements in the array and the number of aggressive cows.

The second line contains ‘n’ single space-separated integers denoting the position of the stalls.
```
**Output format :**

```
Return the largest possible minimum distance between cows.
```
**Note :**

```
You do not need to print anything; it has already been handled.
```

**Sample Input 1 :**

```
6 4
0 3 4 7 10 9
```
**Sample Output 1 :**

```
3
```
**Explanation to Sample Input 1 :**

```
The maximum possible minimum distance between any two cows will be 3 when 4 cows are placed at positions {0, 3, 7, 10}. Here distance between cows are 3, 4 and 3 respectively.
```
**Sample Input 2 :**

```
5 2
4 2 1 3 6
```
**Sample Output 2 :**

```
5
```
**Expected time complexity:**

```
Can you solve this in O(n * log(n)) time complexity?
```
**Constraints :**

```
2 <= 'n' <= 10 ^ 5
2 <= 'k' <= n
0 <= 'arr[i]' <= 10 ^ 9
Time Limit: 1 sec.
```

---

**Starter Code:**

```cpp
#include<climits>


// Bottom Up Approach - Memoization
// TC - O(n * k), SC - O(n * k)
pair<int, int> findMaximumClosestDistance(vector<vector<pair<int, int>>> &memo, vector<int> &stalls, int n, int k){
    if(k == 2){
        return memo[n][k];
    }

    // using memoized value
    if(memo[n][k].first != -1) return memo[n][k];

    // Case 1. Cow ignored for current position
    pair<int, int> cowIgnoredRes = {-1, -1}; // Indicative of invalid entry
    if(n > k){
        cowIgnoredRes = findMaximumClosestDistance(memo, stalls, n-1, k);
    }

     // Case 2. Cow selected for current position
    auto cowSelectedRes = findMaximumClosestDistance(memo, stalls, n-1, k-1);
    int lastSelectedCowPos = cowSelectedRes.second;
    int closestDist = min(cowSelectedRes.first, stalls[n-1] - lastSelectedCowPos);

    pair<int, int> cowSelectedNewRes = {closestDist, stalls[n-1]};
    // no case will occur in this where, closestDist b/w noCowSelected and cowSelected is equal
    // because, for the same n, if you enter with k and k-1 cows, the closestDist for k-1 is always > that for k
    return memo[n][k] = max(cowIgnoredRes, cowSelectedNewRes);
}
int aggressiveCows(vector<int> &stalls, int k){
    sort(stalls.begin(), stalls.end()); // nlogn
    int n = stalls.size();
    vector<vector<pair<int, int>>> memo(n+1, vector<pair<int, int>>(k+1, {-1, -1}));
    for(int i=2; i<=n; ++i) memo[i][2] = {stalls[i-1] - stalls[0], stalls[i-1]};
    return findMaximumClosestDistance(memo, stalls, stalls.size(), k).first;
}


// Recursive Approach
// TC - O(2 ^ (n + k)), SC - O(n + k) [recursion stack]
// pair<int, int> findMaximumClosestDistance(vector<int> &stalls, int n, int k){
//     if(k == 2){ // on observing more thoroughly, I found this new base case
//         return {stalls[n-1] - stalls[0], stalls[n-1]};
//     }

//     // Case 1. Cow ignored for current position
//     pair<int, int> cowIgnoredRes = {-1, -1}; // Indicative of invalid entry
//     if(n > k){
//         cowIgnoredRes = findMaximumClosestDistance(stalls, n-1, k);
//     }

//      // Case 2. Cow selected for current position
//     auto cowSelectedRes = findMaximumClosestDistance(stalls, n-1, k-1);
//     int lastSelectedCowPos = cowSelectedRes.second;
//     int closestDist = min(cowSelectedRes.first, stalls[n-1] - lastSelectedCowPos);

//     pair<int, int> cowSelectedNewRes = {closestDist, stalls[n-1]};
//     // no case will occur in this where, closestDist b/w noCowSelected and cowSelected is equal
//     // because, for the same n, if you enter with k and k-1 cows, the closestDist for k-1 is always > that for k
//     return max(cowIgnoredRes, cowSelectedNewRes);
// }
// int aggressiveCows(vector<int> &stalls, int k){
//     sort(stalls.begin(), stalls.end()); // nlogn
//     return findMaximumClosestDistance(stalls, stalls.size(), k).first;
// }




```

