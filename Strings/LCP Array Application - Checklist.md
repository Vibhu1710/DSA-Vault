
This talks about the applications of LCP array and various trademark questions where it gets used..


These are small, powerful facts you’ll use often:

- [ ] **Number of distinct substrings** of string `S` (length `n`):  
    total substrings = `n*(n+1)/2`. Many are duplicates. Subtract overlaps measured by LCP:
    
    distinct substrings=n(n+1)2−∑i=1n−1LCP[i]\text{distinct substrings} = \frac{n(n+1)}{2} - \sum_{i=1}^{n-1} LCP[i]distinct substrings=2n(n+1)​−i=1∑n−1​LCP[i]
    
    Intuition: `SA[i]`’s suffix contributes `n - SA[i]` total new substrings, but any prefix already counted (length up to `LCP[i]`) must be subtracted.
    
- [ ] **Longest repeated substring (LRS)**:
    
    LRS length=max⁡i=1..n−1LCP[i].\text{LRS length} = \max_{i=1..n-1} LCP[i].LRS length=i=1..n−1max​LCP[i].
    
    The position(s) where `LCP` is maximal give starting indices of the repeated substring.
    
- [ ] **Longest common substring of two strings**:  
    Build a _generalized suffix array_ (concatenate strings with a separator and track origin). The LRS among suffixes from different origin strings equals the max `LCP[i]` where `SA[i]` and `SA[i-1]` come from different strings.
    
- [ ] **k-th lexicographic substring**:  
    You can enumerate distinct substrings in lexicographic order by traversing `SA` and using `LCP` to skip previously counted prefixes. Counting lengths and subtracting `LCP` tells how many _new_ substrings each suffix contributes lexicographically; you can find the k-th substring by accumulating those counts.
    
- [ ] **Substring frequency** (how many occurrences of a pattern):  
    Do a binary search over `SA` for the pattern (compare pattern with the suffix at `SA[mid]`). But with LCP and RMQ you can optimize the binary search to avoid repeated char comparisons (accelerated binary search or "two-pointer using LCP" technique). Also once you find any occurrence, occurrences correspond to a contiguous interval in SA — number of occurrences = `r - l + 1` where `l` and `r` are first and last suffixes having the pattern as a prefix (found by two binary searches or by expanding with RMQ).
    
- [ ] **Finding repeats / maximal repeats**:  
    Using LCP array and interval minima you can find all substrings that occur ≥ t times or maximal repeated substrings (those not extendable left/right).