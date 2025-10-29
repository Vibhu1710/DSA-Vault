---
solution_file:
tags:
  - BinarySearch
type:
solved: false
platform: CodeForces
date_created: Wed, 29 Oct
---

##### Question Source  
[Link](https://codeforces.com/problemset/problem/1593/C)

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


There are one cat, \_\_CF\_MATH\_0\_\_ mice, and one hole on a coordinate line. The cat is located at the point \_\_CF\_MATH\_1\_\_, the hole is located at the point \_\_CF\_MATH\_2\_\_. All mice are located between the cat and the hole: the \_\_CF\_MATH\_3\_\_\-th mouse is located at the point \_\_CF\_MATH\_4\_\_ (\_\_CF\_MATH\_5\_\_). At each point, many mice can be located.

In one second, the following happens. First, exactly one mouse moves to the right by \_\_CF\_MATH\_6\_\_. If the mouse reaches the hole, it hides (i.e. the mouse will not any more move to any point and will not be eaten by the cat). Then (after that the mouse has finished its move) the cat moves to the right by \_\_CF\_MATH\_7\_\_. If at the new cat's position, some mice are located, the cat eats them (they will not be able to move after that). The actions are performed until any mouse hasn't been hidden or isn't eaten.

In other words, the first move is made by a mouse. If the mouse has reached the hole, it's saved. Then the cat makes a move. The cat eats the mice located at the pointed the cat has reached (if the cat has reached the hole, it eats nobody).

Each second, you can select a mouse that will make a move. What is the maximum number of mice that can reach the hole without being eaten?

Input

The first line contains one integer \_\_CF\_MATH\_8\_\_ (\_\_CF\_MATH\_9\_\_) — the number of test cases. Then \_\_CF\_MATH\_10\_\_ test cases follow.

Each test case consists of two lines. The first line contains two integers \_\_CF\_MATH\_11\_\_ and \_\_CF\_MATH\_12\_\_ (\_\_CF\_MATH\_13\_\_, \_\_CF\_MATH\_14\_\_). The second line contains \_\_CF\_MATH\_15\_\_ integers \_\_CF\_MATH\_16\_\_ (\_\_CF\_MATH\_17\_\_) — the initial coordinates of the mice.

It is guaranteed that the sum of all \_\_CF\_MATH\_18\_\_ given in the input doesn't exceed \_\_CF\_MATH\_19\_\_.

Output

For each test case output on a separate line an integer \_\_CF\_MATH\_20\_\_ (\_\_CF\_MATH\_21\_\_) — the maximum number of mice that can reach the hole without being eaten.

Example

\_\_CF\_INPUT\_0\_\_
Output
Copy

```
3
1
4
```




> [!NOTE] After Thoughts
> - Highly intuitive but interesting que
> - BS on prefixSum basically
