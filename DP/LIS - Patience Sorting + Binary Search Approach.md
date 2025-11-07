Great — let’s **deeply unpack** the `O(n log n)` LIS method (a.k.a. _patience-sorting / tails + binary-search_). I’ll explain the intuition, the invariant you maintain, why the greedy step is correct, a worked example, and how to recover the actual sequence. I’ll also cite compact authoritative references you can read afterwards. [cp-algorithms.com+2Wikipedia+2](https://cp-algorithms.com/dynamic_programming/longest_increasing_subsequence.html?utm_source=chatgpt.com)

---

# 1) Big-picture intuition — piles, or “tails”

Think of the algorithm as playing a simplified card game (patience). You deal numbers one by one and maintain several **piles** laid left → right. Each pile’s _top_ card is the pile’s current maximum (or tail). Rules:

- Place the incoming number on the **leftmost** pile whose top card is **≥** that number (for strictly increasing LIS use `>=` when handling equal values carefully — typical code uses `lower_bound`).
    
- If no such pile exists, **start a new pile on the right**.
    

Key observations:

- Pile count after processing all numbers = length of the **longest increasing subsequence**.
    
- Each pile is strictly increasing from bottom→top? (top is the most recent smaller tail). More importantly, the tops of piles form a **strictly increasing** sequence left→right.
    

Why this helps: keeping pile tops **as small as possible** for each pile-length gives more room (future numbers) to extend subsequences. We only store pile tops (not full sequences) and binary-search them to decide placement — that’s where `O(log n)` comes from. [Wikipedia+1](https://en.wikipedia.org/wiki/Patience_sorting?utm_source=chatgpt.com)

---

# 2) The `tails` array and the invariant (formal)

We implement piles by an array `tails[]` where:

- `tails[len-1]` = _the smallest possible tail value_ of any increasing subsequence of length `len`.
    

Invariant maintained after processing first `i` elements:

- `tails` is strictly increasing.
    
- For every length `k` (1..`tails.size()`), there exists some increasing subsequence of length `k` whose last element is exactly `tails[k-1]`.
    
- `tails[k-1]` is the **minimum possible last element** among all length-`k` increasing subsequences seen so far.
    

This invariant is crucial: smaller tails are strictly better because they make it easier for future numbers to extend that subsequence (a smaller last element leaves more numbers larger than it).

---

# 3) Greedy step + why replace (correctness)

When a new number `x` arrives:

1. Find the **leftmost index** `pos` in `tails` with `tails[pos] >= x` (i.e., `lower_bound`).
    
2. If no such `pos` exists, append `x` (`tails.push_back(x)`).
    
3. Else set `tails[pos] = x` (replace).
    

Why this is safe and optimal:

- Suppose `pos` is the first pile where `tails[pos] >= x`. That means there exists increasing subsequences of length `pos` (ending with `tails[pos-1]`) and `x` can extend length `pos` subsequence if appended to length `pos`-1 subsequence. If `pos` equals `tails.size()`, appending increases max length by 1.
    
- Replacing `tails[pos]` by `x` **improves** (or at least does not worsen) the invariant: it decreases the tail value for subsequences of length `pos+1` (making future extensions easier), while not invalidating any existing subsequence lengths.
    
- You never need to keep a larger tail for the same subsequence length because a smaller tail is strictly better for extensions.
    

Greedy optimality summary:

- Any increasing subsequence of length `L` requires at least `L` piles (each element must go to a different pile because a later larger element cannot be placed on an earlier pile that ends with a smaller top in a conflicting way). So the algorithm’s pile count is a **lower bound** on achievable LIS length.
    
- The algorithm constructs `k` piles where `k` is achievable as an LIS (you can show there exists an increasing subsequence of length `k`). Therefore the number of piles equals LIS length. (See the formal greedy proof in patience-sorting references.) [Wikipedia+1](https://en.wikipedia.org/wiki/Patience_sorting?utm_source=chatgpt.com)