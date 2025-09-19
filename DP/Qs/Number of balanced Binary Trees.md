---
solution_file:
tags:
  - DP
type:
solved: false
platform: CodingNinjas
date_created: Fri, 19 Sep
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250091/offering/3394650/problem/138?leftPanelTabValue=PROBLEM)

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

Given an integer h, find the possible number of balanced binary trees of height h. You just need to return the count of possible binary trees which are balanced.

This number can be huge, so, return output modulus 10^9 + 7.

Time complexity should be O(h).

Detailed explanation ( Input/output format, Notes, Images )

**Input Format :**

```
The first and only line of input contains an integer, that denotes the value of h. Here, h is the height of the tree.
```
**Output Format :**

```
The first and only line of output contains the count of balanced binary trees modulus 10^9 + 7.
```

**Constraints :**

```
1 <= h <= 10^6
Time Limit: 1 sec
```

##### Sample Input 1:

```
3
```

##### Sample Output 1:

```
15
```

##### Sample Input 2:

```
4
```

##### Sample Output 2:

```
315
```

---

**Starter Code:**

```cpp
int balancedBTs(int n) {
    // Write your code here
}
```

