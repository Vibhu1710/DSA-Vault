---
solution_file: binarySearch/beautifulPermutation.cpp
tags:
  - BinarySearch
type:
solved: true
platform: CodeForces
date_created: Sat, 25 Oct
---

##### Question Source  
[Link](https://codeforces.com/contest/2162/problem/D)

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


This is an interactive problem.

There is a permutation\_\_CF\_MATH\_0\_\_ \_\_CF\_MATH\_1\_\_ of length \_\_CF\_MATH\_2\_\_.

Someone secretly chose two integers \_\_CF\_MATH\_3\_\_ (\_\_CF\_MATH\_4\_\_) and modified the permutation in the following way:

* For every index \_\_CF\_MATH\_5\_\_ such that \_\_CF\_MATH\_6\_\_, set \_\_CF\_MATH\_7\_\_.

Let \_\_CF\_MATH\_8\_\_ denote the resulting array obtained by modifying the permutation.

You are given an integer \_\_CF\_MATH\_9\_\_ denoting the length of the permutation \_\_CF\_MATH\_10\_\_.

In one query, you are allowed to choose two integers \_\_CF\_MATH\_11\_\_ (\_\_CF\_MATH\_12\_\_) and ask for the sum of the subarray either of the original permutation \_\_CF\_MATH\_13\_\_ or of the modified array \_\_CF\_MATH\_14\_\_. The answer to such a query will be the corresponding integer sum.

Your task is to find the pair \_\_CF\_MATH\_15\_\_ that was chosen to obtain \_\_CF\_MATH\_16\_\_ in no more than \_\_CF\_MATH\_17\_\_ queries.

\_\_CF\_MATH\_18\_\_A permutation of length \_\_CF\_MATH\_19\_\_ is an array consisting of \_\_CF\_MATH\_20\_\_ distinct integers from \_\_CF\_MATH\_21\_\_ to \_\_CF\_MATH\_22\_\_ in any order. For example, \_\_CF\_MATH\_23\_\_ is a permutation, but \_\_CF\_MATH\_24\_\_ is not a permutation (the number \_\_CF\_MATH\_25\_\_ appears twice in the array), and \_\_CF\_MATH\_26\_\_ is also not a permutation (\_\_CF\_MATH\_27\_\_, but the array contains \_\_CF\_MATH\_28\_\_).

Input

The first line of input contains a single integer \_\_CF\_MATH\_29\_\_ (\_\_CF\_MATH\_30\_\_) — the number of test cases.

Each test case contains a single integer \_\_CF\_MATH\_31\_\_ (\_\_CF\_MATH\_32\_\_) — the length of the permutation.

It is guaranteed that the sum of \_\_CF\_MATH\_33\_\_ over all the test cases does not exceed \_\_CF\_MATH\_34\_\_.

Interaction

The interaction for each test case begins by reading the integer \_\_CF\_MATH\_35\_\_.

You can ask two types of queries.

* Print "\_\_CF\_MATH\_36\_\_" (\_\_CF\_MATH\_37\_\_).

  In response, you should read a line containing a single integer \_\_CF\_MATH\_38\_\_ — the sum of the subarray of the original permutation. (Formally, \_\_CF\_MATH\_39\_\_).

* Print "\_\_CF\_MATH\_40\_\_" (\_\_CF\_MATH\_41\_\_).

  In response, you should read a line containing a single integer \_\_CF\_MATH\_42\_\_ — the sum of the subarray of the modified array. (Formally, \_\_CF\_MATH\_43\_\_).

The permutation \_\_CF\_MATH\_44\_\_ and the chosen integers \_\_CF\_MATH\_45\_\_, \_\_CF\_MATH\_46\_\_ are fixed beforehand and can't be changed during the time of interaction.

You can output the final answer by printing "\_\_CF\_MATH\_47\_\_", where \_\_CF\_MATH\_48\_\_, \_\_CF\_MATH\_49\_\_ denote the integers that were chosen to obtain \_\_CF\_MATH\_50\_\_. After printing the answer, your program should proceed to the next test case or terminate if there are no more.

You can ask no more than \_\_CF\_MATH\_51\_\_ queries per testcase. Printing the answer doesn't count as a query. If your program performs more than \_\_CF\_MATH\_52\_\_ queries for one test case or makes an invalid query, you may receive a Wrong Answer verdict.

After printing a query, do not forget to output the end of line and flush\_\_CF\_MATH\_53\_\_ the output. Otherwise, you will get Idleness limit exceeded.

Hacks

To make a hack, use the following test format.

The first line should contain a single integer \_\_CF\_MATH\_54\_\_ \_\_CF\_MATH\_55\_\_ — the number of testcases.

The first line of each test case should contain a single integer \_\_CF\_MATH\_56\_\_ (\_\_CF\_MATH\_57\_\_) — the length of the permutation \_\_CF\_MATH\_58\_\_.

The second line of each test case should contain \_\_CF\_MATH\_59\_\_ integers \_\_CF\_MATH\_60\_\_ (\_\_CF\_MATH\_61\_\_) — denoting the permutation \_\_CF\_MATH\_62\_\_.

The third line of each test case should contain two space-separated integers \_\_CF\_MATH\_63\_\_, \_\_CF\_MATH\_64\_\_ (\_\_CF\_MATH\_65\_\_) — the chosen integers.

For example, the following is the hack format of the example test:

```
2  3  3 1 2  2 2  4  2 1 3 4  2 4  
```

\_\_CF\_MATH\_66\_\_To flush, use:

* fflush(stdout) or cout.flush() in C++;
* System.out.flush() in Java;
* flush(output) in Pascal;
* stdout.flush() in Python;
* see documentation for other languages

Example

\_\_CF\_INPUT\_0\_\_
Output
Copy

```

1 1 2

2 1 2

! 2 2

1 2 4

2 1 3

2 3 4

! 2 4
```

Note

For the first testcase, \_\_CF\_MATH\_67\_\_ and \_\_CF\_MATH\_68\_\_, \_\_CF\_MATH\_69\_\_. Hence, the modified array \_\_CF\_MATH\_70\_\_ will be equal to \_\_CF\_MATH\_71\_\_.

So, querying "\_\_CF\_MATH\_72\_\_" gives \_\_CF\_MATH\_73\_\_. And querying "\_\_CF\_MATH\_74\_\_" gives \_\_CF\_MATH\_75\_\_.

For the second testcase, \_\_CF\_MATH\_76\_\_ and \_\_CF\_MATH\_77\_\_, \_\_CF\_MATH\_78\_\_.

Note that the queries shown in the sample test are only for demonstration purposes, and they may not correspond to any optimal solution.
