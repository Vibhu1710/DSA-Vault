---
solution_file: 
tags: []
type: 
solved: false
platform: CodeForces
date_created: Sun, 24 Aug
---

##### Question Source  
[Link](https://codeforces.com/problemset/problem/2123/E)

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


Define the \_\_CF\_MATH\_0\_\_ (minimum excluded value) of an array to be the smallest nonnegative integer not present in the array. For example,

* \_\_CF\_MATH\_1\_\_ because \_\_CF\_MATH\_2\_\_ is not in the array.
* \_\_CF\_MATH\_3\_\_ because \_\_CF\_MATH\_4\_\_ and \_\_CF\_MATH\_5\_\_ are in the array but \_\_CF\_MATH\_6\_\_ is not.
* \_\_CF\_MATH\_7\_\_ because \_\_CF\_MATH\_8\_\_, \_\_CF\_MATH\_9\_\_, \_\_CF\_MATH\_10\_\_, and \_\_CF\_MATH\_11\_\_ are in the array but \_\_CF\_MATH\_12\_\_ is not.

You are given an array \_\_CF\_MATH\_13\_\_ of size \_\_CF\_MATH\_14\_\_ of nonnegative integers.

For all \_\_CF\_MATH\_15\_\_ (\_\_CF\_MATH\_16\_\_), count the number of possible values of \_\_CF\_MATH\_17\_\_ after removing exactly \_\_CF\_MATH\_18\_\_ values from \_\_CF\_MATH\_19\_\_.

Input

The first line contains an integer \_\_CF\_MATH\_20\_\_ (\_\_CF\_MATH\_21\_\_) — the number of test cases.

The first line of each test case contains one integer \_\_CF\_MATH\_22\_\_ (\_\_CF\_MATH\_23\_\_) — the size of the array \_\_CF\_MATH\_24\_\_.

The second line of each test case contains \_\_CF\_MATH\_25\_\_ integers, \_\_CF\_MATH\_26\_\_ (\_\_CF\_MATH\_27\_\_).

It is guaranteed that the sum of \_\_CF\_MATH\_28\_\_ over all test cases does not exceed \_\_CF\_MATH\_29\_\_.

Output

For each test case, output a single line containing \_\_CF\_MATH\_30\_\_ integers — the number of possible values of \_\_CF\_MATH\_31\_\_ after removing exactly \_\_CF\_MATH\_32\_\_ values, for \_\_CF\_MATH\_33\_\_.

Example

\_\_CF\_INPUT\_0\_\_
Output
Copy

```
1 2 4 3 2 1
1 6 5 4 3 2 1
1 3 5 4 3 2 1
1 3 3 2 1
1 1 1 1 1 1
```

Note

In the first sample, consider \_\_CF\_MATH\_34\_\_. If you remove a \_\_CF\_MATH\_35\_\_, then you get the following array:

|||||
|---|---|---|---|
|1|0|1|2|
So we get \_\_CF\_MATH\_36\_\_. Alternatively, if you remove the \_\_CF\_MATH\_37\_\_, then you get the following array:
|||||
|---|---|---|---|
|1|0|0|1|
So we get \_\_CF\_MATH\_38\_\_. It can be shown that these are the only possible values of \_\_CF\_MATH\_39\_\_ after removing exactly one value. So the output for \_\_CF\_MATH\_40\_\_ is \_\_CF\_MATH\_41\_\_.
