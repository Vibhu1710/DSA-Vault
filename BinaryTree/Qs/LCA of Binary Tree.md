---
solution_file: trees/binaryTree/lca.cpp
tags:
  - BinaryTree
type: JFR
solved: true
platform: CodingNinjas
date_created: Wed, 27 Aug
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250067/offering/3394299/problem/513?leftPanelTabValue=PROBLEM)

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

Given a binary tree and data of two nodes, find 'LCA' (Lowest Common Ancestor) of the given two nodes in the binary tree.
**LCA**

```
LCA of two nodes A and B is the lowest or deepest node which has both A and B as its descendants. 
```
**Example:**

```
In this example, the green coloured node is the LCA to A and B.
```

![Alt Text](https://files.codingninjas.in/image1-5333.jpg)
**Note:**

```
It is defined that each node is a descendant to itself, so, if there are two nodes X and Y and X has a direct connection from Y, then Y is the lowest common ancestor.
```
**Example:**

![Alt Text](https://files.codingninjas.in/image2-5334.jpg)

Note:

```
1. If out of 2 nodes only one node is present, return that node. 
2. If both are not present, return -1.
```

Detailed explanation ( Input/output format, Notes, Images )

**Input format:**

```
The first line of input contains data of the nodes of the tree in level order form. The data of the nodes of the tree is separated by space. If any node does not have left or right child, take -1 in its place. Since -1 is used as an indication whether the left or right nodes exist, therefore, it will not be a part of the data of any node.
The following line of input contains two integers, denoting the value of data of two nodes of given binary tree.
```
**Output Format:**

```
The first and only line of output contains the data associated with the lowest common ancestor node.
```

**Constraints:**

```
Time Limit: 1 second
```

**Sample Input 1:**

```
5 10 6 2 3 -1 -1 -1 -1 -1 9 -1 -1
2 10
```
**Sample Output 1:**

```
10
```
**Sample Input 2:**

```
5 10 6 2 3 -1 -1 -1 -1 -1 9 -1 -1
2 6
```
**Sample Output 2:**

```
5
```
**Sample Input 3:**

```
5 10 6 2 3 -1 -1 -1 -1 -1 9 -1 -1
12 78
```
**Sample Output 3:**

```
-1
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

int getLCA(BinaryTreeNode <int>* root , int a, int b) {
    // Write your code here
}
```




> [!NOTE] After Thoughts
> - The important caveat here is to know that if either a or b is found, we don't need to go further.
> - As it would be either the LCA or would be the sole element found in that subtree.


