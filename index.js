import { prettyPrint, Tree } from "./tree.js";

const array = [1, 2, 5, 4, 2, 5, 7, 4, 2, 10, 2, 57, 8, 43, 43];
const tree = new Tree(array);

prettyPrint(tree.root);
