
This a bit theoretical..


there are **2 approaches**:

1. **Backtracking based in-place swapping technique**.. TC - O(n!).. with copying the output -> O(n * n!)
   
   ```cpp
   // Generate all permutations by swapping (in-place backtracking)
#include <bits/stdc++.h>
using namespace std;

void permute(string &s, int l, vector<string> &out) {
    if (l == (int)s.size() - 1) {
        out.push_back(s);            // one full permutation (cost O(n) to copy)
        return;
    }
    for (int i = l; i < (int)s.size(); ++i) {
        swap(s[l], s[i]);            // choose
        permute(s, l + 1, out);      // explore
        swap(s[l], s[i]);            // undo (backtrack)
    }
}

vector<string> allPermutations(string s) {
    vector<string> out;
    permute(s, 0, out);
    return out;
}
   ```
   
2. Using DFS and Visited array:
   TC - O(n * n!).. with copying the output TC - O(n^2 * n!)

There are some other approaches as well..

![[Screenshot 2025-11-09 at 4.13.44 PM.png]]
This theory is a TODO later for me..


### Time Complexity Analysis (Tree Method)

Theory of factorial summations (purani maths):

![[Screenshot 2025-11-09 at 4.08.19 PM.png]]



> [!NOTE] Basically
> 
> - Basically saying that **the number of leaf nodes is exactly equal to n!**
and **the total number of nodes in the tree is e * n!**
> - e being a constant







