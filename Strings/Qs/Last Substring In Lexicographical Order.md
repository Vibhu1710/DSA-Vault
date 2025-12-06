---
solution_file: strings/string 2/lastSubstringLexicographically.cpp
tags:
  - Strings
type:
solved: true
platform: CodingNinjas
date_created: Fri, 05 Dec
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/14262/content/262247/offering/5245605/problem/10251?leftPanelTabValue=PROBLEM)

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

You are given a string ‘Str’ of length ‘N’. Find the last substring of ‘Str’ in lexicographical order.

In Lexicographical order string ‘S1’ comes before string ‘S2’ if S1 is the prefix of S2 and (|S1| < |S2|), or if none of them is a prefix of the other and at the first position where they differ, the character in ‘S1’ is smaller than the character in ‘S2’.
**Example :**

```
Consider string ‘Str’ = “abba”, then its substring in lexicographical order is [“a”, “ab”, “abb”, “abba”, “b”, “bb”, “bba”].  Clearly, the last substring in lexicographical order is  “bba”. 
```

Detailed explanation ( Input/output format, Notes, Images )

**Input format :**

```
The first line of input contains an integer ‘T’ denoting the number of test cases, then ‘T’ test cases follow.

The first and only line of each test case consists string ‘Str’
```
**Output format :**

```
For each test case, in a separate line print the last substring of ‘Str’ in lexicographical order.
```

Note :

```
You do not need to print anything, it has already been taken care of. Just implement the given function.
```

**Constraints :**

```
1 <= T <= 50
1 <= N <= 10^4
‘Str’ contains only lowercase English letters.

Time limit: 1 sec
```

---

**Starter Code:**

```cpp
string findLastSubstring(string &str) {
    // code here
}
```

