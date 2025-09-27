---
solution_file:
tags:
  - BinarySearch
type: JFR
solved: false
platform: CodingNinjas
date_created: Fri, 26 Sep
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/14262/content/262229/offering/3757164/problem/7216)

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

Aahad and Harshit always have fun by solving problems. Harshit took a sorted array consisting of distinct integers and rotated it clockwise by an unknown amount. For example, he took a sorted array = \[1, 2, 3, 4, 5\] and if he rotates it by 2, then the array becomes: \[4, 5, 1, 2, 3\].

After rotating a sorted array, Aahad needs to answer Q queries asked by Harshit, each of them is described by one integer Q\[i\]. which Harshit wanted him to search in the array. For each query, if he found it, he had to shout the index of the number, otherwise, he had to shout -1.

For each query, you have to complete the given method where 'key' denotes Q\[i\]. If the key exists in the array, return the index of the 'key', otherwise, return -1.

Note:

```
Can you solve each query in O(logN) ?
```

Detailed explanation ( Input/output format, Notes, Images )

**Input Format:**

```
The first line of input contains the size of the array: N

The second line contains N single space-separated integers: A[i].

The third line of input contains the number of queries: Q

The next Q lines of input contain: the number which Harshit wants Aahad to search: Q[i]
```
**Output Format:**

```
For each test case, print the index of the number if found, otherwise -1.

Output for every test case will be printed in a separate line.
```
**Note:**

```
You are not required to explicitly print the expected output, just return it and printing has already been taken care of.
```

**Constraints:**

```
1 <= N <= 10^6
-10^9 <= A[i] <= 10^9
1 <= Q <= 10^5
-10^9 <= Q[i] <= 10^9

Time Limit: 1sec
```

##### Sample Input 1:

```
4
2 5 -3 0
2
5
1
```

##### Sample Output 1:

```
1
-1
```

##### Explanation For Sample Input 1:

```
In the 1st test case, 5 is found at index 1

In the 2nd test case, 1 is not found in the array, hence return -1.
```

##### Sample Input 2:

```
5
100 -2 6 10 11
2
100
6
```

##### Sample Output 2:

```
0
2
```

---

**Starter Code:**

```cpp
int search(int* arr, int n, int key) {
    // your code here
}
```

