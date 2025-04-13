import {NodeType} from "./NodeType.ts";
import {TreeNodeInterface} from "./TreeNodeInterface.ts";

export interface TreeInterface {
    id: string;
    title: string;
    description: string;
    labels: string[];
    users: string[];
    children: TreeNodeInterface[];
}

export const DEFAULT_TREE: TreeInterface[] = [
    {
        id: '1',
        title: 'Tree 1',
        description: 'Sample tree 1',
        labels: [],
        users: [],
        children: [
            {
                title: 'Node A1',
                description: 'Child of tree 1',
                depth: 0,
                type: NodeType.DEFAULT,
                children: []
            },
            {
                title: 'Node A2',
                description: 'Second child of tree 1',
                depth: 0,
                type: NodeType.FLAG,
                children: []
            }
        ]
    },
    {
        id: '2',
        title: 'Tree 2',
        description: 'Sample tree 2',
        labels: [],
        users: [],
        children: [
            {
                title: 'Node B1',
                description: 'Child of tree 2',
                depth: 0,
                type: NodeType.DEFAULT,
                children: []
            }
        ]
    },
    {
        id: '3',
        title: 'Tree 3',
        description: 'Sample tree 3',
        labels: [],
        users: [],
        children: [
            {
                title: 'Node C1',
                description: 'Node in tree 3',
                depth: 0,
                type: NodeType.DEFAULT,
                children: [
                    {
                        title: 'Node C1.1',
                        description: 'Nested node',
                        depth: 1,
                        type: NodeType.FLAG,
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: '4',
        title: 'Tree 4',
        description: 'Tree with multiple layers',
        labels: [],
        users: [],
        children: [
            {
                title: 'Node D1',
                description: 'Child 1',
                depth: 0,
                type: NodeType.DEFAULT,
                children: []
            },
            {
                title: 'Node D2',
                description: 'Child 2',
                depth: 0,
                type: NodeType.DEFAULT,
                children: []
            }
        ]
    },
    {
        id: '5',
        title: 'Tree 5',
        description: 'Another sample tree',
        labels: [],
        users: [],
        children: []
    },
    {
        id: '6',
        title: 'Tree 6',
        description: 'Empty tree',
        labels: [],
        users: [],
        children: []
    },
    {
        id: '7',
        title: 'Tree 7',
        description: 'Tree with a flagged node',
        labels: [],
        users: [],
        children: [
            {
                title: 'Node G1',
                description: 'Important node',
                depth: 0,
                type: NodeType.FLAG,
                children: []
            }
        ]
    },
    {
        id: '8',
        title: 'Tree 8',
        description: 'Another example',
        labels: [],
        users: [],
        children: []
    },
    {
        id: '9',
        title: 'Tree 9',
        description: 'Simple structure',
        labels: [],
        users: [],
        children: [
            {
                title: 'Node I1',
                description: 'Just one node',
                depth: 0,
                type: NodeType.DEFAULT,
                children: []
            }
        ]
    },
    {
        id: '10',
        title: 'Tree 10',
        description: 'Midpoint tree',
        labels: [],
        users: [],
        children: []
    },
    {
        id: '11',
        title: 'Tree 11',
        description: 'Eleventh tree',
        labels: [],
        users: [],
        children: []
    },
    {
        id: '12',
        title: 'Tree 12',
        description: 'Sample description',
        labels: [],
        users: [],
        children: []
    },
    {
        id: '13',
        title: 'Tree 13',
        description: 'Tree with nested children',
        labels: [],
        users: [],
        children: [
            {
                title: 'Node M1',
                description: 'First level',
                depth: 0,
                type: NodeType.DEFAULT,
                children: [
                    {
                        title: 'Node M1.1',
                        description: 'Second level',
                        depth: 1,
                        type: NodeType.FLAG,
                        children: []
                    }
                ]
            }
        ]
    },
    {
        id: '14',
        title: 'Tree 14',
        description: 'Multi-node tree',
        labels: [],
        users: [],
        children: [
            {
                title: 'Node N1',
                description: 'Node N1',
                depth: 0,
                type: NodeType.DEFAULT,
                children: []
            },
            {
                title: 'Node N2',
                description: 'Node N2',
                depth: 0,
                type: NodeType.FLAG,
                children: []
            }
        ]
    },
    {
        id: '15',
        title: 'Tree 15',
        description: 'Fifteenth tree',
        labels: [],
        users: [],
        children: []
    },
    {
        id: '16',
        title: 'Tree 16',
        description: 'Minimal tree',
        labels: [],
        users: [],
        children: []
    },
    {
        id: '17',
        title: 'Tree 17',
        description: 'Tree with complex nesting',
        labels: [],
        users: [],
        children: [
            {
                title: 'Node Q1',
                description: 'Level 0',
                depth: 0,
                type: NodeType.DEFAULT,
                children: [
                    {
                        title: 'Node Q1.1',
                        description: 'Level 1',
                        depth: 1,
                        type: NodeType.DEFAULT,
                        children: [
                            {
                                title: 'Node Q1.1.1',
                                description: 'Level 2',
                                depth: 2,
                                type: NodeType.FLAG,
                                children: []
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: '18',
        title: 'Tree 18',
        description: 'Basic sample',
        labels: [],
        users: [],
        children: []
    },
    {
        id: '19',
        title: 'Tree 19',
        description: 'Simple tree',
        labels: [],
        users: [],
        children: []
    },
    {
        id: '20',
        title: 'Tree 20',
        description: 'Final example tree',
        labels: [],
        users: [],
        children: []
    }
];
