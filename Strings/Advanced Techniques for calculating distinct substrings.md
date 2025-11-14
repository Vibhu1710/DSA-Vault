---
tags:
  - Strings
---
Related to the question: [[D. Good Substrings]]

Standard question: [[Count distinct substrings present in a given string]]


### **Approach 3** : Suffix Array + LCP approach

Idea:

Build suffix array of s (O(n log n) or O(n) algorithms) and LCP array (Kasai).

For each suffix sa[i] we can count how many new distinct prefixes of that suffix are good, subtracting LCP with previous suffix (to avoid duplicates).

For suffix starting at pos, compute the maximum allowed length maxLen[pos] such that substring ending at any pos+len-1 has ≤k bads — using badPrefix we can find maxLen in O(log n) by binary search or O(1) via two pointers.

Contribution for this suffix = max(0, min(n - sa[i], maxLen[sa[i]]) - lcp[i]).

Overall complexity depends on how you compute maxLen, but you can get O(n log n) or O(n) with a two-pointer for all suffixes.

Complexities:

Time: typically O(n log n) (suffix array) + O(n) counting.

Space: O(n).

Good tradeoff: smaller memory than naive set, deterministic.

Remarks:

Reasonable approach if you have a reliable suffix-array implementation.

References: [suffix-array & LCP counting distinct substrings is standard.](https://www.geeksforgeeks.org/dsa/count-distinct-substrings-string-using-suffix-array/)



Also, **there is another famous but standard approach which is as follows:**

### 4) Suffix Automaton (SAM) — **best memory: O(n)**, can be made linear time

This is the _most interesting_ approach for best asymptotic memory/time.

Key facts about SAM:

- SAM for a string of length nnn has at most 2n−12n-12n−1 states, can be built in **O(n)** time (alphabet constant).
    
- Each distinct substring corresponds to exactly one path starting from the initial state; the number of new distinct substrings added when appending character `s[i]` equals `len[cur] - len[link[cur]]` for the state `cur` created/updated for that extension. [cp-algorithms.com](https://cp-algorithms.com/string/suffix-automaton.html?utm_source=chatgpt.com)
    

How to incorporate the “≤ k bad letters” constraint:

- Process the string **left→right**, maintain `badPrefix`, and for each end position `r` compute `maxLenAllowed[r]`, the maximum length LLL such that substring `s[r-L+1 .. r]` has ≤k bad letters. This can be found by moving a pointer `l` for every `r` (two-pointer) in **O(n)** overall.
    
- Build SAM incrementally. When you add `s[r]` (the classic SAM extend), you get the current `last` (state `cur`) and know `len[cur]` and `len[link[cur]]`.
    
- The _number of new distinct substrings_ ending at `r` that SAM would add is normally `len[cur] - len[link[cur]]`. But **only substrings of length ≤ maxLenAllowed[r] are valid**. So the **contribution** from position `r` should be:
    
    contribr=max⁡(0,  min⁡( len[cur],  maxLenAllowed[r] )−len[link[cur]])\text{contrib}_r = \max(0,\; \min(\,len[cur],\; maxLenAllowed[r]\,) - len[link[cur]] )contribr​=max(0,min(len[cur],maxLenAllowed[r])−len[link[cur]])
    
    Intuition: SAM adds all new substrings that end at position rrr and have lengths in `(len[link[cur]]..len[cur]]`. We only count those whose length ≤ allowed length.
    
- Sum `contrib_r` across all `r`. The SAM ensures we do not double-count distinct substrings, and the above clipping enforces the bad-letter constraint.
    

Complexities:

- Build SAM: **O(n)** time.
    
- Maintain two-pointer for `maxLenAllowed`: **O(n)** time.
    
- Counting contributions while building: **O(n)** time.
    
- Total: **O(n)** time and **O(n)** memory (states and small arrays). This is asymptotically optimal (linear). [cp-algorithms.com+1](https://cp-algorithms.com/string/suffix-automaton.html?utm_source=chatgpt.com)
    

Caveat:

- The correctness depends on the SAM extend mechanics where `len[cur]` and `len[link[cur]]` reflect the new endpos-equivalence class lengths. This is a standard trick to count restricted distinct substrings while inserting characters. (You can find similar arguments in SAM tutorials.)
  
  
  Source: [Cp Algorithms](https://cp-algorithms.com/string/suffix-automaton.html)