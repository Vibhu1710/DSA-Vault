---
solution_file: trees/binaryTree/printNodesAtDistanceKFromNode.cpp
tags:
  - BinaryTree
type: TBR
solved: true
platform: CodingNinjas
date_created: Thu, 28 Aug
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250067/offering/3394299/problem/81)

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

You are given a Binary Tree of type integer, a integer value of target node's data, and an integer value K.

Print the data of all nodes that have a distance K from the target node. The order in which they would be printed will not matter.
**Example:**

```
For a given input tree(refer to the image below):
1. Target Node: 5
2. K = 2
```

![alt txt](https://files.codingninjas.in/node-distance-from-k-4809.png)

```
Starting from the target node 5, the nodes at distance K are 7 4 and 1.
```

Detailed explanation ( Input/output format, Notes, Images )

**Input Format:**

```
The first line of input will contain the node data, all separated by a single space. Since -1 is used as an indication whether the left or right node data exist for root, it will not be a part of the node data.

The second line of input contains two integers separated by a single space, representing the value of the target node and K, respectively.
```
**Output Format:**

```
All the node data at distance K from the target node will be printed on a new line.

The order in which the data is printed doesn't matter.
```

**Constraints:**

```
1 <= N <= 10^5
Where N is the total number of nodes in the binary tree.
1 ≤ data of node ≤ 10^9
1 ≤ target ≤ 10^9

Time Limit: 1 sec
```

**Sample Input 1:**

```
5 6 10 2 3 -1 -1 -1 -1 -1 9 -1 -1
3 1
```
**Sample Output 1:**

```
9
6
```
**Sample Input 2:**

```
1 2 3 4 5 6 7 -1 -1 -1 -1 -1 -1 -1 -1
3 3
```
**Sample Output 2:**

```
4
5
```

---

**Starter Code:**

```cpp
/**********************************************************

        Following is the Binary Tree Node class structure

        template <typename T>
        class BinaryTreeNode {
        public :
        T data;
        BinaryTreeNode<T> *left;
        BinaryTreeNode<T> *right;

        BinaryTreeNode(T data) {
                this -> data = data;
                left = NULL;
                right = NULL;
        }
        };

***********************************************************/

void nodesAtDistanceK(BinaryTreeNode<int> *root, int node, int k) {
    // Write your code herez
}
```

