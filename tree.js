import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    this.root = buildTree(array);
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
}

function buildTree(array) {
  const sortedArray = array.sort(compareNumbers);
  const sortDuplArr = removeDuplicates(sortedArray);
  const root = sortedArraytoBSTRecur(sortDuplArr, 0, sortDuplArr.length - 1);

  console.log(sortDuplArr);

  return root;
}

function compareNumbers(a, b) {
  return a - b;
}

function removeDuplicates(array) {
  const arrCopy = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== array[i + 1]) {
      arrCopy.push(array[i]);
    }
  }

  return arrCopy;
}

function sortedArraytoBSTRecur(arr, start, end) {
  if (start > end) {
    return null;
  }

  let mid = start + Math.floor((end - start) / 2);
  let root = new Node(arr[mid]);

  root.left = sortedArraytoBSTRecur(arr, start, mid - 1);
  root.right = sortedArraytoBSTRecur(arr, mid + 1, end);

  return root;
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
