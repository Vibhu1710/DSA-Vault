

### Pseudo Code

![[Screenshot 2025-11-08 at 9.34.10 AM.png]]
In this definitely, the upper and lower boundary conditions are missing in the while loop!




### Manacher algo interesting re-indexing formula

given the processed array, and the original string...

the starting Index of longest Palindromic subarray in the original string goes like:

> [!NOTE] Formula
> - `startingCharIndex = (idx - lenOfPalindrome) / 2`
> - interestingly, `idx - lenOfPalindrome` is always an even number
> - because, for **odd** palindrome.. idx is odd and length is odd
> - and for **even** palindromes, idx is even and length is also even



and returning the longest palindromic substring goes like:
 
 ```cpp
 int idx = max_element(arr.begin(), arr.end()) - arr.begin();
 int lenOfPalindrome = arr[idx];
 int startIndex = (idx - lenOfPalindrome) / 2; // IMPORTANT Formula!!
 
 cout << s.substr(startIndex, lenOfPalindrome) << endl;
 ```