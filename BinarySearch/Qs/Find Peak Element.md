---
solution_file:
tags:
  - BinarySearch
type:
solved: true
platform: LeetCode
date_created: Fri, 26 Sep
---

##### Question Source  
[Link](https://leetcode.com/problems/find-peak-element/)

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


A peak element is an element that is strictly greater than its neighbors.

Given a **0-indexed** integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to **any of the peaks**.

You may imagine that `nums[-1] = nums[n] = -∞`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in `O(log n)` time.

**Example 1:**

```
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
```

**Example 2:**

```
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
```

**Constraints:**

* `1 <= nums.length <= 1000`
* `-2<sup>31</sup> <= nums[i] <= 2<sup>31</sup> - 1`
* `nums[i] != nums[i + 1]` for all valid `i`.

---

**Starter Code:**

```cpp
class Solution {
public:
    int findPeakElement(vector<int> &arr) {
      int s = 0, e = arr.size()-1;
      arr.push_back(INT_MIN);

      int validPeakIndex = -1;

      while(s <= e){
        int mid = (s + e) / 2;

        if(arr[mid] < arr[mid+1]){
            s = mid + 1;
        }
        else {
            e = mid - 1;
            validPeakIndex = mid;
        }
      }

      return validPeakIndex;
    }
};
```

