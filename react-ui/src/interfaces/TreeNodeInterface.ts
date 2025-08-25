import {NodeTypeInterface} from "./NodeTypeInterface.ts";

export interface TreeNodeInterface {
    id?: number;
    title: string;
    description: string;
    depth: number;
    type: NodeTypeInterface;
    children: TreeNodeInterface[];
}