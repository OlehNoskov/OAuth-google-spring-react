import React from 'react';
import HomeHeader from "../../components/HomeHeader/HomeHeader.tsx";
import {getCurrentUser} from "../../services/userStorage.ts";
import {DEFAULT_TREE} from "../../interfaces/TreeInterface.ts";
import { TreeViewComponent } from '../../components/Tree/TreeView/TreeViewComponent.tsx';
import {useParams} from "react-router-dom";

export const TreeDashboard = () => {

    const { id } = useParams<{ id: string }>(); // Retrieve the id of tree from the URL

    const getTreeById = (id: string) => {
        return DEFAULT_TREE.find(tree => tree.id === parseInt(id));
    }

    return (
        <>
            <HomeHeader user={getCurrentUser()}/>
            <TreeViewComponent tree={getTreeById(id)}></TreeViewComponent>
        </>
    );
};