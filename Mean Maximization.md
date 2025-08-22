---
solution_file: 
tags: []
type: 
solved: false
platform: CodeChef
date_created: Fri, 22 Aug
---

##### Question Source  
[Link](https://www.codechef.com/COOK137C/problems/MEANMAX)

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


JJ loves playing with averages. He has an array <math><semantics><mrow><mi>A</mi></mrow><annotation>A</annotation></semantics></math>A of length <math><semantics><mrow><mi>N</mi></mrow><annotation>N</annotation></semantics></math>N. He wants to divide the array <math><semantics><mrow><mi>A</mi></mrow><annotation>A</annotation></semantics></math>A into two **non-empty** subsets <math><semantics><mrow><mi>P</mi></mrow><annotation>P</annotation></semantics></math>P and <math><semantics><mrow><mi>Q</mi></mrow><annotation>Q</annotation></semantics></math>Q such that the value of <math><semantics><mrow><mi>m</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>(</mo><mi>P</mi><mo>)</mo><mo>+</mo><mi>m</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>(</mo><mi>Q</mi><mo>)</mo></mrow><annotation>mean(P) + mean(Q)</annotation></semantics></math>mean(P)+mean(Q) is as large as possible. (Note that each <math><semantics><mrow><msub><mi>A</mi><mi>i</mi></msub></mrow><annotation>A\_i</annotation></semantics></math>Ai​ must belong to either subset <math><semantics><mrow><mi>P</mi></mrow><annotation>P</annotation></semantics></math>P or subset <math><semantics><mrow><mi>Q</mi></mrow><annotation>Q</annotation></semantics></math>Q).

Help him find this maximum value of <math><semantics><mrow><mi>m</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>(</mo><mi>P</mi><mo>)</mo><mo>+</mo><mi>m</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>(</mo><mi>Q</mi><mo>)</mo></mrow><annotation>mean(P) + mean(Q)</annotation></semantics></math>mean(P)+mean(Q).

As a reminder, the mean of a subset <math><semantics><mrow><mi>X</mi></mrow><annotation>X</annotation></semantics></math>X of size <math><semantics><mrow><mi>M</mi></mrow><annotation>M</annotation></semantics></math>M is defined as: <math><semantics><mrow><mi>m</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>(</mo><mi>X</mi><mo>)</mo><mo>\=</mo><mstyle><mfrac><mrow><msubsup><mo>∑</mo><mrow><mi>i</mi><mo>\=</mo><mn>1</mn></mrow><mi>M</mi></msubsup><msub><mi>X</mi><mi>i</mi></msub></mrow><mi>M</mi></mfrac></mstyle></mrow><annotation>mean(X) = \\dfrac{\\sum\_{i = 1}^{M} X\_i}{M}</annotation></semantics></math>mean(X)\=M∑i\=1M​Xi​​.

For example, <math><semantics><mrow><mi>m</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>(</mo><mo>\[</mo><mn>3</mn><mo>,</mo><mn>1</mn><mo>,</mo><mn>4</mn><mo>,</mo><mn>5</mn><mo>\]</mo><mo>)</mo><mo>\=</mo><mfrac><mrow><mn>3</mn><mo>+</mo><mn>1</mn><mo>+</mo><mn>4</mn><mo>+</mo><mn>5</mn></mrow><mn>4</mn></mfrac><mo>\=</mo><mn>3.25</mn></mrow><annotation>mean(\[3, 1, 4, 5\]) = \\frac{3 + 1 + 4 + 5}{4} = 3.25</annotation></semantics></math>mean(\[3,1,4,5\])\=43+1+4+5​\=3.25.

### Input Format

* The first line contains <math><semantics><mrow><mi>T</mi></mrow><annotation>T</annotation></semantics></math>T - the number of test cases. Then the test cases follow.
* The first line of each test case contains an integer <math><semantics><mrow><mi>N</mi></mrow><annotation>N</annotation></semantics></math>N - the size of the array <math><semantics><mrow><mi>A</mi></mrow><annotation>A</annotation></semantics></math>A.
* The second line of each test case contains <math><semantics><mrow><mi>N</mi></mrow><annotation>N</annotation></semantics></math>N space-separated integers <math><semantics><mrow><msub><mi>A</mi><mn>1</mn></msub><mo>,</mo><msub><mi>A</mi><mn>2</mn></msub><mo>,</mo><mo>…</mo><mo>,</mo><msub><mi>A</mi><mi>N</mi></msub></mrow><annotation>A\_1, A\_2, \\dots, A\_N</annotation></semantics></math>A1​,A2​,…,AN​ denoting the array <math><semantics><mrow><mi>A</mi></mrow><annotation>A</annotation></semantics></math>A.

### Output Format

Output the largest value of <math><semantics><mrow><mi>m</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>(</mo><mi>P</mi><mo>)</mo><mo>+</mo><mi>m</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>(</mo><mi>Q</mi><mo>)</mo></mrow><annotation>mean(P) + mean(Q)</annotation></semantics></math>mean(P)+mean(Q).

Your answer is considered correct if its absolute or relative error does not exceed <math><semantics><mrow><msup><mn>10</mn><mrow><mo>−</mo><mn>6</mn></mrow></msup></mrow><annotation>10^{-6}</annotation></semantics></math>10−6.

Formally, let your answer be <math><semantics><mrow><mi>a</mi></mrow><annotation>a</annotation></semantics></math>a, and the jury's answer be <math><semantics><mrow><mi>b</mi></mrow><annotation>b</annotation></semantics></math>b. Your answer is accepted if and only if <math><semantics><mrow><mfrac><mrow><mi>∣</mi><mi>a</mi><mo>−</mo><mi>b</mi><mi>∣</mi></mrow><mrow><mi>max</mi><mo>⁡</mo><mrow><mo>(</mo><mn>1</mn><mo>,</mo><mi>∣</mi><mi>b</mi><mi>∣</mi><mo>)</mo></mrow></mrow></mfrac><mo>≤</mo><msup><mn>10</mn><mrow><mo>−</mo><mn>6</mn></mrow></msup></mrow><annotation>\\frac{|a - b|}{\\max{(1, |b|)}} \\le 10^{-6}</annotation></semantics></math>max(1,∣b∣)∣a−b∣​≤10−6.

### Constraints

* <math><semantics><mrow><mn>1</mn><mo>≤</mo><mi>T</mi><mo>≤</mo><mn>100</mn></mrow><annotation>1 \\leq T \\leq 100</annotation></semantics></math>1≤T≤100
* <math><semantics><mrow><mn>2</mn><mo>≤</mo><mi>N</mi><mo>≤</mo><mn>1000</mn></mrow><annotation>2 \\leq N \\leq 1000</annotation></semantics></math>2≤N≤1000
* <math><semantics><mrow><mn>1</mn><mo>≤</mo><msub><mi>A</mi><mi>i</mi></msub><mo>≤</mo><msup><mn>10</mn><mn>6</mn></msup></mrow><annotation>1 \\leq A\_i \\leq 10^6</annotation></semantics></math>1≤Ai​≤106

### Sample 1:

Input

Output

```
2
2
4 5
5
2 2 2 2 2
```

```
9.000000
4.000000
```

### Explanation:

*Test case-1:* We can divide the two elements into two non-empty subsets <math><semantics><mrow><mi>P</mi></mrow><annotation>P</annotation></semantics></math>P and <math><semantics><mrow><mi>Q</mi></mrow><annotation>Q</annotation></semantics></math>Q as follows: <math><semantics><mrow><mi>P</mi><mo>\=</mo><mo>\[</mo><mn>4</mn><mo>\]</mo></mrow><annotation>P = \[4\]</annotation></semantics></math>P\=\[4\], <math><semantics><mrow><mi>Q</mi><mo>\=</mo><mo>\[</mo><mn>5</mn><mo>\]</mo></mrow><annotation>Q = \[5\]</annotation></semantics></math>Q\=\[5\].

Therefore, <math><semantics><mrow><mi>m</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>(</mo><mi>P</mi><mo>)</mo><mo>+</mo><mi>m</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>(</mo><mi>Q</mi><mo>)</mo><mo>\=</mo><mn>9</mn></mrow><annotation>mean(P) + mean(Q) = 9</annotation></semantics></math>mean(P)+mean(Q)\=9.

*Test case-2:* In whatever way we divide the elements of the array, mean of both the subsets will always be <math><semantics><mrow><mn>2</mn></mrow><annotation>2</annotation></semantics></math>2.

Therefore, <math><semantics><mrow><mi>m</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>(</mo><mi>P</mi><mo>)</mo><mo>+</mo><mi>m</mi><mi>e</mi><mi>a</mi><mi>n</mi><mo>(</mo><mi>Q</mi><mo>)</mo><mo>\=</mo><mn>4</mn></mrow><annotation>mean(P) + mean(Q) = 4</annotation></semantics></math>mean(P)+mean(Q)\=4.
