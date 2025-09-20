---
solution_file: dp/minCount.cpp
tags:
  - DP
type: JFR
solved: true
platform: CodingNinjas
date_created: Thu, 18 Sep
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250091/offering/3394639/problem/1442?leftPanelTabValue=PROBLEM)

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

Given an integer N, find and return the count of minimum numbers required to represent N as a sum of squares.

That is, if N is 4, then we can represent it as : {1^2 + 1^2 + 1^2 + 1^2} and {2^2}. The output will be 1, as 1 is the minimum count of numbers required to represent N as sum of squares.

Detailed explanation ( Input/output format, Notes, Images )

**Input format :**

```
The first and the only line of input contains an integer value, 'N'.
```
**Output format :**

```
Print the minimum count of numbers required.
```

**Constraints :**

```
0 <= n <= 10 ^ 4

Time Limit: 1 sec
```

##### Sample Input 1 :

```
12
```

##### Sample Output 1 :

```
3
```

##### Explanation of Sample Output 1 :

```
12 can be represented as : 
A) (1^2) + (1^2) + (1^2) + (1^2) + (1^2) + (1^2) + (1^2) + (1^2) + (1^2) + (1^2) + (1^2) + (1^2)

B) (1^2) + (1^2) + (1^2) + (1^2) + (1^2) + (1^2) + (1^2) + (1^2)  + (2 ^ 2)

C) (1^2) + (1^2) + (1^2) + (1^2) + (2 ^ 2) + (2 ^ 2)

D) (2 ^ 2) + (2 ^ 2) + (2 ^ 2)

As we can see, the output should be 3.
```

##### Sample Input 2 :

```
9
```

##### Sample Output 2 :

```
1
```

---

**Starter Code:**

```cpp
int minCount(int n)
{
	//Write your code here
}
```



> [!NOTE] After Thoughts
> - This is one example of DP question where we are looping at every n in the DP array, giving the time complexity to be O(n * rootN)
>  - Also have a look brute force time complexity analysis:
>   
> ![[Screenshot 2025-09-19 at 11.46.55 AM.png]]

