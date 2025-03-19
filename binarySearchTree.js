
class TreeNode {
    constructor(value) {
        this.val = value;
        this.left = null;
        this.right = null;
    };
};



class BinaryTree {

    #root = null;
    #compare = null;

    constructor(array=null, comparator=null) {
        this.#root = null;
        this.#compare = comparator;
    };


    get root() {
        return this.#root;
    };


    get comparator() {
        this.#compare;
    };


    #mergeSort(array, removeDuplicates=false, compare=null) {
        if (array.length <= 1) {
            return array;
        }

        const mid = Math.floor(array.length/2);

        const left = this.#mergeSort(array.slice(0, mid), removeDuplicates, compare);
        const right = this.#mergeSort(array.slice(mid, array.length), removeDuplicates, compare);

        return this.#merge(left, right, removeDuplicates, compare);
    };


    #merge(left, right, removeDuplicates, compare) {
        const sortedArray = [];

        let leftIdx = 0;
        let rightIdx = 0;

        while (leftIdx < left.length && rightIdx < right.length) {
            const leftValue = left[leftIdx];
            const rightValue = right[rightIdx];

            if (compare !== null) {
                const result = compare(leftValue, rightValue);
                if (result === 0 && removeDuplicates) {
                    sortedArray.push(leftValue);
                    leftIdx += 1;
                    rightIdx += 1;
                } else if (result <= 0) {
                    sortedArray.push(leftValue);
                    leftIdx += 1;
                } else if (result > 0) {
                    sortedArray.push(rightValue);
                    rightIdx += 1;
                }
                continue;
            } 

            if (leftValue === rightValue && removeDuplicates) {
                sortedArray.push(leftValue);
                leftIdx += 1;
                rightIdx += 1;
            } else if (leftValue <= rightValue) {
                sortedArray.push(leftValue);
                leftIdx += 1;
            } else {
                sortedArray.push(rightValue);
                rightIdx += 1;
            }
        }

        if (leftIdx < left.length) {
            for (let i = leftIdx; i < left.length; i += 1) {
                sortedArray.push(left[i]);
            }
        } else if (rightIdx < right.length) {
            for (let i = rightIdx; i < right.length; i += 1) {
                sortedArray.push(right[i]);
            }
        }

        return sortedArray;
    };


    buildTree(array) {
        const sortedArray = this.#mergeSort(array, true, this.#compare);
        this.#root = this.#buildTreeRecursive(sortedArray, 0, sortedArray.length - 1);
        return this.#root;
    };


    #buildTreeRecursive(array, start, end) {
        if (start > end) {
            return null;
        }

        const mid = start + Math.floor((end - start) / 2);
        const node = new TreeNode(array[mid]);
        
        node.left = this.#buildTreeRecursive(array, start, mid - 1);
        node.right = this.#buildTreeRecursive(array, mid + 1, end);

        return node;
    };


    prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
    if (node.left !== null) {
        this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
    };

    print() {
        this.prettyPrint(this.#root)
    }
     
};


const tree = new BinaryTree();

const array = [2, 6, 1, 34, 7, 5, 9, 3, 1, 1, 1, 11, 1, 7, 4, 5];
let root = tree.buildTree(array)

