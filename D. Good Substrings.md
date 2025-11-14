---
solution_file: 
tags: []
type: 
solved: false
platform: CodeForces
date_created: Fri, 14 Nov
---

##### Question Source  
[Link](https://codeforces.com/problemset/problem/271/D)

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


You've got string *s*, consisting of small English letters. Some of the English letters are good, the rest are bad.

A substring *s*\[*l*...*r*\] (1 ≤ *l* ≤ *r* ≤ |*s*|) of string *s* = *s*<sub>1</sub>*s*<sub>2</sub>...*s*<sub>|*s*|</sub> (where |*s*| is the length of string *s*) is string *s*<sub>*l*</sub>*s*<sub>*l* + 1</sub>...*s*<sub>*r*</sub>.

The substring *s*\[*l*...*r*\] is good, if among the letters *s*<sub>*l*</sub>, *s*<sub>*l* + 1</sub>, ..., *s*<sub>*r*</sub> there are at most *k* bad ones (look at the sample's explanation to understand it more clear).

Your task is to find the number of distinct good substrings of the given string *s*. Two substrings *s*\[*x*...*y*\] and *s*\[*p*...*q*\] are considered distinct if their content is different, i.e. *s*\[*x*...*y*\] ≠ *s*\[*p*...*q*\].

Input

The first line of the input is the non-empty string *s*, consisting of small English letters, the string's length is at most 1500 characters.

The second line of the input is the string of characters "0" and "1", the length is exactly 26 characters. If the *i*\-th character of this string equals "1", then the *i*\-th English letter is good, otherwise it's bad. That is, the first character of this string corresponds to letter "a", the second one corresponds to letter "b" and so on.

The third line of the input consists a single integer *k* (0 ≤ *k* ≤ |*s*|) — the maximum acceptable number of bad characters in a good substring.

Output

Print a single integer — the number of distinct good substrings of string *s*.

Examples

\_\_CF\_INPUT\_0\_\_
Output
Copy

```
5
```
\_\_CF\_INPUT\_1\_\_
Output
Copy

```
8
```

Note

In the first example there are following good substrings: "a", "ab", "b", "ba", "bab".

In the second example there are following good substrings: "a", "aa", "ac", "b", "ba", "c", "ca", "cb".
