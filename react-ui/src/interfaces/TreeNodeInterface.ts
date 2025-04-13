import {NodeType} from "./NodeType.ts";

export interface TreeNodeInterface {
    title: string;
    description: string;
    depth: number;
    type: NodeType;
    children: TreeNodeInterface[];
}