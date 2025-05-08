import {NodeType} from "./NodeType.ts";

export interface TreeNodeInterface {
    id: number;
    title: string;
    description: string;
    depth: number;
    type: NodeType;
    children: TreeNodeInterface[];
}