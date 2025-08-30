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
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250074/offering/3394402/problem/626)

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

Given k no. of different size arrays, which are sorted individually (in ascending order). You need to merge all the given arrays such that output array should be sorted (in ascending order).
**Hint : Use Heaps.**

Detailed explanation ( Input/output format, Notes, Images )

**Input Format:**

```
The first line of input contains an integer, that denotes value of k.
The following lines of input represent k sorted arrays. Each sorted array uses two lines of input. The first line contains an integer, that denotes the size of the array. The following line contains elements of the array.
```
**Output Format:**

```
The first and only line of output contains space separated elements of the merged and sorted array, as described in the task.
```

**Constraints:**

```
0 <= k <= 1000
0 <= n1, n2 <= 10000
Time Limit: 1 second
```

**Sample Input 1:**

```
4
3
1 5 9
2
45 90
5
2 6 78 100 234
1
0
```
**Sample Output 1:**

```
0 1 2 5 6 9 45 78 90 100 234
```
