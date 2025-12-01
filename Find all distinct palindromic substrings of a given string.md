---
solution_file: 
tags: []
type: 
solved: false
platform: CodingNinjas
date_created: Mon, 01 Dec
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/14262/content/262247/offering/5245605/problem/11544)

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


## Problem statement
<ninjas-problems-ui-send-feedback-button><button>Send feedback</button></ninjas-problems-ui-send-feedback-button>

Ninja did not do homework. As a penalty, the teacher has given a string ‘S’ to ninja and asked him to print all distinct palindromic substrings of the given string. A string is said to be palindrome if the reverse of the string is the same as the string itself. For example, the string “bccb” is a palindrome, but the string “def” is not a palindrome.

Detailed explanation ( Input/output format, Notes, Images )

**Input Format:**

```
The first line of input contains an integer ‘T’, denoting the number of test cases.
The first and only line of each test case contains the string ‘S’. 
```
**Output Format:**

```
For each test case, print all distinct palindromic substrings of the given string. Print the substrings in sorted manner and they should be space-separated.    

Print the output of each test case in a separate line.
```

**Constraints:**

```
1 <= T <= 10
1 <= |S| <= 1000

String S contains lowercase English letters only.

Where ‘T’ represents the number of test cases and ‘S’ represents the given string.

Time limit: 1 sec
```

##### Sample Input 1:

```
2
aba
aabb
```

##### Sample Output 1:

```
a aba b
a aa b bb
```

##### Explanation of sample input 1:

```
For the first test case, 
All the possible substrings are [ ‘a’, ‘b’, ‘ab’, ‘ba’, ‘aba’ ] out of which [ ‘a’, ‘aba', 'b’ ] are 
palindromic substrings.

For the second test case,
All the possible substrings are [ ‘a’, ‘b’, ‘aa’, ‘ab’, ‘bb’, ‘aab’, ‘abb’ , ‘aabb’ ] out of which [ 
‘a’, ‘b’, ‘aa’, ‘bb’ ] are palindromic substrings.
```

##### Sample Input 2:

```
2
babbb
abcdc
```

##### Sample Output 2:

```
a b bab bb bbb 
a b c cdc d
```

---

**Starter Code:**

```cpp
// C++ program to find all distinct palindrome sub-strings
// of a given string
using namespace std;

vector<string> solve(string s)
{
}

```


