
![[Screenshot 2025-11-15 at 3.23.15 PM.png]]

This is one of the rolling hash for us..
using total is interesting here.. but GPT says it is not safe because integer overflow beyond 64 bit is still likely to occur..


And then there is this being talked about:

```
pref[x] = hash of s[0..x-1]
hash(s[l..r]) = pref[r+1] - pref[l] * p^(r-l+1)
```




- There is an unsigned long long based approach that needs to be evaluated..
