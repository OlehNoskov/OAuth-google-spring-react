import {NodeType} from "./NodeType.ts";
import {TreeNodeInterface} from "./TreeNodeInterface.ts";
import {UserInterface} from "./UserInterface.ts";

export interface TreeInterface {
    id: number;
    createdBy: string;
    title: string;
    description: string;
    labels: LabelInterface[];
    owners: UserInterface[];
    nodes: TreeNodeInterface[];
}

export interface LabelInterface {
    id: string;
    labelKey: string;
    value: string;
}

export const DEFAULT_TREE: TreeInterface[] = [{
    id: 1,
    createdBy: 'Noskov Oleh',
    title: 'Sample Tree',
    description: 'A tree with up to 5 levels of nested children',
    labels: [
        {id: '1', labelKey: 'Category', value: 'Example'}
    ],
    owners: [{
        firstName: "Oleh",
        lastName: 'Noskov',
        email: "oleh.noskov@nixs.com",
        picture: "https://lh3.googleusercontent.com/a/ACg8ocI9Bquhd0ny8nbYJEgGIHseEg4Gn-SUmCQlZo7KnPV8_q9oFPJE=s96-c",

    }],
    nodes: [
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
}];
