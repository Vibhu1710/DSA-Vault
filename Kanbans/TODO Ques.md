---

kanban-plugin: board

---

## Question Log

- [ ] **What is a Bitwise Trie ?**
	They say it is used to solve que on subArray with the maximum Xor !!
	
	This is a Trie variation !!
	
	#Trie
- [ ] [[LCP Array Application - Checklist]]
	
	- [ ] **All the necessary items required to be checked to call for a complete knowledge of LCP questions variants !!**
	
	#Strings
- [ ] [[Most Lucky String]]
	- This is a question of DP on graphs
	- It is Hard level, I will solve this question later
	
	#DP #graphs
- [ ] *An Advanced Topic on* **RMQ on LCP Array**
	
	You will surely encounter this later.. this is the building block of what we call as **Suffix Tree**
	
	#Strings
- [ ] **Advanced Topic : May need to do this later**
	
	**EERTREE**.. also called Palindromic Tree
- [ ] **Sorting a vector of strings**
	
	**What algos can do it in less than O(n^2 * logn) ?**
	- There are some algos out there and no it is not related to the suffix theory we know of..
	
	#byproduct
- [ ] [[Advanced Techniques for calculating distinct substrings]] ^hqriee
	- Suffix Tree
	- Suffix Automaton
	
	Related to [[D. Good Substrings]], advanced approaches
- [ ] [[More questions on Strings 1]]
	- can fetch more questions from codeforces
	- but this contains some previously **handpicked ones (To Be Solved)**..
- [ ] **Some Codeforces Practice Ques left to cove**r, related to BS (level 1200, 1300)
	Probably will introduce a cheat day for it
- [ ] **Interesting String Question**
	Given 2 strings have same count of all its characters.. Print minimum number of swaps it would take to make string 2 equal to string 1
	**Is it related to minimum swaps to sort an array?**
	#extra
- [ ] **Print how many palindromic permutations can be generated from a given string**  ⭐⭐
	
	#extra
- [ ] **IMPORTANT**
	Do more questions on DP on strings!!
- [ ] [[C. Sum of Cubes]] (1100)
	- [x] Find the approach
	- [ ] Implement the code part
- [ ] [Sport Mafia](https://codeforces.com/problemset/problem/1195/B)
	- [ ] See how it is being solved in editorial (A quadratic equation basically)
- [ ] **Aho Corasick String Algo?**
	linked with tries
- [ ] **IMPORTANT**
	**Clearcut extra practice needed for BS ques**
- [ ] **Power Set Method**
	to generate all subsequences of a given string
	pre to [[Longest Common Subsequence]] type question
- [ ] **BST QueLog**
	2 JFR questions to solve
	
	#BST
- [ ] **Priority Queues QueLog** (later)
	- [[K smallest elements]]
	- [[Merge K sorted arrays]]
	- [[Running Median]] <-
- [ ] **Balanced BSTs Study**
	- AVL Trees
	- Red Black Trees
	
	#BST
- [ ] **Merge Sort Algo & its TCA**
	- to be done #sorting
- [ ] **Sorting Algorithms** (to be done later)
	- **Quick Sort Algo** (revisit)
	- **Radix Sort** <- linear & bounded
	- **Counting Sort**
	
	#sorting
- [ ] **Operator Overloading**
	
	#cpp
- [ ] **Counting Sort**
	
	#cpp
- [ ] **Important Theory -** **OOPs 3**
	
	- Diamond Problem
	- Polymorphism
	- Function Overloading/Overriding
	- etc
	
	#cpp
- [ ] **Hash Maps Ques?**
	- we can revise a few ques in hashMaps folder in vscode.
- [ ] **Hash Map Theory**
	
	- Hashing, load factor
	- Collision Handling?
	- Implementing Hash Map?
- [ ] [[Pair sum in a BST]]
	- special with using less memory space
	- clever implementation, will try later
- [ ] **Pending Extra Activities**
	
	**Code Management Work**
	
	- [ ] rectify codeforces scraper
	- [ ] improve codechef scraper
	
	- [x] pdf clipping mechanism research
	- [x] Git ignore issue
	- [ ] Stars rating to que notes
	- [ ] feature - 1 queNote linked to >1 Q indices
	- [ ] Screenshots or pngs directly going to assets folder
	- [x] Archived tasks in Kanban to be removed (as links) (will do manually time to time)
	- [x] See why file graph explorer is not coming or loading in the side tab!!
	- [ ] A Daily Notes Template (with hourglass)
	- [ ] Dot config of daily notes based out of DAY SCORE?
	- [ ] A note that shows all unsolved ques (with solved parameter as false)
	- [ ] A note that shows all unattached question list (with no linked vs code file)
	- [ ] A new AI tool to have speech to text conversion so that it becomes easy to write an approach instead typing it through
	
	<br/>
	
	- [ ] VS Code Snippets (templates) research
	- [x] VS Code Git automatic push config
	- [ ] Daily Notes Dots Config
	- [ ] Tab switching problems in obsidian
	- [ ] Remove altu faltu code recommendations on vs code while I type C++


## Active

- [ ] [[3755. Find Maximum XOR Subarray length]]
	
	- [x] Read the solution
	- [x] Implement the code
	- [ ] Note down this and club all the XOR questions under the same theory note..
- [ ] **String 2 module important TODOs**
	
	**Search**
	1. recursive time complexity of **O(n^k)** in question [[Palindrome Partitioning III]], verify this part..
	2. the conversion of a **floor based formula into a non floor based formula** !!! There has to be a method because it is at the moment hit and trial (also note worthy if found a method ✍️)
	3. (**Try this on my own**) How to create an LPS array in brute force way? (comes from [[KMP Algo]])
	4. How do you get the lexicographically largest subsequence for a given string (**a proper DSA question to attempt**)
	5. Any way to get to the right formula - related to [[Count Special Palindromic Substrings]] (already mentioned as a point in another card)
	6. 
	
	
	**Note down**
	1. the formula for middle element inclusion and exclusion condition in case of a palindrome !! comes from question [[Longest Chunked Palindrome Decomposition]]
	2. Note down the approach of [[Longest Chunked Palindrome Decomposition]] as a separate note because it took me time to solve this question (to always kind of KIM)
	3. Concept of double hashing and the birthday bound formula used in case of rolling hash.. came out of the question [[Longest Chunked Palindrome Decomposition]]
	4. Also note, the 2 techniques for creating rolling hash prefix array - and the wrong one taught to me which is not even used much!!
	5. Generating all the substrings of a given string will require **O(n^3)** time complexity and **O(n^3)** space complexity
	6. A proper excalidraw comparison of 2 worlds of palindrome questions.. one starting from a fixed i and the other one being a variable i (uses Manacher most of the times)
- [ ] [[Longest Chunked Palindrome Decomposition]]
	
	- [ ] Greedy Approach (BF only) (TC - O(n^2), SC - O(1))
	- [x] Greedy + Hashing (TC - O(n), SC - O(n))
	- [ ] Try Recursive approach
	- [ ] Read through its DP optimization
- [ ] [[Last Substring In Lexicographical Order]]
	- [x] Code Max Suffix Algo
	- [ ] Implement my O(n^2) method
	- [x] Note it down?
- [ ] [[Find all distinct palindromic substrings of a given string]]
	- [ ] Implement my approach - hashing + sorting later on
	- [x] There is also this theory that needs to be evaluated: that total number of palindromic substrings in a given string is always **O(n)** !!
	-  Findings:  [[Total number of palindromic substrings in a given string]]
- [ ] [[Count Special Palindromic Substrings]]
	- [x] Manacher Algo variation
	<br/>
	- [ ] Runs Approach implement
		Tried and failed at my method :(
	- [ ] **IMPORTANT**: See how len/2 split formula can be merged into 1.. is there a way to identify this?
- [ ] [[Maximum Palindromic Subarray (Theory)]]
	**trademark theory que**
	- [x] Know all approaches
	- [ ] Center expansion approach (implement)
	- [ ] DP (try this!!)
	- [ ] Rolling Hash + BS (crazy approach, a must implement) <- is this approach even correct??
	- [ ] [[Manacher Algorithm]]
- [ ] [[Minimum Characters For Palindrome]]
	- [x] *No Binary Search Approach*
		there is no BS approach possible here!!
		Instead a Rolling Hash + Linear Search approach does exist !!
		
	- [ ] Rolling Hash + Linear Search 
	- [ ] DP possible??
	- [ ] Z Array approach
	- [ ] KMP Algo approach
	- [x] only LPS array + z array like composition approach **
	- [ ] Manacher algorithm
	- [ ] Make a separate theory note of this question...
	- [ ] And link [[E. Beautiful Palindromes]] & [[Manacher Algorithm]] with it!!
	- [ ] Highlight in excalidraw - the "LPS array in z array style" technique
	- [ ] CHATGPT to find other possible solutions if they exist!!
	- [ ] Just run DSA scraper on word search question to have it in the repo.. I also have a basic after thought on it that I would like to note down..
- [ ] **[Codeforces contest 28/11](https://codeforces.com/contest/2170)**
	
	- [ ] B, recheck and see its domain & test case space
	- [ ] C
	- [ ] D
	- [ ] E
	
	#contest
- [ ] to_string what is the TC of this function?
	
	#byproduct
- [ ] **[Leetcode Contest 23/11](https://leetcode.com/contest/weekly-contest-477/)**
	
	- [ ] Q2 
	- [ ] Q3
	- [ ] Q4
	
	I was able to solve only the first question !!
	
	#contest
- [ ] **[Leetcode Contest 16/11](https://leetcode.com/contest/weekly-contest-476)**
	- [ ] Q3 (coding done, by products remaining)
	- [ ] Q4
	- [ ] Brute force way of Q2
	
	#contest
- [ ] [Codeforces contest 14/11](https://codeforces.com/contest/2169)
	questions to be up-solved
	- [ ] C
	- [ ] D1
	- [ ] D2
	- [ ] E
	
	#contest
- [ ] [[Q3. Count Distinct Integers After Removing Zeros]] ^omfi4g
	A good combinatorics + constructive algo que asked in leetcode contest 16/11
	- [x] Think & refine logic
	- [ ] Look into the suggested chat-gpt approach (open attached note) (This can form another note on the to_string technique to loop through the digits of a given number!!)
	- [ ] Search :: How are powers handled in DSA? (Do we always need to compute them from scratch?)(What is the TC of pow() func?)
	
	#contest
- [ ] **Rolling Hash Formula Mug up**
	- [ ] Get the actual formula of rolling hash and make a note of it
	- [ ] Try implementing [[D. Good Substrings]] using a high modulo value -> this still has integer overflow problem for very big multiplications.. !!!
- [ ] [[D. Good Substrings]]
	**Some Extras (important):**
	- [ ] Double Hashing based approach (See how to have an implementation ready double hashing template)
	- [ ] Look into the **Prefix Trie** based approach suggested! (Look into this when we come to Tries)
- [ ] [17/10 Codeforces Contest](https://codeforces.com/contest/2162) **By-Products**
	- Power Set of calculating subsequences
	- How do I find the MSB of a number in O(1) time? There exists a trick for this part!!
	- Questions left to be done:
	- [x] D interactive que
	- [ ] E (IDK.. raises a new que)
	- [ ] F
	
	#contest
- [ ] [Leetcode Last Contest](https://leetcode.com/contest/weekly-contest-474/)
	**Atleast 2 ques to upsolve for this**
	
	- [ ] Q3 (coding done, by products remaining)
	- [ ] Q4
	
	#contest
- [ ] [[3720. Lexicographically Smallest Permutation Greater Than Target]]
	
	- [x] Tried my approach O(nlogn)
	
	This above approach was unique. it involved using multiset with binary search (upper_bound)
	
	- [ ] Was it easier to code through recursion?
	- [ ] Optimization to O(n)? (recommended approach)
	- [ ] See, **what if the source and target string size would have been different?**
	- [ ] Then move on to the next question
	
	
	followed by
	[[3734. Lexicographically Smallest Palindromic Permutation Greater Than Target]]
	
	#contest
- [ ] [[E. Beautiful Palindromes]]
	
	- [x] I found prerequisite might be: Longest Palindromic Subarray
	- [x] Learn Manacher Algo
	- [x] Learn Hashing + BS approach
	- [x] read editorial
	- [x] See what my solution idea was solving (using manacher)
	- [ ] Implement editorial code
	- [ ] Notemaking - the in-depth nature of a palindrome
	
	#contest
- [ ] **Oct 29 Codechef Contest**
	Atleast Upsolve this question from the codeChef contest
	[[Delete Sorted Subsequence]]
	
	#contest
- [ ] [[Shortest Subsequence]]
	- [x] Understand the approach
	- [x] Implement solution
	- [ ] One intriguing subproblem or edge case that is causing issue & needs to be dealt with
- [ ] [[3733. Minimum Time to Complete All Deliveries]]
	Very interesting binary search question
	- [x] Understand solution (Connect the dots)
	- [x] Implement my solution (my monotonic function)
	- [x] Implement standard solution
	- [ ] Takeaways: Inclusion Exclusion principle? Int overflow method (I am not aware of that thing)!
	
	#contest
- [ ] [[A. K-divisible Sum]]
	- [x] solve the que
	- [ ] understand the shortcut formula suggested in the tutorial (possibly will come handy in future)
- [ ] **New Number Theory Concept**
	Finding root N of a number in logN time complexity
- [ ] **Revisit [[Number of balanced Binary Trees]]**
	- With the fact now I have an idea of how to code, what I was thinking about
	- That approach. may also come out to be DP based
- [ ] **TODO [[0 1 Knapsack]]**
	- Implement the "Value" perspective
	- And note it in excalidraw for sure
- [ ] **Knapsack Problem**
	- DP with O(W) space complexty
	- DP by value, different perspective
	
	Later, there are other advanced CP approaches that I might need to cover..
- [ ] [[Search In Rotated Sorted Array]]
	
	- Try using logn + logn approach
- [ ] Can swap() be used for pointers?
- [ ] **See What went wrong**
	- In Aggresive cows, DP approach attempt
	- The code is being said to be logically incorrect!
- [ ] Link Upper Bound Implementation to STL Q indices
- [ ] [[Insertion & Deletion in BST]]
	
	- [x] Solution implementation
	- [ ] Theory Making
- [ ] [[ZigZag tree]]
	
	- [x] Approach 1 - 2 stacks zigzag traversal
	- [ ] Approach 2 - 1 stack, normal traversal
	- [ ] Excalidraw update?
- [ ] [[Construct Binary Tree from Level-Order Array]]
	
	- [x] App. 1, Implement solution
	- [ ] Try CBT Approach, if possible
	- [ ] Properly test approach 1
	- [ ] Check of CN does it in their main() code


## Cosmetics Left

- [ ] [[Manacher Algorithm]]
	- [x] Learn the flow of algo & pseudo code
	- [x] Essence of algo. Similarity with z?
	- [x] Differences with z
	- [x] Implement Code
	- [ ] Note in notebook
- [ ] **Rabin Karp Algo**
	- [x] Understanding the working
	- [x] Mugging up the code/Implementation
	- [x] Testing Collision for the hash function
	- [x] What if 'A' in Rabin Karp happens (or other characters happen to exist).. will RK algo work still?
	- [ ] Create a note of this in obsidian.. should add anything else as well in this one?
- [ ] **Find MSB of a number in O(1) **
	
	#BitManipulation
- [ ] Check for very short theory notes from 29/10 solving in personal notes
	- [ ] int to long long shortcut technique
	- [ ] prefixSum pre requisite knowledge
- [ ] **Heap** (theory making)
	- Link note PDF
	
	#PriorityQueue
- [ ] **BST Basic Property** (theory making)
	- bottom up property
	- top down property
	- excalidraw?
	
	#BST
- [ ] **Binary Search initial Theory Making**
	- Binary search algo to find ele
	- BS algo for (t, t, t, f, f, f, f, f, f)
	- BS algo for finding peak (or peaks)
- [ ] Whole approach and working of [[Longest Common Subsequence]]
	**Theory Making**
- [ ] [[Construct Tree from postorder & inorder]]
	
	- [x] Implement code solution
	- [ ] TCA analysis - Note making
- [ ] [[Diameter of a BT]]
	
	- Both Unoptimized & optimized sols
	 - Make a theory note of this


## Done

- [ ] [[Longest Common Prefix After Rotation]]
	- [x] solved this question using z array
	- [x] solve this que using KMP algo
	- [x] rollling hash + BS approach implement
	- [x] Brute Force Approach
- [x] [[Z Algorithm]]
	- [x] Understanding flow of algo & pseudo algo
	- [x] analyze different test cases
	- [x] TCA
	- [x] Learn Code & Implement
	- [x] Note in notebook
- [x] **KMP Algo**
	- [x] Evaluate why creation of LPS array (Pie table) is O(m) only (Also look at Abdul's nazaria)
	- [x] Essence of KMP
	- [x] Learning KMP
	- [x] KMP Implementation code
	- [x] KMP write down note book
- [x] **Generate all permutations of a string**
	⭐⭐
	[[Printing all Permutations of a given string]]
	
	#extra
- [x] [[Longest Increasing Subsequence]]**
	- [x] Implement the tabulation method (DP based as well)
	- [x] Understand Binary Search approach
	- [x] Code this approach (It was a good daddy approach)
- [x] [[D. Beautiful Permutation]]
	- [x] Found a way to solve this problem
	- [x] Implemented the code
	Possibly it is exceeding the number of query limit
	
	- [x] Implement the editorial suggested approach (prefix Sum based)
- [x] [[C. Beautiful XOR]]
	codeforces solution
	- [x] guessed the approach
	- [x] logn implementation
	- [x] O(1) implementation
- [x] [[Minimum Count]]
	 - [x] all approaches
	 - [x] root N number theory reference (**Important**)
	 - [x] After word for this question?


***

## Archive

- [x] [[Check BST]]
	
	- [x] Unoptimized Solution
	- [x] Approach 1 (own)
	- [x] App 2: Bottom Up standard sol
	- [x] App 3: Top Down sol
- [x] **Obsidian Config Tasks**
	
	 - [x] Figure out highlighting in PDFs
	 - [x] 2 more scrapers - codechef, codeforces
	 - [x] tagging automation
	 - [x] Git configuration
	 - [x] Graph view coloring
- [x] [[Level order traversal (newline based)]]

%% kanban:settings
```
{"kanban-plugin":"board","list-collapse":[false,false,false,false],"full-list-lane-width":true,"lane-width":350,"move-tags":true,"tag-colors":[{"tagKey":"#BinaryTree","color":"rgba(255, 255, 255, 1)","backgroundColor":"rgba(0, 149, 62, 1)"},{"tagKey":"#cpp","color":"rgba(255, 255, 255, 1)","backgroundColor":"rgba(212, 2, 2, 0.88)"},{"tagKey":"#BST","color":"rgba(255, 255, 255, 1)","backgroundColor":"rgba(0, 189, 79, 1)"},{"tagKey":"#extra","color":"rgba(54, 54, 54, 1)","backgroundColor":"rgba(61, 226, 255, 1)"},{"tagKey":"#contest","color":"rgba(21, 21, 23, 1)","backgroundColor":"rgba(255, 241, 0, 1)"}],"show-relative-date":true,"move-dates":true,"date-display-format":"DD/MM","move-task-metadata":false,"metadata-keys":[{"metadataKey":"tags","label":"","shouldHideLabel":false,"containsMarkdown":false},{"metadataKey":"date_created","label":"created","shouldHideLabel":false,"containsMarkdown":false},{"metadataKey":"solved","label":"","shouldHideLabel":false,"containsMarkdown":false}]}
```
%%