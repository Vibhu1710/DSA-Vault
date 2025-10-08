---
solution_file: dp/maxSizeSquareWithAll0s.cpp
tags:
  - DP
type:
solved: true
platform: CodingNinjas
date_created: Mon, 06 Oct
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250095/offering/3394724/problem/1436)

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

Given an NxM matrix that contains only 0s and 1s, find out the size of the maximum square sub-matrix with all 0s. You need to return the size of the square matrix with all 0s.

Detailed explanation ( Input/output format, Notes, Images )

**Input format :**

```
The first line of the test case contains two integer values, 'N' and 'M', separated by a single space. They represent the 'rows' and 'columns' respectively.

Second-line onwards, the next 'N' lines or rows represent the ith row values.

Each of the ith rows constitutes column values separated by a single space (Either 0 or 1).
```
**Output Format:**

```
Print the size of maximum square sub-matrix.
```

**Constraints :**

```
0 <= N <= 10^4
0 <= M <= 10^4

Time Limit: 1 sec
```

##### Sample Input 1:

```
3 3
1 1 0
1 1 1
1 1 1
```

##### Sample Output 1:

```
1
```

##### Sample Input 2:

```
4 4
0 0 0 0
0 0 0 0
0 0 0 0
0 0 0 0
```

##### Sample Output 2:

```
4
```

---

**Starter Code:**

```cpp

int findMaxSquareWithAllZeros(int **arr, int n, int m){ 
    // write code here
}

```

