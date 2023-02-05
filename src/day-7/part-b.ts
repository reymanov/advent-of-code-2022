// Day 7 - No Space Left On Device
// https://adventofcode.com/2022/day/7

import fs from 'fs';
import path from 'path';

interface TreeNode {
    name: string;
    isDirectory: boolean;
    children: TreeNode[];
    parent?: TreeNode;
    size?: number;
}

const lines = fs
    .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8')
    .replace(/\r/g, '')
    .trim()
    .split('\n');

const createTree = (lines: string[]): TreeNode => {
    const tree: TreeNode = {
        name: '/',
        isDirectory: true,
        children: [],
    };

    let currentNode: TreeNode = tree;
    let currentCommand: string | null = null;

    for (const line of lines) {
        if (line[0] === '$') {
            const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line);
            if (!match) {
                throw new Error('Unable to parse command');
            }

            currentCommand = match!.groups!.command;

            if (currentCommand === 'cd') {
                const target = match!.groups!.arg;
                switch (target) {
                    case '/':
                        currentNode = tree;
                        break;
                    case '..':
                        currentNode = currentNode.parent || tree;
                        break;
                    default:
                        currentNode =
                            currentNode.children.find(
                                folder => folder.isDirectory && folder.name === target
                            ) || tree;
                }
            }
        } else {
            if (currentCommand === 'ls') {
                const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line);
                if (fileMatch) {
                    const node: TreeNode = {
                        name: fileMatch!.groups!.name,
                        size: parseInt(fileMatch!.groups!.size, 10),
                        isDirectory: false,
                        parent: currentNode,
                        children: [],
                    };
                    currentNode.children.push(node);
                }
                const dirMatch = /^dir (?<name>.+)$/.exec(line);
                if (dirMatch) {
                    const node: TreeNode = {
                        name: dirMatch!.groups!.name,
                        isDirectory: true,
                        children: [],
                        parent: currentNode,
                    };
                    currentNode.children.push(node);
                }
            } else {
                throw new Error('Unknown state');
            }
        }
    }

    return tree;
};

const getSize = (
    node: TreeNode,
    directoryCallback: (name: string, size: number) => void = () => {}
): number => {
    if (!node.isDirectory) {
        return node.size || 0;
    }
    const directorySize = node.children
        .map(child => getSize(child, directoryCallback))
        .reduce((a, b) => a + b, 0);

    directoryCallback(node.name, directorySize);

    return directorySize;
};

const getAnswer = () => {
    const totalDiskSpace = 70000000;
    const requiredSpace = 30000000;

    const tree = createTree(lines);

    const usedSpace = getSize(tree);
    const availableSpace = totalDiskSpace - usedSpace;
    if (availableSpace > requiredSpace) {
        throw new Error('There is already enough space');
    }
    const minimumFolderSize = requiredSpace - availableSpace;

    const candidates: { name: string; size: number }[] = [];

    getSize(tree, (name, size) => {
        if (size >= minimumFolderSize) {
            candidates.push({
                name,
                size,
            });
        }
    });

    candidates.sort((a, b) => a.size - b.size);

    return candidates[0].size;
};

const result = getAnswer();
console.log(result);
