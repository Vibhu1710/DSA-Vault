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


In the arithmetic competition, participants need to achieve the highest possible sum from the cards they have. In the team "fst\_ezik", Vadim has <nobr>𝑛</nobr><math><mi>n</mi></math> cards with numbers <nobr>𝑎𝑖</nobr><math><msub><mi>a</mi><mi>i</mi></msub></math>, and Kostya has <nobr>𝑚</nobr><math><mi>m</mi></math> cards with numbers <nobr>𝑏𝑖</nobr><math><msub><mi>b</mi><mi>i</mi></msub></math>. In each of the <nobr>𝑞</nobr><math><mi>q</mi></math> rounds, they want to win, but this time the rules of the competition are slightly different from the usual ones.

In each round, the participants are given three numbers <nobr>𝑥𝑖</nobr><math><msub><mi>x</mi><mi>i</mi></msub></math>, <nobr>𝑦𝑖</nobr><math><msub><mi>y</mi><mi>i</mi></msub></math>, and <nobr>𝑧𝑖</nobr><math><msub><mi>z</mi><mi>i</mi></msub></math>. The team "fst\_ezik" must choose exactly <nobr>𝑧𝑖</nobr><math><msub><mi>z</mi><mi>i</mi></msub></math> cards from all the cards they have, but Vadim can choose no more than <nobr>𝑥𝑖</nobr><math><msub><mi>x</mi><mi>i</mi></msub></math> cards from his set, and Kostya can choose no more than <nobr>𝑦𝑖</nobr><math><msub><mi>y</mi><mi>i</mi></msub></math> cards from his set. Help them find the highest possible sum for each of the <nobr>𝑞</nobr><math><mi>q</mi></math> rounds.

Input

Each test consists of several test cases. The first line contains a single integer <nobr>𝑡</nobr><math><mi>t</mi></math> <nobr>(1≤𝑡≤104)</nobr><math><mo>(</mo><mn>1</mn><mo>≤</mo><mi>t</mi><mo>≤</mo><msup><mn>10</mn><mn>4</mn></msup><mo>)</mo></math> — the number of test cases. The descriptions of the test cases follow.

In the first line of each test case, three integers <nobr>𝑛</nobr><math><mi>n</mi></math>, <nobr>𝑚</nobr><math><mi>m</mi></math>, <nobr>𝑞</nobr><math><mi>q</mi></math> are given <nobr>(1≤𝑛,𝑚≤2⋅105,1≤𝑞≤105)</nobr><math><mo>(</mo><mn>1</mn><mo>≤</mo><mi>n</mi><mo>,</mo><mi>m</mi><mo>≤</mo><mn>2</mn><mo>⋅</mo><msup><mn>10</mn><mn>5</mn></msup><mo>,</mo><mn>1</mn><mo>≤</mo><mi>q</mi><mo>≤</mo><msup><mn>10</mn><mn>5</mn></msup><mo>)</mo></math> — the number of cards Vadim has, the number of cards Kostya has, and the number of rounds in the competition.

The second line contains <nobr>𝑛</nobr><math><mi>n</mi></math> integers <nobr>𝑎𝑖</nobr><math><msub><mi>a</mi><mi>i</mi></msub></math> — the numbers on Vadim's cards <nobr>(1≤𝑎𝑖≤109)</nobr><math><mo>(</mo><mn>1</mn><mo>≤</mo><msub><mi>a</mi><mi>i</mi></msub><mo>≤</mo><msup><mn>10</mn><mn>9</mn></msup><mo>)</mo></math>.

The third line contains <nobr>𝑚</nobr><math><mi>m</mi></math> integers <nobr>𝑏𝑖</nobr><math><msub><mi>b</mi><mi>i</mi></msub></math> — the numbers on Kostya's cards <nobr>(1≤𝑏𝑖≤109)</nobr><math><mo>(</mo><mn>1</mn><mo>≤</mo><msub><mi>b</mi><mi>i</mi></msub><mo>≤</mo><msup><mn>10</mn><mn>9</mn></msup><mo>)</mo></math>.

The following <nobr>𝑞</nobr><math><mi>q</mi></math> lines describe the rounds with three integers <nobr>𝑥𝑖</nobr><math><msub><mi>x</mi><mi>i</mi></msub></math>, <nobr>𝑦𝑖</nobr><math><msub><mi>y</mi><mi>i</mi></msub></math>, <nobr>𝑧𝑖</nobr><math><msub><mi>z</mi><mi>i</mi></msub></math> <nobr>(0≤𝑥𝑖≤𝑛,0≤𝑦𝑖≤𝑚,0≤𝑧𝑖≤𝑥𝑖+𝑦𝑖)</nobr><math><mo>(</mo><mn>0</mn><mo>≤</mo><msub><mi>x</mi><mi>i</mi></msub><mo>≤</mo><mi>n</mi><mo>,</mo><mn>0</mn><mo>≤</mo><msub><mi>y</mi><mi>i</mi></msub><mo>≤</mo><mi>m</mi><mo>,</mo><mn>0</mn><mo>≤</mo><msub><mi>z</mi><mi>i</mi></msub><mo>≤</mo><msub><mi>x</mi><mi>i</mi></msub><mo>+</mo><msub><mi>y</mi><mi>i</mi></msub><mo>)</mo></math> — the limit on the number of cards Vadim can choose, the limit on the number of cards Kostya can choose, and the number of cards they need to select together.

It is guaranteed that the sum of <nobr>𝑛</nobr><math><mi>n</mi></math> across all test cases does not exceed <nobr>2⋅105</nobr><math><mn>2</mn><mo>⋅</mo><msup><mn>10</mn><mn>5</mn></msup></math>, the sum of <nobr>𝑚</nobr><math><mi>m</mi></math> across all test cases does not exceed <nobr>2⋅105</nobr><math><mn>2</mn><mo>⋅</mo><msup><mn>10</mn><mn>5</mn></msup></math>, and the sum of <nobr>𝑞</nobr><math><mi>q</mi></math> across all test cases does not exceed <nobr>105</nobr><math><msup><mn>10</mn><mn>5</mn></msup></math>.

Output

For each test case, output <nobr>𝑞</nobr><math><mi>q</mi></math> numbers — the highest possible sum for the corresponding round.

Example

Input
Copy

```
43 4 510 20 301 2 3 40 0 03 4 73 4 41 4 42 2 45 5 2500000000 300000000 100000000 900000000 700000000800000000 400000000 1000000000 600000000 2000000001 4 35 2 64 4 1100 100 20 20100 100 20 204 4 53 3 62 363 711286 121 1021 1 13 1 11 2 01 3 20 1 03 3 3
```

Output
Copy

```
0
70
64
39
57
2700000000
4200000000
420
711
711
0
997
0
1360
```
