---
solution_file: 
tags: []
type: 
solved: false
platform: CodeChef
date_created: Thu, 30 Oct
---

##### Question Source  
[Link](https://www.codechef.com/problems/DELSORTSUB)

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


The set of balanced binary strings are as follows:

* The empty string is balanced.
* If <math><semantics><mrow><mi>S</mi></mrow><annotation>S</annotation></semantics></math>S is balanced, then <math><semantics><mrow><mn>0</mn><mo>+</mo><mi>S</mi><mo>+</mo><mn>1</mn></mrow><annotation>0 + S + 1</annotation></semantics></math>0+S+1 is balanced.
* If <math><semantics><mrow><mi>S</mi><mo>,</mo><mi>T</mi></mrow><annotation>S, T</annotation></semantics></math>S,T are balanced, then <math><semantics><mrow><mi>S</mi><mo>+</mo><mi>T</mi></mrow><annotation>S + T</annotation></semantics></math>S+T is balanced.

Here <math><semantics><mrow><mo>+</mo></mrow><annotation>+</annotation></semantics></math>+ denotes string concatenation.

For example, <math><semantics><mrow><mn>01</mn><mo>,</mo><mn>0101</mn></mrow><annotation>01, 0101</annotation></semantics></math>01,0101 and <math><semantics><mrow><mn>0011</mn></mrow><annotation>0011</annotation></semantics></math>0011 are balanced, but <math><semantics><mrow><mn>10</mn></mrow><annotation>10</annotation></semantics></math>10 and <math><semantics><mrow><mn>010</mn></mrow><annotation>010</annotation></semantics></math>010 are not.

---

Given a binary string <math><semantics><mrow><mi>S</mi></mrow><annotation>S</annotation></semantics></math>S of length <math><semantics><mrow><mi>N</mi></mrow><annotation>N</annotation></semantics></math>N, you can perform the following operation on it as many times as you want:

* Choose a sorted subsequence <math><semantics><mrow><mi>T</mi></mrow><annotation>T</annotation></semantics></math>T from <math><semantics><mrow><mi>S</mi></mrow><annotation>S</annotation></semantics></math>S, and then delete it from <math><semantics><mrow><mi>S</mi></mrow><annotation>S</annotation></semantics></math>S.

Formally, we can describe the operation as:

* Choose an integer <math><semantics><mrow><mi>K</mi></mrow><annotation>K</annotation></semantics></math>K (<math><semantics><mrow><mn>1</mn><mo>≤</mo><mi>K</mi><mo>≤</mo><mi>N</mi></mrow><annotation>1 \\le K \\le N</annotation></semantics></math>1≤K≤N), and indices <math><semantics><mrow><msub><mi>i</mi><mn>1</mn></msub><mo>,</mo><msub><mi>i</mi><mn>2</mn></msub><mo>,</mo><mo>…</mo><mo>,</mo><msub><mi>i</mi><mi>k</mi></msub></mrow><annotation>i\_1, i\_2, \\ldots, i\_k</annotation></semantics></math>i1​,i2​,…,ik​, satisfying
  * <math><semantics><mrow><mn>1</mn><mo>≤</mo><msub><mi>i</mi><mn>1</mn></msub><mo><</mo><msub><mi>i</mi><mn>2</mn></msub><mo><</mo><mo>…</mo><mo><</mo><msub><mi>i</mi><mi>k</mi></msub><mo>≤</mo><mi>N</mi></mrow><annotation>1 \\le i\_1 < i\_2 < \\ldots < i\_k \\le N</annotation></semantics></math>1≤i1​<i2​<…<ik​≤N
  * <math><semantics><mrow><msub><mi>S</mi><msub><mi>i</mi><mi>j</mi></msub></msub><mo>≤</mo><msub><mi>S</mi><msub><mi>i</mi><mrow><mi>j</mi><mo>+</mo><mn>1</mn></mrow></msub></msub></mrow><annotation>S\_{i\_j} \\le S\_{i\_{j + 1}}</annotation></semantics></math>Sij​​≤Sij+1​​
* Delete the indices <math><semantics><mrow><msub><mi>i</mi><mn>1</mn></msub><mo>,</mo><msub><mi>i</mi><mn>2</mn></msub><mo>,</mo><mo>…</mo><msub><mi>i</mi><mi>k</mi></msub></mrow><annotation>i\_1, i\_2, \\ldots i\_k</annotation></semantics></math>i1​,i2​,…ik​ from the string <math><semantics><mrow><mi>S</mi></mrow><annotation>S</annotation></semantics></math>S simultaneously and concatenate the remaining parts of the string formed.

Find the **minimum number** of operations needed to make <math><semantics><mrow><mi>S</mi></mrow><annotation>S</annotation></semantics></math>S balanced.

### Input Format

* The first line of input will contain a single integer <math><semantics><mrow><mi>T</mi></mrow><annotation>T</annotation></semantics></math>T, denoting the number of test cases.
* Each test case consists of multiple lines of input.
  * The first line of each test case contains a single integer <math><semantics><mrow><mi>N</mi></mrow><annotation>N</annotation></semantics></math>N - the size of the binary string <math><semantics><mrow><mi>S</mi></mrow><annotation>S</annotation></semantics></math>S.
  * The second line contains <math><semantics><mrow><mi>S</mi></mrow><annotation>S</annotation></semantics></math>S - a binary string of length <math><semantics><mrow><mi>N</mi></mrow><annotation>N</annotation></semantics></math>N.

### Output Format

For each test case, output on a new line the minimum number of operations to make <math><semantics><mrow><mi>S</mi></mrow><annotation>S</annotation></semantics></math>S balanced.

### Constraints

* <math><semantics><mrow><mn>1</mn><mo>≤</mo><mi>T</mi><mo>≤</mo><msup><mn>10</mn><mn>4</mn></msup></mrow><annotation>1 \\le T \\le 10^4</annotation></semantics></math>1≤T≤104
* <math><semantics><mrow><mn>1</mn><mo>≤</mo><mi>N</mi><mo>≤</mo><mn>2</mn><mo>⋅</mo><msup><mn>10</mn><mn>5</mn></msup></mrow><annotation>1 \\le N \\le 2 \\cdot 10^5</annotation></semantics></math>1≤N≤2⋅105
* <math><semantics><mrow><msub><mi>S</mi><mi>i</mi></msub><mo>∈</mo><mo>{</mo><mn>0</mn><mo>,</mo><mn>1</mn><mo>}</mo></mrow><annotation>S\_i \\in \\{0, 1\\}</annotation></semantics></math>Si​∈{0,1}
* <math><semantics><mrow><mi>∣</mi><mi>S</mi><mi>∣</mi><mo>\=</mo><mi>N</mi></mrow><annotation>|S| = N</annotation></semantics></math>∣S∣\=N
* The sum of <math><semantics><mrow><mi>N</mi></mrow><annotation>N</annotation></semantics></math>N over all test cases does not exceed <math><semantics><mrow><mn>2</mn><mo>⋅</mo><msup><mn>10</mn><mn>5</mn></msup></mrow><annotation>2 \\cdot 10^5</annotation></semantics></math>2⋅105.

### Sample 1:

Input

Output

```
6
4
0101
1
1
3
011
4
1001
8
00110100
8
00111001
```

```
0
1
1
2
1
2
```

### Explanation:

**Test case <math><semantics><mrow><mn>1</mn></mrow><annotation>1</annotation></semantics></math>1** : The given string is already balanced.

**Test case <math><semantics><mrow><mn>2</mn></mrow><annotation>2</annotation></semantics></math>2** : We can delete the only character in <math><semantics><mrow><mi>S</mi></mrow><annotation>S</annotation></semantics></math>S, and then it becomes the empty string, which is balanced.
