---
solution_file: trees/bst/checkBST.cpp
tags:
  - BST
type: CBQ
solved: true
platform: CodingNinjas
date_created: Wed, 20 Aug
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250067/offering/3394251/problem/861?leftPanelTabValue=PROBLEM)

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

Given a binary tree with N number of nodes, check if that input tree is BST (Binary Search Tree). If yes, return true, return false otherwise.
**Note:**

```
Duplicate elements should be kept in the right subtree.
```

Detailed explanation ( Input/output format, Notes, Images )

**Input format :**

```
The first line of input contains data of the nodes of the tree in level order form. The data of the nodes of the tree is separated by space. If any node does not have a left or right child, take -1 in its place. Since -1 is used as an indication whether the left or right nodes exist, therefore, it will not be a part of the data of any node.
```
**Output format :**

```
The first and only line of output contains either true or false.
```

**Constraints :**

```
0 <= Number of edges <= 10^5
Time Limit: 1 second
```

##### Sample Input 1 :

```
3 1 5 -1 2 -1 -1 -1 -1
```

![](https://ninjasfiles.s3.amazonaws.com/asset_0000000000004004_1719998930_Most%20Awesome%20Deck.png)

##### Sample Output 1 :

```
true
```

##### Sample Input 2 :

```
5 2 10 0 1 -1 15 -1 -1 -1 -1 -1 -1
```

![](https://ninjasfiles.s3.amazonaws.com/asset_0000000000002091_1696927324_check_BST_sample_input2.png)

##### Sample Output 2 :

```
false
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

bool isBinarySearchTree(BinaryTreeNode<int> *root, int minRange, int maxRange) {
 return False;
}
```

