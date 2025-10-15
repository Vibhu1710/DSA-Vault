---
solution_file: 
tags: []
type: 
solved: false
platform: CodingNinjas
date_created: Wed, 15 Oct
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250095/offering/3394724/problem/532)

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

Gary has two string S and V. Now, Gary wants to know the length shortest subsequence in S, which is not a subsequence in V.

Note: The input data will be such that there will always be a solution.

Detailed explanation ( Input/output format, Notes, Images )

**Input Format :**

```
The first line of input contains a string, that denotes the value of S. The following line contains a string, that denotes the value of V.
```
**Output Format :**

```
Length of shortest subsequence in S such that it is not a subsequence in V
```

**Constraints:**

```
1 <= |S| <= 1000 (|x| implies the length of the string x)
1 <= |V| <= 1000 
Time Limit: 1 second
```

##### Sample Input 1:

```
babab
babba
```

##### Sample Output 1:

```
3
```

##### Explanation:

```
"aab" is the shortest subsequence which is present in S and absent in V.
```

---

**Starter Code:**

```cpp

int solve(string s, string v) {
  // start coding here
}

```

