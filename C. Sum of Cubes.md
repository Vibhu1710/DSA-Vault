---
solution_file: 
tags: []
type: 
solved: false
platform: CodeForces
date_created: Thu, 30 Oct
---

##### Question Source  
[Link](https://codeforces.com/problemset/problem/1490/C)

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


You are given a positive integer \_\_CF\_MATH\_0\_\_. Check whether the number \_\_CF\_MATH\_1\_\_ is representable as the sum of the cubes of two positive integers.

Formally, you need to check if there are two integers \_\_CF\_MATH\_2\_\_ and \_\_CF\_MATH\_3\_\_ (\_\_CF\_MATH\_4\_\_) such that \_\_CF\_MATH\_5\_\_.

For example, if \_\_CF\_MATH\_6\_\_, then the numbers \_\_CF\_MATH\_7\_\_ and \_\_CF\_MATH\_8\_\_ are suitable (\_\_CF\_MATH\_9\_\_). If \_\_CF\_MATH\_10\_\_, then no pair of numbers \_\_CF\_MATH\_11\_\_ and \_\_CF\_MATH\_12\_\_ is suitable.

Input

The first line contains one integer \_\_CF\_MATH\_13\_\_ (\_\_CF\_MATH\_14\_\_) — the number of test cases. Then \_\_CF\_MATH\_15\_\_ test cases follow.

Each test case contains one integer \_\_CF\_MATH\_16\_\_ (\_\_CF\_MATH\_17\_\_).

Please note, that the input for some test cases won't fit into \_\_CF\_MATH\_18\_\_\-bit integer type, so you should use at least \_\_CF\_MATH\_19\_\_\-bit integer type in your programming language.

Output

For each test case, output on a separate line:

* "YES" if \_\_CF\_MATH\_20\_\_ is representable as the sum of the cubes of two positive integers.
* "NO" otherwise.

You can output "YES" and "NO" in any case (for example, the strings yEs, yes, Yes and YES will be recognized as positive).

Example

\_\_CF\_INPUT\_0\_\_
Output
Copy

```
NO
YES
NO
NO
YES
YES
YES
```

Note

The number \_\_CF\_MATH\_21\_\_ is not representable as the sum of two cubes.

The number \_\_CF\_MATH\_22\_\_ is represented as \_\_CF\_MATH\_23\_\_.

The number \_\_CF\_MATH\_24\_\_ is not representable as the sum of two cubes.

The number \_\_CF\_MATH\_25\_\_ is not representable as the sum of two cubes.

The number \_\_CF\_MATH\_26\_\_ is represented as \_\_CF\_MATH\_27\_\_.

The number \_\_CF\_MATH\_28\_\_ is represented as \_\_CF\_MATH\_29\_\_.

The number \_\_CF\_MATH\_30\_\_ is represented as \_\_CF\_MATH\_31\_\_.
