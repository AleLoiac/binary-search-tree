import { prettyPrint, Tree } from "./tree.js";

const randomArray = () => {
  const array = [];
  for (let i = 0; i < Math.floor(Math.random() * 100); i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
};

const tree = new Tree(randomArray());

console.log(tree.isBalanced());

const levelOrderArray = [];
tree.levelOrder((node) => levelOrderArray.push(node.data));
console.log("Level Order:", levelOrderArray);

const preOrderArray = [];
tree.preOrder((node) => preOrderArray.push(node.data));
console.log("Preorder:", preOrderArray);

const inOrderArray = [];
tree.inOrder((node) => inOrderArray.push(node.data));
console.log("Inorder:", inOrderArray);

const postOrderArray = [];
tree.postOrder((node) => postOrderArray.push(node.data));
console.log("Postorder:", postOrderArray);

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

const levelOrderArray2 = [];
tree.levelOrder((node) => levelOrderArray.push(node.data));
console.log("Level Order:", levelOrderArray);

const preOrderArray2 = [];
tree.preOrder((node) => preOrderArray.push(node.data));
console.log("Preorder:", preOrderArray);

const inOrderArray2 = [];
tree.inOrder((node) => inOrderArray.push(node.data));
console.log("Inorder:", inOrderArray);

const postOrderArray2 = [];
tree.postOrder((node) => postOrderArray.push(node.data));
console.log("Postorder:", postOrderArray);

prettyPrint(tree.root);
