
```cpp
#define ll long long

#define M (ll)(1e9 + 7)

  

ll mod(ll a){return ((a%M + M ) % M);}

ll add(ll a, ll b){ return mod(mod(a) + mod(b));}

ll mul(ll a, ll b){ return mod(mod(a) * mod(b));}

ll sub(ll a, ll b){ return mod(mod(a) - mod(b) + M);}
```
