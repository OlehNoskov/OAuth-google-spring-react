import {UserInterface} from "../interfaces/UserInterface.ts";
import {LabelInterface} from "../interfaces/LabelInterface.ts";
import {UserRole} from "../interfaces/UserRole.ts";

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

export const isOwner = (role: string | null) => {
    return role === UserRole.OWNER;
}

export const isEditor = (role: string | null) => {
    return role === UserRole.EDITOR;
}

export const isViewer = (role: string | null) => {
    return role === UserRole.VIEWER;
}

export const hasEditPermissions = (role: string | null) => {
    return role === UserRole.OWNER || role === UserRole.EDITOR;
}