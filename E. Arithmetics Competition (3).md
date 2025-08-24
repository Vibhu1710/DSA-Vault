---
solution_file: 
tags: []
type: 
solved: false
platform: CodeForces
date_created: Fri, 22 Aug
---

##### Question Source  
[Link](https://codeforces.com/problemset/problem/2132/E)

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


In the arithmetic competition, participants need to achieve the highest possible sum from the cards they have. In the team "fst\_ezik", Vadim has <<<CF\_MATH\_0>>> cards with numbers <<<CF\_MATH\_1>>>, and Kostya has <<<CF\_MATH\_2>>> cards with numbers <<<CF\_MATH\_3>>>. In each of the <<<CF\_MATH\_4>>> rounds, they want to win, but this time the rules of the competition are slightly different from the usual ones.

In each round, the participants are given three numbers <<<CF\_MATH\_5>>>, <<<CF\_MATH\_6>>>, and <<<CF\_MATH\_7>>>. The team "fst\_ezik" must choose exactly <<<CF\_MATH\_8>>> cards from all the cards they have, but Vadim can choose no more than <<<CF\_MATH\_9>>> cards from his set, and Kostya can choose no more than <<<CF\_MATH\_10>>> cards from his set. Help them find the highest possible sum for each of the <<<CF\_MATH\_11>>> rounds.

Input

Each test consists of several test cases. The first line contains a single integer <<<CF\_MATH\_12>>> <<<CF\_MATH\_13>>> — the number of test cases. The descriptions of the test cases follow.

In the first line of each test case, three integers <<<CF\_MATH\_14>>>, <<<CF\_MATH\_15>>>, <<<CF\_MATH\_16>>> are given <<<CF\_MATH\_17>>> — the number of cards Vadim has, the number of cards Kostya has, and the number of rounds in the competition.

The second line contains <<<CF\_MATH\_18>>> integers <<<CF\_MATH\_19>>> — the numbers on Vadim's cards <<<CF\_MATH\_20>>>.

The third line contains <<<CF\_MATH\_21>>> integers <<<CF\_MATH\_22>>> — the numbers on Kostya's cards <<<CF\_MATH\_23>>>.

The following <<<CF\_MATH\_24>>> lines describe the rounds with three integers <<<CF\_MATH\_25>>>, <<<CF\_MATH\_26>>>, <<<CF\_MATH\_27>>> <<<CF\_MATH\_28>>> — the limit on the number of cards Vadim can choose, the limit on the number of cards Kostya can choose, and the number of cards they need to select together.

It is guaranteed that the sum of <<<CF\_MATH\_29>>> across all test cases does not exceed <<<CF\_MATH\_30>>>, the sum of <<<CF\_MATH\_31>>> across all test cases does not exceed <<<CF\_MATH\_32>>>, and the sum of <<<CF\_MATH\_33>>> across all test cases does not exceed <<<CF\_MATH\_34>>>.

Output

For each test case, output <<<CF\_MATH\_35>>> numbers — the highest possible sum for the corresponding round.

Example

Input
Copy
<<<CF\_PRE\_0>>>

Output
Copy
<<<CF\_PRE\_1>>>
