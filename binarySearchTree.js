import Deque from "linked-deque";


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
    #defaultComparator = function(a, b) {
        if (a === b) {
            return 0;
        } else if (a < b) {
            return -1;
        } else {
            return 1;
        }
    };

    constructor(comparator=this.#defaultComparator) {
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
    };
     

    insert(value) {
        if (this.#root === null) {
            this.#root = new TreeNode(value);
            return true;
        }
        return this.#insertVal(this.#root, value);
    };


    #insertVal(node, value) {
        const result = this.#compare(value, node.val);
        if (result === 0) {
            return false;
        }
        if (node.left === null && result < 0) {
            node.left = new TreeNode(value);
            return true;
        }
        if (node.right === null && result > 0) {
            node.right = new TreeNode(value);
            return true;
        }

        if (result < 0) {
            return this.#insertVal(node.left, value);
        } else {
            return this.#insertVal(node.right, value);
        }
    };


    remove(value) {
        if (this.#root === null) {
            return false;
        }
        if (this.#compare(value, this.#root.val) === 0) {
            this.#root = this.#deleteNode(this.#root);
            return true;
        }

        return this.#removeVal(this.#root, value);
    };


    #removeVal(node, value) {
        if (node === null) {
            return false;
        }
        if (node.left !== null && this.#compare(value, node.left.val) === 0) {
            node.left = this.#deleteNode(node.left);
            return true;
        }
        if (node.right !== null && this.#compare(value, node.right.val) === 0) {
            node.right = this.#deleteNode(node.right);
            return true;
        }
        
        const result = this.#compare(value, node.val);

        if (result < 0) {
            return this.#removeVal(node.left, value);
        } else {
            return this.#removeVal(node.right, value);
        }
    };


    #deleteNode(node) {
        if (node.left === null && node.right === null) {
            return null;
        }
        if (node.left === null && node.right !== null) {
            return node.right;
        }
        if (node.right === null && node.left !== null) {
            return node.left;
        }

        node.val = this.#swapVal(node.right, node);
        return node;
    };


    #swapVal(node, prev) {
        let firstNode = true;
        while (node.left !== null) {
            prev = node;
            node = node.left;
            firstNode = false;
        }

        if (firstNode) {
            prev.right = node.right;
        } else {
            prev.left = node.right;
        }
        return node.val;
    };


    find(value) {
        return this.#findVal(this.#root, value);
    };


    #findVal(node, value) {
        if (node === null) {
            return null;
        }

        const result = this.#compare(value, node.val);
        if (result === 0) {
            return node;
        }

        if (result < 0) {
            return this.#findVal(node.left, value);
        } else {
            return this.#findVal(node.right, value);
        }
    };


    levelOrder(callback) {
        if (typeof callback !== "function") {
            throw new TypeError("A callback function must be supplied");
        }
        if (this.#root === null) {
            return;
        }

        const deque = new Deque([this.#root]);

        while (deque.length > 0) {
            const current = deque.popleft();

            callback(current.val);

            if (current.left !== null) {
                deque.push(current.left);
            }
            if (current.right !== null) {
                deque.push(current.right);
            }
        }
    };


    inOrder(callback) {
        if (typeof callback !== "function") {
            throw new TypeError("A callback function must be supplied");
        }

        this.#inOrderTraverse(this.#root, callback);
    };


    #inOrderTraverse(node, callback) {
        if (node === null) {
            return;
        }

        this.#inOrderTraverse(node.left, callback);
        callback(node.val);
        this.#inOrderTraverse(node.right, callback);
    };
};


const tree = new BinaryTree();

const array = [2, 6, 1, 34, 7, 5, 9, 3, 1, 1, 1, 11, 1, 7, 4, 5];
tree.buildTree(array)
// tree.print()
// console.log(tree.insert(5))
// tree.insert(10)
// tree.insert(9)
// tree.insert(8)
// tree.insert(11)
// tree.insert(12)
tree.print()
tree.remove(5)
tree.print()

tree.inOrder(function(val) {
    console.log(val);
});
