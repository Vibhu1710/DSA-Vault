The most best approach possible for que: [[Last Substring In Lexicographical Order]]


## High-level idea

We maintain **two candidate starting indices**:

- `i`: index of the current **best candidate** suffix
    
- `j`: index of the **challenger** suffix
    
- `k`: current **offset** into both suffixes while comparing
    

At any moment, we are comparing:

- suffix starting at `i`: `s[i], s[i+1], s[i+2], ...`
    
- suffix starting at `j`: `s[j], s[j+1], s[j+2], ...`
    

We compare characters at:

`s[i + k]  vs  s[j + k]`

The key trick:  
Once we have compared `k` characters and found where they differ, we can **skip a whole block** of starting positions that are now known to be worse, without re-checking all those characters again.

Each character index of the string will be involved in only a constant number of comparisons → **total work is O(n)**


### Some interesting test cases

tc1: "abbbbbbbbcab"

main thing is when i + k + 1 happens to be greater than j..
then we skip elements ahead of j as well and make i=i+k+1 and j=i+1

its like: i-> "bbbbbbbb" is not better than j-> "bbbbbbbc"
so we make i as "c" and j as "a"(the index after i)

tc2: "edcbaedcbf"
in this, i -> "edcba" and j goes like -> "edcbf"
here i would be made equal to j (i = j) and j would be made j + 1
So after this we begin at i -> "e" and j -> "d"

tc3: can try on "nannan" and "banana"




[Open File in VS Code](vscode://file/Users/vibhubhanot/Documents/DSA/strings/string 2/lastSubstringLexicographically.cpp)
```embed-cpp
PATH: "vault://Assets/Code/strings/string 2/lastSubstringLexicographically.cpp"
TITLE: "strings/string 2/lastSubstringLexicographically.cpp"
LINES: "1-200"
```
