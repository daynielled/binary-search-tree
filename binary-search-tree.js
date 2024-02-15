class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while(true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        //if the value already exists, do nothing
        return this;
      }
    }
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val) {
  const newNode = new Node(val);

  const recursiveInsert = (node) => {
    if (!node) {
      return newNode;
    }
    if (val < node.val) {
      node.left = recursiveInsert(node.left);
    } else if (val > node.val) {
      node.right = recursiveInsert(node.right);
    }
    return node;
  };
  this.root = recursiveInsert(this.root);
  return this;

    }

  


  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.val === val) return currentNode;
      if (val < currentNode.val) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right;
      }
    }
    return undefined; //Return null if the value is not found in the tree
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val) {
    const findNode = (node, target) => {
      if (!node){
        return undefined; //Value not found
      }
      if(node.val === target){
        return node; //Value found
      } else if(target < node.val) {
        return findNode(node.left, target);
      } else {
        return findNode(node.right, target);
      }
    };
    return findNode(this.root, val)

  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
   const visitedNodes=[];

   const traverse = (node) =>{
    if(!node) return; // Base case: Stop if the node is null

    visitedNodes.push(node.val); // Visit the current node

    traverse(node.left);// Traverse left subtree
    traverse(node.right); // Traverse right subtree
    
   };
   traverse(this.root); // Start traversal from the root node
   return visitedNodes;

  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    const visitedNodes=[];

   const traverse = (node) =>{
    if(!node) return; // Base case: Stop if the node is null

    traverse(node.left);// Traverse left subtree
    visitedNodes.push(node.val); // Visit the current node
    traverse(node.right); // Traverse right subtree
    
   };
   traverse(this.root); // Start traversal from the root node
   return visitedNodes;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    const visitedNodes=[];

    const traverse = (node) =>{
     if(!node) return; // Base case: Stop if the node is null
 
     traverse(node.left);// Traverse left subtree
     traverse(node.right); // Traverse right subtree
     visitedNodes.push(node.val); // Visit the current node
     
    };
    traverse(this.root); // Start traversal from the root node
    return visitedNodes;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const visitedNodes = [];
    const queue = [];

    if(this.root) {
      queue.push(this.root); // Enqueue the root node
    }

    while (queue.length > 0) {
      const currentNode = queue.shift(); // Dequeue the first node in the queue
      visitedNodes.push(currentNode.val); // Visit the dequeed node

      // Enqueue the left and the right children if they exist
      if(currentNode.left) {
        queue.push(currentNode.left);
      }
      if(currentNode.right) {
        queue.push(currentNode.right)
      }
    }
    return visitedNodes;
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let nodeToRemove = this.root;
    let parent;

    while (nodeToRemove.val !== val) {
      parent = nodeToRemove;
      if (val < nodeToRemove.val) {
        nodeToRemove = nodeToRemove.left;
      } else {
        nodeToRemove = nodeToRemove.right;
      }
    }

    if (nodeToRemove !== this.root) {
      if (nodeToRemove.left === null && nodeToRemove.right === null) {
        if (parent.left === nodeToRemove) {
          parent.left = null;
        } else {
          parent.right = null;
        }
      } else if (nodeToRemove.left !== null && nodeToRemove.right !== null) {
        let rightParent = nodeToRemove;
        let right = nodeToRemove.right;
        if (right.left === null) {
          right.left = nodeToRemove.left;
          if (parent.left === nodeToRemove) {
            parent.left = right;
          } else {
            parent.right = right;
          }
        } else {
          while (right.left !== null) {
            rightParent = right;
            right = right.left;
          }
          if (parent.left === nodeToRemove) {
            parent.left.val = right.val;
          } else {
            parent.right.val = right.val;
          }
          if (right.right !== null) {
            rightParent.left = right.right;
          } else {
            rightParent.left = null;
          }
        }
      } else {
        if (parent.left === nodeToRemove) {
          if (nodeToRemove.right === null) {
            parent.left = nodeToRemove.left;
          } else {
            parent.left = nodeToRemove.right;
          }
        } else {
          if (nodeToRemove.right === null) {
            parent.right = nodeToRemove.left;
          } else {
            parent.right = nodeToRemove.right;
          }
        }
      }
    }
    return nodeToRemove;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const getHeight = (node) => {
      if (!node) {
          return 0; // Height of null node is 0
      }
      // Calculate height of left and right subtrees recursively
      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);
      // Return the maximum height of the subtrees plus 1 (for the current node)
      return Math.max(leftHeight, rightHeight) + 1;
  };

  const checkBalance = (node) => {
      if (!node) {
          return true; // An empty tree is balanced
      }
      // Calculate the height difference between the left and right subtrees
      const heightDiff = Math.abs(getHeight(node.left) - getHeight(node.right));
      // Check if the subtree is balanced and recursively check its children
      return heightDiff <= 1 && checkBalance(node.left) && checkBalance(node.right);
  };

  return checkBalance(this.root); // Check balance starting from the root node
  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      return undefined; // BST is empty or has only one node
  }

  let secondHighest = undefined;
  let current = this.root;

  while (current.right) {
      if (!current.right.left && !current.right.right) {
          secondHighest = current.val; // Current node is the parent of the highest node
          break;
      }
      current = current.right;
  }

  if (!secondHighest && current.left) {
      secondHighest = current.left.val; // If there is no right child, return the parent of the highest node
  }

  return secondHighest;
  }
}

module.exports = BinarySearchTree;
