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
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250074/offering/3394385/problem/628)

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

You are given with an integer k and an array of integers that contain numbers in random order. Write a program to find k smallest numbers from given array. You need to save them in an array and return it.
**Notes :**

```
1. Time complexity should be O(n * logk) and space complexity should not be more than O(k).
2. Order of elements in the output is not important.
```

Detailed explanation ( Input/output format, Notes, Images )

**Input Format :**

```
The first line of input contains an integer, that denotes the value of the size of the array. Let us denote it with the symbol N.
The following line contains N space separated integers, that denote the value of the elements of the array.
The following line contains an integer, that denotes the value of k.
```
**Output Format :**

```
The first and only line of output print k smallest elements. The elements in the output are separated by a single space. 
```

**Constraints:**

```
Time Limit: 1 sec
```

##### Sample Input 1 :

```
13
2 12 9 16 10 5 3 20 25 11 1 8 6 
4
```

##### Sample Output 1 :

```
1 2 3 5 
```

---

**Starter Code:**

```cpp
vector<int> kSmallest(int arr[], int n, int k) {
    // Write your code here
}
```

