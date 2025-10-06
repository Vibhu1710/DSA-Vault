---
solution_file: dp/coinTower.cpp
tags:
  - DP
type:
solved: true
platform: CodingNinjas
date_created: Mon, 06 Oct
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250095/offering/3394724/problem/521)

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

Whis and Beerus are playing a new game today. They form a tower of N coins and make a move in alternate turns. Beerus plays first. In one step, the player can remove either 1, X, or Y coins from the tower. The person to make the last move wins the game. Can you find out who wins the game?

Detailed explanation ( Input/output format, Notes, Images )

**Input format :**

```
The first and the only line of input contains three integer values separated by a single space. They denote the value of N, X and Y, respectively.
```
**Output format :**

```
Prints the name of the winner, either 'Whis' or 'Beerus' (Without the quotes).
```

**Constraints :**

```
1 <= N <= 10 ^ 6
2 <= X <= Y<= 50

Time Limit: 1 sec
```

**Sample Input 1 :**

```
4 2 3
```
**Sample Output 1 :**

```
Whis
```
**Sample Input 2 :**

```
10 2 4
```
**Sample Output 2 :**

```
Beerus
```
**Explanation to Sample Input 1:**

```
Initially, there are 4 coins,  In the first move, Beerus can remove either 1, 2, or 3 coins in all three cases, Whis can win by removing all the remaining coins. 
```

---

**Starter Code:**

```cpp
#include<bits/stdc++.h>

string findWinner(int n, int x, int y){
    // code here
}
```
