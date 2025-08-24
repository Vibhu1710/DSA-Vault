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


In the arithmetic competition, participants need to achieve the highest possible sum from the cards they have. In the team "fst\_ezik", Vadim has <math><mi>n</mi></math> cards with numbers <math><msub><mi>a</mi><mi>i</mi></msub></math>, and Kostya has <math><mi>m</mi></math> cards with numbers <math><msub><mi>b</mi><mi>i</mi></msub></math>. In each of the <math><mi>q</mi></math> rounds, they want to win, but this time the rules of the competition are slightly different from the usual ones.

In each round, the participants are given three numbers <math><msub><mi>x</mi><mi>i</mi></msub></math>, <math><msub><mi>y</mi><mi>i</mi></msub></math>, and <math><msub><mi>z</mi><mi>i</mi></msub></math>. The team "fst\_ezik" must choose exactly <math><msub><mi>z</mi><mi>i</mi></msub></math> cards from all the cards they have, but Vadim can choose no more than <math><msub><mi>x</mi><mi>i</mi></msub></math> cards from his set, and Kostya can choose no more than <math><msub><mi>y</mi><mi>i</mi></msub></math> cards from his set. Help them find the highest possible sum for each of the <math><mi>q</mi></math> rounds.

Input

Each test consists of several test cases. The first line contains a single integer <math><mi>t</mi></math> <math><mo>(</mo><mn>1</mn><mo>≤</mo><mi>t</mi><mo>≤</mo><msup><mn>10</mn><mn>4</mn></msup><mo>)</mo></math> — the number of test cases. The descriptions of the test cases follow.

In the first line of each test case, three integers <math><mi>n</mi></math>, <math><mi>m</mi></math>, <math><mi>q</mi></math> are given <math><mo>(</mo><mn>1</mn><mo>≤</mo><mi>n</mi><mo>,</mo><mi>m</mi><mo>≤</mo><mn>2</mn><mo>⋅</mo><msup><mn>10</mn><mn>5</mn></msup><mo>,</mo><mn>1</mn><mo>≤</mo><mi>q</mi><mo>≤</mo><msup><mn>10</mn><mn>5</mn></msup><mo>)</mo></math> — the number of cards Vadim has, the number of cards Kostya has, and the number of rounds in the competition.

The second line contains <math><mi>n</mi></math> integers <math><msub><mi>a</mi><mi>i</mi></msub></math> — the numbers on Vadim's cards <math><mo>(</mo><mn>1</mn><mo>≤</mo><msub><mi>a</mi><mi>i</mi></msub><mo>≤</mo><msup><mn>10</mn><mn>9</mn></msup><mo>)</mo></math>.

The third line contains <math><mi>m</mi></math> integers <math><msub><mi>b</mi><mi>i</mi></msub></math> — the numbers on Kostya's cards <math><mo>(</mo><mn>1</mn><mo>≤</mo><msub><mi>b</mi><mi>i</mi></msub><mo>≤</mo><msup><mn>10</mn><mn>9</mn></msup><mo>)</mo></math>.

The following <math><mi>q</mi></math> lines describe the rounds with three integers <math><msub><mi>x</mi><mi>i</mi></msub></math>, <math><msub><mi>y</mi><mi>i</mi></msub></math>, <math><msub><mi>z</mi><mi>i</mi></msub></math> <math><mo>(</mo><mn>0</mn><mo>≤</mo><msub><mi>x</mi><mi>i</mi></msub><mo>≤</mo><mi>n</mi><mo>,</mo><mn>0</mn><mo>≤</mo><msub><mi>y</mi><mi>i</mi></msub><mo>≤</mo><mi>m</mi><mo>,</mo><mn>0</mn><mo>≤</mo><msub><mi>z</mi><mi>i</mi></msub><mo>≤</mo><msub><mi>x</mi><mi>i</mi></msub><mo>+</mo><msub><mi>y</mi><mi>i</mi></msub><mo>)</mo></math> — the limit on the number of cards Vadim can choose, the limit on the number of cards Kostya can choose, and the number of cards they need to select together.

It is guaranteed that the sum of <math><mi>n</mi></math> across all test cases does not exceed <math><mn>2</mn><mo>⋅</mo><msup><mn>10</mn><mn>5</mn></msup></math>, the sum of <math><mi>m</mi></math> across all test cases does not exceed <math><mn>2</mn><mo>⋅</mo><msup><mn>10</mn><mn>5</mn></msup></math>, and the sum of <math><mi>q</mi></math> across all test cases does not exceed <math><msup><mn>10</mn><mn>5</mn></msup></math>.

Output

For each test case, output <math><mi>q</mi></math> numbers — the highest possible sum for the corresponding round.

Example

Input
Copy
<<<CF\_PRE\_BLOCK\_0>>>

Output
Copy
<<<CF\_PRE\_BLOCK\_1>>>
