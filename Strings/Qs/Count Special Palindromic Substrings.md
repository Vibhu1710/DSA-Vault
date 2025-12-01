---
solution_file: strings/string 2/countSpecialPalindromicSubstrings.cpp
tags:
  - Strings
type:
solved: true
platform: CodingNinjas
date_created: Sun, 30 Nov
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/14262/content/262247/offering/5245605/problem/11169)

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

You are given a string 'STR'. Your task is to count the number of special palindromic substrings of size greater than 1 that the given string contains. A substring is said to be a special palindrome in the following two cases:

```
If all the characters in the substring are the same.

If the length of the substring is odd and only the middle element is different, while all the other characters are the same. 
```
**Example:**

```
“aba” is a special palindrome, while “abaa” is not
```

Detailed explanation ( Input/output format, Notes, Images )

**Input Format:**

```
The first line contains an integer ‘T’, which denotes the number of test cases or queries to be run. Then the test cases are as follows.

The first and the only line of each test case contains the string 'STR'.
```
**Output Format:**

```
For each test case, print the count of special palindromic substrings.

Print the output of each test case in a separate line.
```
**Note:**

```
You don’t need to print anything; It has already been taken care of. Just implement the given function.
```

**Constraints:**

```
1 <= T <= 100
1 <= |STR| <= 10000

Time limit: 1 sec
```

##### Sample Input 1:

```
2
bcbc
ccddd
```

##### Sample Output 1:

```
2
4
```

##### Explanation For Sample Input 1:

```
In the first test case, 
The special palindromic substrings in the given string are: bcb and cbc. Hence, the answer is 2 in this case.

In the second test case, 
The special palindromic substrings in the string are: cc, dd, ddd and dd. Hence, the answer is 4 in this case. 
```

##### Sample Input 2:

```
2
abccdcdf
baabaab
```

##### Sample Output 2:

```
3
4
```

---

**Starter Code:**

```cpp
#include<bits/stdc++.h>

string modifyString(string &s){
  string newS;
  for(auto ele : s){
    newS += "#" + string(1, ele);
  }
  newS.push_back('#');
  return newS;
}

bool specialPalindromicCondition(string &s, int n, int i, int curPalLen){
  int rightIndex = i + curPalLen + 1;
  int leftIndex = i - curPalLen - 1;

  // limits are not satisfied
  if(rightIndex == n || leftIndex < 0) return false;
  // the chars are special chars
  if(s[leftIndex] == '#' && s[rightIndex] == '#') return true;
  // the chars are not same
  if(s[leftIndex] != s[rightIndex] ) return false;

  // at this point, the end chars match
  if(curPalLen == 0 || curPalLen == 1) return true; // a case like: "a#a" or "b#a#b"

  // main condition, chars should be the same as internal characters
  // extract the internal char
  char internalChar = s[i + curPalLen - 1];
  return internalChar == s[rightIndex];
}

vector<int> manacherAlgo(string s){
  int n = s.size();
  vector<int> arr(n);
  int c = 0, r = 0;
  for(int i=1; i<n; ++i){
    if(i < r){
      arr[i] = min(r - i, arr[2 * c - i]);
    }
    while(specialPalindromicCondition(s, n, i, arr[i])) ++arr[i];
    if(i + arr[i] > r){
      c = i;
      r = i +arr[i];
    }
  }

  return arr;
}
int specialPalindromes(string &str)
{
  auto arr = manacherAlgo(modifyString(str));
  int ans = 0;
  for(auto ele: arr){
    ans += (ele / 2);
  }
  return ans;
}
```





> [!NOTE] After Thoughts
> - solved this using a manacher algo variation
> - but couldn't solve the interesting RUNS approach, which in reality is plain and simple
> 
