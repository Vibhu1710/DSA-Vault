---
solution_file:
tags:
  - BST
type: Special
solved: false
platform: CodingNinjas
date_created: Thu, 21 Aug
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250067/offering/3394299/problem/105?leftPanelTabValue=PROBLEM)

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

Given a binary search tree and an integer S, find pair of nodes in the BST which sum to S. You can use extra space of the order of O(log n).
**Note:**

```
1. Assume BST contains all unique elements.
2. In a pair, print the smaller element first.
```

Detailed explanation ( Input/output format, Notes, Images )

**Input Format :**

```
The first line of input contains data of the nodes of the tree in level order form. The data of the nodes of the tree is separated by space. If any node does not have left or right child, take -1 in its place. Since -1 is used as an indication whether the left or right nodes exist, therefore, it will not be a part of the data of any node.   
The following line of input contains an integer, that denotes the value of S.
```
**Output format:**

```
You have to print each pair in a different line (pair elements separated by space). The order of different pairs, to be printed, does not matter.
```

**Constraints:**

```
Time Limit: 1 second   
```

##### Sample Input 1:

```
8 5 10 2 6 -1 -1 -1 -1 -1 7 -1 -1
12
```

##### Sample Output 1:

```
2 10
5 7
```

---

**Starter Code:**

```cpp
/**********************************************************

	Following is the Binary Tree Node class structure

	template <typename T>
	class BinaryTreeNode {
    	public: 
    	T data;
    	BinaryTreeNode<T> *left;
    	BinaryTreeNode<T> *right;

    	BinaryTreeNode(T data) {
        	this->data = data;
        	left = NULL;
        	right = NULL;
    	}
	};
	
***********************************************************/

void printNodesSumToS(BinaryTreeNode<int> *root, int s) {
    // Write your code here
}
```

