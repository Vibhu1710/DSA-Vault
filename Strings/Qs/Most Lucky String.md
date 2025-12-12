---
solution_file:
tags:
  - Strings
type:
solved: false
platform: CodingNinjas
date_created: Thu, 11 Dec
---

##### Question Source  
[Link](https://classroom.codingninjas.com/app/classroom/me/14262/content/262247/offering/5245606/problem/11038?leftPanelTabValue=PROBLEM)

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

Mr. X is planning to visit Ninja Land. Ninja Land has 'N' cities numbered from 0 to 'N-1' and 'M' bidirectional roads. Each road connects two of the 'N' cities, and no two cities have multiple roads between them. All the 'N' cities have a certain 3 letter code given in the array 'ARR'. Mr. X will stay at Ninja land for exactly 'K' days, and he does not like to stay in the same city for two consecutive days. Therefore, he needs to change his city every day of his stay. He also has a special string that is initially empty. Mr. X has a habit that whenever he visits a city, he appends the code of that city to his special string.

Mr. X has a lucky string 'S' of length '3\*K'. Mr. X wants to plan his stay in such a manner that the number of places where the final special string differs from the lucky string is the minimum possible. Your task is to find any such order of cities that Mr. X should visit satisfying the above conditions.

Detailed explanation ( Input/output format, Notes, Images )

**Input Format :**

```
The first line of the input contains an integer, 'T,’ denoting the number of test cases.

The first line of each test case contains three space-separated integers, 'N', 'M' and 'K', denoting the number of cities, the number of bidirectional roads, and the number of cities that Mr. X will visit, respectively. 

The second line of each test case contains 'N' space-separated strings denoting the elements of the array 'ARR'.

The third line of each test contains the special string 'S'.

The next 'M' lines of each test case contain the description of the 'M' roads.
The 'i'th' line contains two space-separated integers, 'City1', 'City2'. 'City1' and 'City2' denote the two cities that are connected by the 'i'th' road.
```
**Output Format :**

```
For each test case, the checker will print "valid" if the returned order of cities results in a string that differs from the lucky string 'S' at the minimum possible places. Otherwise, the checker will print "invalid".
Print the output of each test case in a new line.
```
**Note :**

```
You do not need to print anything. It has already been taken care of. Just implement the given function.
```

**Constraints :**

```
1 <= T <= 10
2 <= N <= 1000
1 <= M  <= min(1000,(N*(N-1))/2)
1 <= K <= 100
|ARR[i]| = 3 
|S| = 3*K 
0 <= City1, City2 <= N-1

Every city is reachable from every other city, any two cities are directly connected by at most one road and all the input strings contain uppercase English letters only.

Where 'T' denotes the number of test cases, 'N' denotes the number of cities, 'M' denotes the number of roads, 'K' denotes the number of cities that Mr. X will visit, ARR[i] denotes the 'i'th' element of the array 'ARR', 'S' denotes the lucky string, 'City1' and 'City2' denotes the two cities that are connected by the 'i'th' road, .

Time Limit : 1 sec
```

##### Sample Input 1 :

```
2
3 2 2
AAB BBD ABC
AABABCBBD
0 2
1 2
4 3 1
AAA BBD CCD BBC
BFC
1 2
0 3
1 3
```

##### Sample Output 1 :

```
valid
valid
```

##### Explanation for Sample Input 1 :

```
For the first test case : 
Mr. X can start his journey at City-0, then go to City-2 and then end his journey at City-1. The special string will be "AABABCBBD" which is exactly same as the lucky string.

For the second test case :
Mr. X should visit City-3 only, as the special string in this case differs by the lucky string at only one place.
```

##### Sample Input 2 :

```
2
3 3 2
ABC BBD ARQ
ABDABD
1 2
0 2
0 1
2 1 1
AAB BBA
AAA
1 0
```

##### Sample Output 2 :

```
valid
valid
```

##### Explanation for Sample Input 2 :

```
For the first test case : 
Mr. X should follow the path City-0 => City-1.

For the second test case:
Mr. X should visit City-1 only.
```

---

**Starter Code:**

```cpp
// 45 min
/*
    Time Complexity : O(M*K)
    Space Complexity : O(N*K)

    Where N is the number of cities, M is the number of roads and K is the
   number of days Mr. X will stay at Ninjaland
*/

#define INT_MAX 1000000

vector<int> findOptimalOrder(vector<string> &arr, vector<vector<int>> &roads,
                             string &s) {
  int n = arr.size();
  int m = roads.size();
  int k = (s.size()) / 3;

  // Declaring the array to store DP states
  vector<vector<int>> minDifference(n, vector<int>(k, INT_MAX));
  vector<vector<int>> optimalOrder(n, vector<int>(k, -1));

  // Assigning values to the first column of the matrix
  for (int i = 0; i < n; i++) {
    minDifference[i][0] = 0;
    for (int l = 0; l < 3; l++) {
      minDifference[i][0] += (arr[i][l] != s[l]);
    }
  }

  // Iterating for each day
  for (int i = 1; i < k; i++) {
    // Iterating through all the roads
    for (vector<int> road : roads) {
      int firstCity = road[0], secondCity = road[1];
      int firstCost = 0, secondCost = 0;

      // Finding the number of places current city differs from the lucky string
      for (int l = 0; l < 3; l++) {
        firstCost += (arr[firstCity][l] != s[3 * i + l]);
        secondCost += (arr[secondCity][l] != s[3 * i + l]);
      }

      // Checking if we are able to found a smaller answer and updating values
      // accordingly
      if (minDifference[firstCity][i] >
          minDifference[secondCity][i - 1] + firstCost) {
        minDifference[firstCity][i] =
            minDifference[secondCity][i - 1] + firstCost;
        optimalOrder[firstCity][i] = secondCity;
      }
      if (minDifference[secondCity][i] >
          minDifference[firstCity][i - 1] + secondCost) {
        minDifference[secondCity][i] =
            minDifference[firstCity][i - 1] + secondCost;
        optimalOrder[secondCity][i] = firstCity;
      }
    }
  }

  int minTotalCost = INT_MAX;
  int start = -1;

  // Finding the optimal city in which Mr. X will end his journey
  for (int i = 0; i < n; i++) {
    if (minTotalCost > minDifference[i][k - 1]) {
      start = i;
      minTotalCost = minDifference[i][k - 1];
    }
  }

  vector<int> ans(k);
  int dayCount = k - 1;

  // Generating the optimal order of cities by traversing backwards
  while (dayCount >= 0) {
    ans[dayCount] = start;
    start = optimalOrder[start][dayCount];
    dayCount--;
  }

  return ans;
}
```

