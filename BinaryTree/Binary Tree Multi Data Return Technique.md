
BinaryTree traversal questions, where there are more than 2 return items.. 
usually involve using a custom class for storing data (this is the customary way) ^p5phiu


- If not, this ends up being O(n * h) TC question
-  My earlier approach, involved using reference variables (but this is not scalable, can be used as a short hand though wherever possible).. here I observed I end up using only that variable in reference which is usually the answer. This variable is single value no matter we are **digging into** or **coming out** of the BT. For instance, max value throughout the tree, a bool variable that becomes false if a condition is not met even once.
  
#### Such Questions
- [[Diameter of a BT]]
- [[Check BST]]
- [[Insertion & Deletion in BST]]