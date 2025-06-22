import {LabelInterface} from "../interfaces/TreeInterface.ts";
import {UserInterface} from "../interfaces/UserInterface.ts";

export const getAllLabelsOptions = (labels: LabelInterface[] | undefined) => {
    if (labels === undefined || labels.length === 0) {
        return [];
    }
    return labels.map(label => `${label.value}`);
}

export const getAllUsersOptions = (users: UserInterface[] | undefined) => {
    if (users === undefined || users.length === 0) {
        return [];
    }
    return users.map(user => `${user.firstName} ${user.lastName}`);
}