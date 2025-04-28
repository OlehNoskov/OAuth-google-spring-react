import React from 'react';
import HomeHeader from "../../components/HomeHeader/HomeHeader.tsx";
import {getCurrentUser} from "../../services/userStorage.ts";
import {DEFAULT_TREE} from "../../interfaces/TreeInterface.ts";
import { TreeViewComponent } from '../../components/Tree/TreeView/TreeViewComponent.tsx';

const TreeDashboard = () => {
    return (
        <>
            <HomeHeader user={getCurrentUser()}/>
            <TreeViewComponent trees={DEFAULT_TREE}></TreeViewComponent>
        </>
    );
};

export default TreeDashboard;