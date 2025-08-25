import {TreeNodeInterface} from "./TreeNodeInterface.ts";
import {UserInterface} from "./UserInterface.ts";
import {LabelInterface} from "./LabelInterface.ts";

export interface TreeInterface {
    id?: number;
    createdBy: string;
    title: string;
    description: string;
    labels: LabelInterface[];
    owners: UserInterface[];
    nodes: TreeNodeInterface[];
}
