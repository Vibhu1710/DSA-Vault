---
solution_file: numberTheory/kDivisibleSum.cpp
tags:
  - NumberTheory
type:
solved: true
platform: CodeForces
date_created: Wed, 29 Oct
---

##### Question Source  
[Link](https://codeforces.com/problemset/problem/1476/A)

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


You are given two integers \_\_CF\_MATH\_0\_\_ and \_\_CF\_MATH\_1\_\_.

You should create an array of \_\_CF\_MATH\_2\_\_ positive integers \_\_CF\_MATH\_3\_\_ such that the sum \_\_CF\_MATH\_4\_\_ is divisible by \_\_CF\_MATH\_5\_\_ and maximum element in \_\_CF\_MATH\_6\_\_ is minimum possible.

What is the minimum possible maximum element in \_\_CF\_MATH\_7\_\_?

Input

The first line contains a single integer \_\_CF\_MATH\_8\_\_ (\_\_CF\_MATH\_9\_\_) — the number of test cases.

The first and only line of each test case contains two integers \_\_CF\_MATH\_10\_\_ and \_\_CF\_MATH\_11\_\_ (\_\_CF\_MATH\_12\_\_; \_\_CF\_MATH\_13\_\_).

Output

For each test case, print one integer — the minimum possible maximum element in array \_\_CF\_MATH\_14\_\_ such that the sum \_\_CF\_MATH\_15\_\_ is divisible by \_\_CF\_MATH\_16\_\_.

Example

\_\_CF\_INPUT\_0\_\_
Output
Copy

```
5
2
1
3
```

Note

In the first test case \_\_CF\_MATH\_17\_\_, so the array consists of one element \_\_CF\_MATH\_18\_\_ and if we make \_\_CF\_MATH\_19\_\_ it will be divisible by \_\_CF\_MATH\_20\_\_ and the minimum possible.

In the second test case, we can create array \_\_CF\_MATH\_21\_\_. The sum is divisible by \_\_CF\_MATH\_22\_\_ and the maximum is equal to \_\_CF\_MATH\_23\_\_.

In the third test case, we can create array \_\_CF\_MATH\_24\_\_. The sum is divisible by \_\_CF\_MATH\_25\_\_ and the maximum is equal to \_\_CF\_MATH\_26\_\_.
