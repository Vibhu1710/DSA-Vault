---
solution_file:
tags:
  - BitManipulation
type:
solved: false
platform: CodeForces
date_created: Thu, 23 Oct
---

##### Question Source  
[Link](https://codeforces.com/contest/2162/problem/C)

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


You are given two integers \_\_CF\_MATH\_0\_\_ and \_\_CF\_MATH\_1\_\_. You are allowed to perform the following operation any number of times (including zero):

* choose any integer \_\_CF\_MATH\_2\_\_ such that \_\_CF\_MATH\_3\_\_ (the current value of \_\_CF\_MATH\_4\_\_, not initial),
* set \_\_CF\_MATH\_5\_\_. Here, \_\_CF\_MATH\_6\_\_ represents the [bitwise XOR](https://en.wikipedia.org/wiki/Bitwise_operation#XOR) operator.

After performing a sequence of operations, you want the value of \_\_CF\_MATH\_7\_\_ to become exactly \_\_CF\_MATH\_8\_\_.

Find a sequence of at most \_\_CF\_MATH\_9\_\_ operations (values of \_\_CF\_MATH\_10\_\_ used in each operation) that transforms \_\_CF\_MATH\_11\_\_ into \_\_CF\_MATH\_12\_\_, or report that it is impossible.

Note that you are not required to find the minimum number of operations, but any valid sequence of at most \_\_CF\_MATH\_13\_\_ operations.

Input

The first line of input contains a single integer \_\_CF\_MATH\_14\_\_ (\_\_CF\_MATH\_15\_\_) — the number of test cases.

Each test case contains two integers \_\_CF\_MATH\_16\_\_ and \_\_CF\_MATH\_17\_\_ (\_\_CF\_MATH\_18\_\_).

Output

For each test case, if it is impossible to obtain \_\_CF\_MATH\_19\_\_ from \_\_CF\_MATH\_20\_\_ using the allowed operations, print a single line containing \_\_CF\_MATH\_21\_\_.

Otherwise, on the first line print a single integer \_\_CF\_MATH\_22\_\_ (\_\_CF\_MATH\_23\_\_) — the number of operations. On the second line print \_\_CF\_MATH\_24\_\_ integers (\_\_CF\_MATH\_25\_\_) — the chosen values of \_\_CF\_MATH\_26\_\_ in the order you apply them.

If there are multiple valid sequences, you may print any one of them.

Example

\_\_CF\_INPUT\_0\_\_
Output
Copy

```
27 80-115225 779-1
```

Note

For the first test case,

* choose \_\_CF\_MATH\_27\_\_, now \_\_CF\_MATH\_28\_\_ becomes equal to \_\_CF\_MATH\_29\_\_.
* choose \_\_CF\_MATH\_30\_\_, now \_\_CF\_MATH\_31\_\_ becomes equal to \_\_CF\_MATH\_32\_\_.
Thus, we can make \_\_CF\_MATH\_33\_\_.

For the fourth test case, choosing \_\_CF\_MATH\_34\_\_ makes \_\_CF\_MATH\_35\_\_.
