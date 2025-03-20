import BinaryTree from "./binarySearchTree.js";



function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};


function createRandomNumArray() {
    const array = [];
    const length = randInt(25, 50);
    for (let i = 0; i < length; i += 1) {
        array.push(randInt(0, 99));
    }
    return array;
};


function logValue(value) {
    console.log(value);
};


function printSpace() {
    console.log("\n");
};


function main() {
    const array = createRandomNumArray();
    const tree = new BinaryTree();

    tree.buildTree(array);
    console.log(tree.isBalanced());
    printSpace();
    // tree.print();

    printSpace();
    tree.levelOrder(logValue);
    printSpace();
    tree.inOrder(logValue);
    printSpace();
    tree.preOrder(logValue);
    printSpace();
    tree.postOrder(logValue);
    printSpace();

    tree.insert(101);
    tree.insert(153);
    tree.insert(132);
    tree.insert(122);
    tree.insert(187);

    // tree.print();
    printSpace();
    console.log(tree.isBalanced());
    printSpace();
    tree.rebalance();
    // tree.print();
    printSpace();
    console.log(tree.isBalanced());
    printSpace();

    tree.levelOrder(logValue);
    printSpace();
    tree.inOrder(logValue);
    printSpace();
    tree.preOrder(logValue);
    printSpace();
    tree.postOrder(logValue);
    printSpace();
};

main();