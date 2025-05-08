import {NodeType} from "./NodeType.ts";
import {TreeNodeInterface} from "./TreeNodeInterface.ts";
import {UserInterface} from "./UserInterface.ts";

export interface TreeInterface {
    id: number;
    createdBy: string;
    title: string;
    description: string;
    labels: LabelInterface[];
    users: UserInterface[];
    children: TreeNodeInterface[];
}

export interface LabelInterface {
    id: string;
    labelKey: string;
    value: string;
}

export const DEFAULT_TREE: TreeInterface = {
    id: 1,
    createdBy: 'Noskov Oleh',
    title: 'Sample Tree',
    description: 'A tree with up to 5 levels of nested children',
    labels: [
        { id: '1', labelKey: 'Category', value: 'Example' }
    ],
    users: [],
    children: [
        {
            id: 0,
            title: 'Node 1',
            description: 'Level 0 node',
            depth: 1,
            type: NodeType.DEFAULT,
            children: [
                {
                    id: 1,
                    title: 'Node 1.1',
                    description: 'Level 1 node',
                    depth: 2,
                    type: NodeType.DEFAULT,
                    children: [
                        {
                            id: 2,
                            title: 'Node 1.1.1',
                            description: 'Level 2 node',
                            depth: 3,
                            type: NodeType.DEFAULT,
                            children: [
                                {
                                    id: 3,
                                    title: 'Node 1.1.1.1',
                                    description: 'Level 3 node',
                                    depth: 4,
                                    type: NodeType.DEFAULT,
                                    children: [
                                        {
                                            id: 5,
                                            title: 'Node 1.1.1.1.1',
                                            description: 'Level 4 node (max depth)',
                                            depth: 4,
                                            type: NodeType.FLAG,
                                            children: []
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: 2,
            title: 'Node 2',
            description: 'Another Level 0 node',
            depth: 0,
            type: NodeType.FLAG,
            children: []
        }
    ]
};

// export const DEFAULT_TREE: TreeInterface[] = [
//     {
//         id: 1,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 1',
//         description: 'Sample tree 1',
//         labels: [{id: '1', labelKey: 'Label 1', value: 'Value 1'}, {id: '2', labelKey: 'Label 2', value: 'Value 2'}],
//         users: [],
//         children: [
//             {
//                 title: 'Node A1',
//                 description: 'Child of tree 1',
//                 depth: 0,
//                 type: NodeType.DEFAULT,
//                 children: []
//             },
//             {
//                 title: 'Node A2',
//                 description: 'Second child of tree 1',
//                 depth: 0,
//                 type: NodeType.FLAG,
//                 children: []
//             }
//         ]
//     },
//     {
//         id: 2,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 2',
//         description: 'Sample tree 2',
//         labels: [],
//         users: [],
//         children: [
//             {
//                 title: 'Node B1',
//                 description: 'Child of tree 2',
//                 depth: 0,
//                 type: NodeType.DEFAULT,
//                 children: []
//             }
//         ]
//     },
//     {
//         id: 3,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 3',
//         description: 'Sample tree 3',
//         labels: [],
//         users: [],
//         children: [
//             {
//                 title: 'Node C1',
//                 description: 'Node in tree 3',
//                 depth: 0,
//                 type: NodeType.DEFAULT,
//                 children: [
//                     {
//                         title: 'Node C1.1',
//                         description: 'Nested node',
//                         depth: 1,
//                         type: NodeType.FLAG,
//                         children: []
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: 4,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 4',
//         description: 'Tree with multiple layers',
//         labels: [],
//         users: [],
//         children: [
//             {
//                 title: 'Node D1',
//                 description: 'Child 1',
//                 depth: 0,
//                 type: NodeType.DEFAULT,
//                 children: []
//             },
//             {
//                 title: 'Node D2',
//                 description: 'Child 2',
//                 depth: 0,
//                 type: NodeType.DEFAULT,
//                 children: []
//             }
//         ]
//     },
//     {
//         id: 5,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 5',
//         description: 'Another sample tree',
//         labels: [],
//         users: [],
//         children: []
//     },
//     {
//         id: 6,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 6',
//         description: 'Empty tree',
//         labels: [],
//         users: [],
//         children: []
//     },
//     {
//         id: 7,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 7',
//         description: 'Tree with a flagged node',
//         labels: [],
//         users: [],
//         children: [
//             {
//                 title: 'Node G1',
//                 description: 'Important node',
//                 depth: 0,
//                 type: NodeType.FLAG,
//                 children: []
//             }
//         ]
//     },
//     {
//         id: 8,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 8',
//         description: 'Another example',
//         labels: [],
//         users: [],
//         children: []
//     },
//     {
//         id: 9,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 9',
//         description: 'Simple structure',
//         labels: [],
//         users: [],
//         children: [
//             {
//                 title: 'Node I1',
//                 description: 'Just one node',
//                 depth: 0,
//                 type: NodeType.DEFAULT,
//                 children: []
//             }
//         ]
//     },
//     {
//         id: 10,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 10',
//         description: 'Midpoint tree',
//         labels: [],
//         users: [],
//         children: []
//     },
//     {
//         id: 11,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 11',
//         description: 'Eleventh tree',
//         labels: [],
//         users: [],
//         children: []
//     },
//     {
//         id: 12,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 12',
//         description: 'Sample description',
//         labels: [],
//         users: [],
//         children: []
//     },
//     {
//         id: 13,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 13',
//         description: 'Tree with nested children',
//         labels: [],
//         users: [],
//         children: [
//             {
//                 title: 'Node M1',
//                 description: 'First level',
//                 depth: 0,
//                 type: NodeType.DEFAULT,
//                 children: [
//                     {
//                         title: 'Node M1.1',
//                         description: 'Second level',
//                         depth: 1,
//                         type: NodeType.FLAG,
//                         children: []
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: 14,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 14',
//         description: 'Multi-node tree',
//         labels: [],
//         users: [],
//         children: [
//             {
//                 title: 'Node N1',
//                 description: 'Node N1',
//                 depth: 0,
//                 type: NodeType.DEFAULT,
//                 children: []
//             },
//             {
//                 title: 'Node N2',
//                 description: 'Node N2',
//                 depth: 0,
//                 type: NodeType.FLAG,
//                 children: []
//             }
//         ]
//     },
//     {
//         id: 15,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 15',
//         description: 'Fifteenth tree',
//         labels: [],
//         users: [],
//         children: []
//     },
//     {
//         id: 16,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 16',
//         description: 'Minimal tree',
//         labels: [],
//         users: [],
//         children: []
//     },
//     {
//         id: 17,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 17',
//         description: 'Tree with complex nesting',
//         labels: [],
//         users: [],
//         children: [
//             {
//                 title: 'Node Q1',
//                 description: 'Level 0',
//                 depth: 0,
//                 type: NodeType.DEFAULT,
//                 children: [
//                     {
//                         title: 'Node Q1.1',
//                         description: 'Level 1',
//                         depth: 1,
//                         type: NodeType.DEFAULT,
//                         children: [
//                             {
//                                 title: 'Node Q1.1.1',
//                                 description: 'Level 2',
//                                 depth: 2,
//                                 type: NodeType.FLAG,
//                                 children: []
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         id: 18,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 18',
//         description: 'Basic sample',
//         labels: [],
//         users: [],
//         children: []
//     },
//     {
//         id: 19,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 19',
//         description: 'Simple tree',
//         labels: [],
//         users: [],
//         children: []
//     },
//     {
//         id: 20,
//         createdBy: 'Noskov Oleh',
//         title: 'Tree 20',
//         description: 'Final example tree',
//         labels: [],
//         users: [],
//         children: []
//     }
// ];
