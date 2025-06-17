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

    if (!currNode.right && !currNode.left) {
      if (parent.data > value) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (!currNode.right || !currNode.left) {
      if (parent.data > value) {
        parent.left = currNode.left;
      } else {
        parent.right = currNode.right;
      }
    } else {
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
