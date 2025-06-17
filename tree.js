import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = array.sort(this.#compareNumbers);
    const sortDuplArr = this.#removeDuplicates(sortedArray);
    const root = this.#sortedArraytoBSTRecur(
      sortDuplArr,
      0,
      sortDuplArr.length - 1
    );

    return root;
  }

  #compareNumbers(a, b) {
    return a - b;
  }

  #removeDuplicates(array) {
    const arrCopy = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i] !== array[i + 1]) {
        arrCopy.push(array[i]);
      }
    }

    return arrCopy;
  }

  #sortedArraytoBSTRecur(arr, start, end) {
    if (start > end) {
      return null;
    }

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(arr[mid]);

    root.left = this.#sortedArraytoBSTRecur(arr, start, mid - 1);
    root.right = this.#sortedArraytoBSTRecur(arr, mid + 1, end);

    return root;
  }

  insert(value) {
    let currNode = this.root;
    let parent = null;

    while (currNode !== null) {
      parent = currNode;

      if (currNode.data > value) {
        currNode = currNode.left;
      } else if (currNode.data < value) {
        currNode = currNode.right;
      } else {
        return;
      }
    }

    const newNode = new Node(value);

    if (parent.data > value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
  }

  deleteItem(value) {
    let currNode = this.root;
    let parent = null;

    while (currNode !== null && currNode.data !== value) {
      parent = currNode;

      if (currNode.data > value) {
        currNode = currNode.left;
      } else if (currNode.data < value) {
        currNode = currNode.right;
      }
    }

    if (!currNode) {
      return;
    }

    // No children
    if (!currNode.right && !currNode.left) {
      if (!parent) {
        this.root = null;
      } else if (parent.data > value) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    }

    // One child
    else if (!currNode.right || !currNode.left) {
      const child = currNode.left ? currNode.left : currNode.right;

      if (!parent) {
        this.root = child;
      } else if (parent.data > value) {
        parent.left = child;
      } else {
        parent.right = child;
      }
    }

    // Two children
    else {
      let temp = currNode.right;
      let p = null;

      while (temp.left !== null) {
        p = temp;
        temp = temp.left;
      }

      if (p !== null) {
        p.left = temp.right;
      } else {
        currNode.right = temp.right;
      }

      currNode.data = temp.data;
    }
  }

  find(value) {
    let currNode = this.root;

    while (currNode !== null) {
      if (value === currNode.data) {
        return currNode;
      } else if (value > currNode.data) {
        currNode = currNode.right;
      } else {
        currNode = currNode.left;
      }
    }

    return false;
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function!");
    }

    if (!this.root) {
      return;
    }

    const queue = [];

    queue.push(this.root);

    while (queue.length > 0) {
      callback(queue[0]);
      if (queue[0].left !== null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right !== null) {
        queue.push(queue[0].right);
      }
      queue.shift();
    }
  }

  levelOrderRecursive(callback) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function!");
    }

    if (!this.root) {
      return;
    }

    const queue = [this.root];

    function recurse(queue) {
      if (queue.length === 0) {
        return;
      }

      const node = queue.shift();
      callback(node);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
      recurse(queue);
    }
    recurse(queue);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function!");
    }

    function recurse(root) {
      if (root === null) {
        return;
      }
      callback(root);
      if (root.left !== null) {
        recurse(root.left);
      }
      if (root.right !== null) {
        recurse(root.right);
      }
    }
    recurse(this.root);
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function!");
    }

    function recurse(root) {
      if (root === null) {
        return;
      }
      if (root.left !== null) {
        recurse(root.left);
      }
      callback(root);
      if (root.right !== null) {
        recurse(root.right);
      }
    }
    recurse(this.root);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Parameter is not a function!");
    }

    function recurse(root) {
      if (root === null) {
        return;
      }
      if (root.left !== null) {
        recurse(root.left);
      }
      if (root.right !== null) {
        recurse(root.right);
      }
      callback(root);
    }
    recurse(this.root);
  }

  heigth(value) {
    const startingNode = this.find(value);

    if (!startingNode) {
      return -1;
    }

    function recurse(node) {
      if (!node) {
        return 0;
      }

      return Math.max(recurse(node.left), recurse(node.right)) + 1;
    }

    return recurse(startingNode);
  }
}

export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
