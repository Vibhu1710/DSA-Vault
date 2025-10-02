---
solution_file:
tags:
  - DP
type:
solved: false
platform: CodingNinjas
date_created: Thu, 02 Oct
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250095/offering/3394724/problem/1679)

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

Given an array with N elements, you need to find the length of the longest subsequence in the given array such that all elements of the subsequence are sorted in strictly increasing order.

Detailed explanation ( Input/output format, Notes, Images )

**Input Format**

```
The first line of input contains an integer N. The following line contains N space separated integers, that denote the value of elements of array.
```
**Output Format**

```
The first and only line of output contains the length of longest subsequence.
```

**Constraints**

```
1 <= N <= 10^3
Time Limit: 1 second
```

**Sample Input 1 :**

```
6
5 4 11 1 16 8
```
**Sample Output 1 :**

```
3
```
**Sample Output Explanation**

```
Length of longest subsequence is 3 i.e. (5,11,16) or (4,11,16).
```
**Sample Input 2 :**

```
3
1 2 2
```
**Sample Output 2 :**

```
2
```

---

**Starter Code:**

```cpp
int longestIncreasingSubsequence(int* arr, int n){
    // write your code here
}
```


