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


Define the <nobr>MEX</nobr><math><mrow><mi>M</mi><mi>E</mi><mi>X</mi></mrow></math> (minimum excluded value) of an array to be the smallest nonnegative integer not present in the array. For example,

* <nobr>MEX(\[2,2,1\])\=0</nobr><math><mrow><mi>M</mi><mi>E</mi><mi>X</mi></mrow><mo>(</mo><mo>\[</mo><mn>2</mn><mo>,</mo><mn>2</mn><mo>,</mo><mn>1</mn><mo>\]</mo><mo>)</mo><mo>\=</mo><mn>0</mn></math> because <nobr>0</nobr><math><mn>0</mn></math> is not in the array.
* <nobr>MEX(\[3,1,0,1\])\=2</nobr><math><mrow><mi>M</mi><mi>E</mi><mi>X</mi></mrow><mo>(</mo><mo>\[</mo><mn>3</mn><mo>,</mo><mn>1</mn><mo>,</mo><mn>0</mn><mo>,</mo><mn>1</mn><mo>\]</mo><mo>)</mo><mo>\=</mo><mn>2</mn></math> because <nobr>0</nobr><math><mn>0</mn></math> and <nobr>1</nobr><math><mn>1</mn></math> are in the array but <nobr>2</nobr><math><mn>2</mn></math> is not.
* <nobr>MEX(\[0,3,1,2\])\=4</nobr><math><mrow><mi>M</mi><mi>E</mi><mi>X</mi></mrow><mo>(</mo><mo>\[</mo><mn>0</mn><mo>,</mo><mn>3</mn><mo>,</mo><mn>1</mn><mo>,</mo><mn>2</mn><mo>\]</mo><mo>)</mo><mo>\=</mo><mn>4</mn></math> because <nobr>0</nobr><math><mn>0</mn></math>, <nobr>1</nobr><math><mn>1</mn></math>, <nobr>2</nobr><math><mn>2</mn></math>, and <nobr>3</nobr><math><mn>3</mn></math> are in the array but <nobr>4</nobr><math><mn>4</mn></math> is not.

You are given an array <nobr>𝑎</nobr><math><mi>a</mi></math> of size <nobr>𝑛</nobr><math><mi>n</mi></math> of nonnegative integers.

For all <nobr>𝑘</nobr><math><mi>k</mi></math> (<nobr>0≤𝑘≤𝑛</nobr><math><mn>0</mn><mo>≤</mo><mi>k</mi><mo>≤</mo><mi>n</mi></math>), count the number of possible values of <nobr>MEX(𝑎)</nobr><math><mrow><mi>M</mi><mi>E</mi><mi>X</mi></mrow><mo>(</mo><mi>a</mi><mo>)</mo></math> after removing exactly <nobr>𝑘</nobr><math><mi>k</mi></math> values from <nobr>𝑎</nobr><math><mi>a</mi></math>.

Input

The first line contains an integer <nobr>𝑡</nobr><math><mi>t</mi></math> (<nobr>1≤𝑡≤104</nobr><math><mn>1</mn><mo>≤</mo><mi>t</mi><mo>≤</mo><msup><mn>10</mn><mn>4</mn></msup></math>) — the number of test cases.

The first line of each test case contains one integer <nobr>𝑛</nobr><math><mi>n</mi></math> (<nobr>1≤𝑛≤2⋅105</nobr><math><mn>1</mn><mo>≤</mo><mi>n</mi><mo>≤</mo><mn>2</mn><mo>⋅</mo><msup><mn>10</mn><mn>5</mn></msup></math>) — the size of the array <nobr>𝑎</nobr><math><mi>a</mi></math>.

The second line of each test case contains <nobr>𝑛</nobr><math><mi>n</mi></math> integers, <nobr>𝑎1,𝑎2,…,𝑎𝑛</nobr><math><msub><mi>a</mi><mn>1</mn></msub><mo>,</mo><msub><mi>a</mi><mn>2</mn></msub><mo>,</mo><mo>…</mo><mo>,</mo><msub><mi>a</mi><mi>n</mi></msub></math> (<nobr>0≤𝑎𝑖≤𝑛</nobr><math><mn>0</mn><mo>≤</mo><msub><mi>a</mi><mi>i</mi></msub><mo>≤</mo><mi>n</mi></math>).

It is guaranteed that the sum of <nobr>𝑛</nobr><math><mi>n</mi></math> over all test cases does not exceed <nobr>2⋅105</nobr><math><mn>2</mn><mo>⋅</mo><msup><mn>10</mn><mn>5</mn></msup></math>.

Output

For each test case, output a single line containing <nobr>𝑛+1</nobr><math><mi>n</mi><mo>+</mo><mn>1</mn></math> integers — the number of possible values of <nobr>MEX(𝑎)</nobr><math><mrow><mi>M</mi><mi>E</mi><mi>X</mi></mrow><mo>(</mo><mi>a</mi><mo>)</mo></math> after removing exactly <nobr>𝑘</nobr><math><mi>k</mi></math> values, for <nobr>𝑘\=0,1,…,𝑛</nobr><math><mi>k</mi><mo>\=</mo><mn>0</mn><mo>,</mo><mn>1</mn><mo>,</mo><mo>…</mo><mo>,</mo><mi>n</mi></math>.

Example

<<<CF\_INPUT\_0>>>

```
551 0 0 1 263 2 0 4 5 161 2 0 1 3 240 3 4 150 0 0 0 0
```

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

In the first sample, consider <nobr>𝑘\=1</nobr><math><mi>k</mi><mo>\=</mo><mn>1</mn></math>. If you remove a <nobr>0</nobr><math><mn>0</mn></math>, then you get the following array:

|||||
|---|---|---|---|
|1|0|1|2|
So we get <nobr>MEX(𝑎)\=3</nobr><math><mrow><mi>M</mi><mi>E</mi><mi>X</mi></mrow><mo>(</mo><mi>a</mi><mo>)</mo><mo>\=</mo><mn>3</mn></math>. Alternatively, if you remove the <nobr>2</nobr><math><mn>2</mn></math>, then you get the following array:
|||||
|---|---|---|---|
|1|0|0|1|
So we get <nobr>MEX(𝑎)\=2</nobr><math><mrow><mi>M</mi><mi>E</mi><mi>X</mi></mrow><mo>(</mo><mi>a</mi><mo>)</mo><mo>\=</mo><mn>2</mn></math>. It can be shown that these are the only possible values of <nobr>MEX(𝑎)</nobr><math><mrow><mi>M</mi><mi>E</mi><mi>X</mi></mrow><mo>(</mo><mi>a</mi><mo>)</mo></math> after removing exactly one value. So the output for <nobr>𝑘\=1</nobr><math><mi>k</mi><mo>\=</mo><mn>1</mn></math> is <nobr>2</nobr><math><mn>2</mn></math>.
