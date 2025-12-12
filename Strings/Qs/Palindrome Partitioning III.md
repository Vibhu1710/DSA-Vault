---
solution_file: strings/string 2/palindromePartitioning3.cpp
tags:
  - Strings
type:
solved: true
platform: CodingNinjas
date_created: Thu, 11 Dec
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/14262/content/262247/offering/5245605/problem/10738?leftPanelTabValue=PROBLEM)

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

On Valentine’s Day, Alice and Bob planned to go on a dinner date, but Alice is still unsure about Bob, so she decided to give him a task. She gave him a string ‘S’ of length ‘N’ containing only lowercase English letters and an integer ‘K’ and told him that he could:

```
Change some characters of ‘S’ to other lowercase letters  (if required).

Divide ‘S’ into ‘K’ non-empty disjoint substrings such that each substring is a palindrome.
```

She asked Bob to find the minimum number of characters he needs to change to divide the given string in the required condition. Since Bob is busy preparing a perfect date for her, he called you to solve Alice’s challenge. Can you help Bob to impress her?

Detailed explanation ( Input/output format, Notes, Images )

**Input Format**

```
The first line of input contains an integer 'T' representing the number of test cases.

The first line of each test case contains two space-separated integers, ‘N’ and ‘K’. Here ‘N’ denotes the length of the string, and ‘K’ is an integer given by Alice.

The next line contains a string ‘S’ of length ‘N’. Here ‘S’ is the string given by Alice to Bob. 
```
**Output Format:**

```
For each test case, print a single line containing a single integer denoting the minimum number of characters that Bob needs to change to divide ‘S’ into ‘K’ non-empty disjoint palindromic substrings.

The output of each test case will be printed in a separate line.
```
**Note:**

```
You do not need to print anything, it has already been taken care of. Just implement the given function.
```

**Constraints:**

```
1 <= T <= 5
1 <= N <= 50
1 <= K <= N
‘S’ contains only lowercase English letters.

Time limit: 1 sec.
```

##### Sample Input 1:

```
2
6 2
coding
6 6
ninjas
```

##### Sample Output 1:

```
2
0
```

##### Explanation For Sample Input 1:

```
Test Case 1 :  
The string given by Alice is “coding” and ‘K’ = 2
One possible way is to change ‘d’ to ‘c’ and ‘g’ to ‘i’, the resulting string will be “cocini”

Now we can divide the new string into 2 substrings “coc” and “ini”
So the minimum required change is 2.

Test Case 2 : 
The string given by Alice is “ninjas” and ‘K’ = 6

We can divide the string into 6 substrings of length 1.
So the minimum required change is 0.
```

##### Sample Input 2:

```
1
6 3
aabbcc
```

##### Sample Output 2:

```
0
```

---

**Starter Code:**

```cpp
#include<bits/stdc++.h>
using namespace std;


int paliPartitioning(string &s, int k){
  int n = s.size();

  if(n == 1) return 0;

  vector<vector<int>> changes(n, vector<int>(n)); // all prefilled with 0 by default

  for(int i=n-1; i>=0; --i){
    for(int j=i+1; j<n; ++j){
      int innerSegmentMinChanges = 0;
      if(j > i+1){
        innerSegmentMinChanges = changes[i+1][j-1];
      }
      changes[i][j] = (s[i] == s[j] ? 0 : 1) + innerSegmentMinChanges;
    }
  }

  if(k == 1) return changes[0][n-1];

  vector<vector<int>> dp(k+1, vector<int>(n));

  // some prefilling required for seg = 1 scenario
  for(int i=0; i<n; ++i){
    dp[1][i] = changes[i][n-1];
  }
  
  for(int seg = 2; seg <= k; ++seg){
    for(int i = 0; i < n; ++i){
      int minChanges = INT_MAX;
      for(int j = i; j < n - seg + 1; ++j){
        minChanges = min(minChanges, changes[i][j] + dp[seg-1][j+1]);
      }
      dp[seg][i] = minChanges;
    }
  }

  return dp[k][0];
}
```

