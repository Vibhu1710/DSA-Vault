---
solution_file: trees/binaryTree/createBinaryTreeLevelOrder.cpp
tags: [BinaryTree]
type: 
solved: true
platform: 
date_created: Mon, 18 Aug
---

##### Question Source (Not Real)
Inspired from -
[Link](https://classroom.codingninjas.com/app/classroom/me/13774/content/250061/offering/3394163/problem/1568)

---

##### Solved Example  
```dataviewjs
const linkPrefix = "vscode://file/Users/vibhubhanot/Documents/DSA/";
let path = dv.current()?.file?.path;
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


#### Problem Statement

Given an level-order array, create a Binary Tree from it

**Input:**
[2, 3, 8, -1, 5, 9, -1, -1, -1, -1, 10]

**Output:**

you know (a tree root node pointer)


---


> [!NOTE] After Thoughts
> - This turned out to be a more implementation based problem
> - Implemented BT class
> - The main logic's trickiest part was the looping condn.
> - Also, found out there is no clear() func. in a queue/stack!


