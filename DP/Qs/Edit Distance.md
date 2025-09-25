---
solution_file: dp/editDistance.cpp
tags:
  - DP
type:
solved: true
platform: CodingNinjas
date_created: Thu, 25 Sep
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250095/offering/3394694/problem/1675)

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

Given two strings s and t of lengths m and n respectively, find the edit distance between the strings.
**Edit Distance**

```
Edit Distance of two strings is minimum number of operations required to make one string equal to other. In order to do so you can perform any of the following three operations only :
1. Delete a character
2. Replace a character with another one
3. Insert a character
```
**Note**

```
Strings don't contain spaces
You need to find the edit distance from input string1 to input string2.
```

Detailed explanation ( Input/output format, Notes, Images )

**Input Format :**

```
The first line of input contains a string, that denotes the value of s. The following line contains a string, that denotes the value of t.
```
**Output Format :**

```
The first and only line of output contains the edit distance value between the given strings.
```

**Constraints :**

```
1<= m,n <= 10
Time Limit: 1 second
```

##### Sample Input 1 :

```
abc
dc
```

##### Sample Output 1 :

```
2
```

---

**Starter Code:**

```cpp
#include<vector>

// App 3 - Bottom Up (DP)
// TC - O(m * n)
// SC - O(m * n)
int editDistance(string s1, string s2){
    int m = s1.size(), n = s2.size();

    vector<vector<int>> dp(m+1, vector<int>(n+1));

    // prefill dp
    for(int i=0; i<=m; ++i) dp[i][0] = i;
    for(int j=1; j<=n; ++j) dp[0][j] = j;

    // begin looping
    for(int i=1; i<=m; ++i){
        for(int j=1; j<=n; ++j){
            // if chars are same
            if(s1[i-1] == s2[j-1]){
                dp[i][j] = dp[i-1][j-1];
            }
            else { // calculating min operations
                dp[i][j] = 1 + min(dp[i-1][j], min(dp[i-1][j-1], dp[i][j-1]));
            }
        }
    }

    return dp[m][n];
}
```

