---
solution_file: 
tags: []
type: 
solved: false
platform: CodeForces
date_created: Fri, 07 Nov
---

##### Question Source  
[Link](https://codeforces.com/contest/2162/problem/E)

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


We call an array \_\_CF\_MATH\_0\_\_ of length \_\_CF\_MATH\_1\_\_ palindromic if the following condition holds:

* \_\_CF\_MATH\_2\_\_ for all \_\_CF\_MATH\_3\_\_

In other words, an array is palindromic if it reads the same forward and backward.

You are given an array \_\_CF\_MATH\_4\_\_ of \_\_CF\_MATH\_5\_\_ integers where \_\_CF\_MATH\_6\_\_ and an integer \_\_CF\_MATH\_7\_\_.

You are required to perform the following operation exactly \_\_CF\_MATH\_8\_\_ times:

* choose an integer \_\_CF\_MATH\_9\_\_ such that \_\_CF\_MATH\_10\_\_,
* append \_\_CF\_MATH\_11\_\_ to the end of the array \_\_CF\_MATH\_12\_\_.

Your goal is to perform these \_\_CF\_MATH\_13\_\_ operations in such a way that the number of palindromic subarrays\_\_CF\_MATH\_14\_\_ in the resulting array is minimized.

Output the \_\_CF\_MATH\_15\_\_ integers you chose for each operation, in the order they were appended.

\_\_CF\_MATH\_16\_\_An array \_\_CF\_MATH\_17\_\_ is a subarray of an array \_\_CF\_MATH\_18\_\_ if \_\_CF\_MATH\_19\_\_ can be obtained from \_\_CF\_MATH\_20\_\_ by deletion of several (possibly, zero or all) elements from the beginning and several (possibly, zero or all) elements from the end. In particular, an array is a subarray of itself.

Input

The first line of input contains a single integer \_\_CF\_MATH\_21\_\_ (\_\_CF\_MATH\_22\_\_) — the number of test cases.

The first line of each test case contains two integers \_\_CF\_MATH\_23\_\_ and \_\_CF\_MATH\_24\_\_ (\_\_CF\_MATH\_25\_\_) — the length of the array \_\_CF\_MATH\_26\_\_.

The second line of each test case contains \_\_CF\_MATH\_27\_\_ integers \_\_CF\_MATH\_28\_\_ (\_\_CF\_MATH\_29\_\_) — the elements of the array \_\_CF\_MATH\_30\_\_.

It is guaranteed that the sum of \_\_CF\_MATH\_31\_\_ over all the test cases does not exceed \_\_CF\_MATH\_32\_\_.

Output

For each test case, print the \_\_CF\_MATH\_33\_\_ integers chosen for the append operations, in the order they were appended, such that the total number of palindromic subarrays in the resulting array is minimized.

If there are multiple answers, you may output any one of them.

Example

\_\_CF\_INPUT\_0\_\_
Output
Copy

```
2 1 3 3 3 4 14 1 5
```

Note

For the first test case, if we append \_\_CF\_MATH\_34\_\_ to the end of the array, \_\_CF\_MATH\_35\_\_ becomes \_\_CF\_MATH\_36\_\_. Now \_\_CF\_MATH\_37\_\_ has only \_\_CF\_MATH\_38\_\_ palindromic subarrays — \_\_CF\_MATH\_39\_\_, \_\_CF\_MATH\_40\_\_, \_\_CF\_MATH\_41\_\_, \_\_CF\_MATH\_42\_\_, \_\_CF\_MATH\_43\_\_, \_\_CF\_MATH\_44\_\_.
