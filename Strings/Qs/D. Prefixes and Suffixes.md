---
solution_file:
tags:
  - Strings
type:
solved: false
platform: CodeForces
date_created: Mon, 17 Nov
---

##### Question Source  
[Link](https://codeforces.com/contest/432/problem/D)

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


You have a string *s* = *s*<sub>1</sub>*s*<sub>2</sub>...*s*<sub>|*s*|</sub>, where |*s*| is the length of string *s*, and *s*<sub>*i*</sub> its *i*\-th character.

Let's introduce several definitions:

* A substring *s*\[*i*..*j*\] (1 ≤ *i* ≤ *j* ≤ |*s*|) of string *s* is string *s*<sub>*i*</sub>*s*<sub>*i* + 1</sub>...*s*<sub>*j*</sub>.
* The prefix of string *s* of length *l* (1 ≤ *l* ≤ |*s*|) is string *s*\[1..*l*\].
* The suffix of string *s* of length *l* (1 ≤ *l* ≤ |*s*|) is string *s*\[|*s*| - *l* + 1..|*s*|\].

Your task is, for any prefix of string *s* which matches a suffix of string *s*, print the number of times it occurs in string *s* as a substring.

Input

The single line contains a sequence of characters *s*<sub>1</sub>*s*<sub>2</sub>...*s*<sub>|*s*|</sub> (1 ≤ |*s*| ≤ 10<sup>5</sup>) — string *s*. The string only consists of uppercase English letters.

Output

In the first line, print integer *k* (0 ≤ *k* ≤ |*s*|) — the number of prefixes that match a suffix of string *s*. Next print *k* lines, in each line print two integers *l*<sub>*i*</sub> *c*<sub>*i*</sub>. Numbers *l*<sub>*i*</sub> *c*<sub>*i*</sub> mean that the prefix of the length *l*<sub>*i*</sub> matches the suffix of length *l*<sub>*i*</sub> and occurs in string *s* as a substring *c*<sub>*i*</sub> times. Print pairs *l*<sub>*i*</sub> *c*<sub>*i*</sub> in the order of increasing *l*<sub>*i*</sub>.

Examples

\_\_CF\_INPUT\_0\_\_
Output
Copy

```
31 43 27 1
```
\_\_CF\_INPUT\_1\_\_
Output
Copy

```
31 32 23 1
```
