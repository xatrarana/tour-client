class TreeNode<T> {
    item: T;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;

    constructor(item: T){
        this.item = item;
        this.left = null;
        this.right = null;
    }
}

export class BinarySearchTree<T extends {_id: string}> {
    root: TreeNode<T> | null;

    constructor(){
        this.root = null;
    }
    insert(item: T){
        const newNode = new TreeNode<T>(item);
        if(!this.root){
            this.root = newNode;
        }else {
            this.insertNode(this.root, newNode);
        }
    }
    private insertNode(node: TreeNode<T>, newNode: TreeNode<T>){
        if (newNode.item._id.localeCompare(node.item._id) < 0) {
            if (!node.left) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (!node.right) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    search(id: string): T | null {
        return this.searchNode(this.root, id);
    }

    private searchNode(node: TreeNode<T> | null, id: string): T | null {
        if (!node) return null;
        if (node.item._id === id) return node.item;
        if (id < node.item._id) {
            return this.searchNode(node.left, id);
        } else {
            return this.searchNode(node.right, id);
        }
    }
}