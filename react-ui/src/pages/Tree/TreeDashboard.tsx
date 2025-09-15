import React from 'react';
import {TreeViewComponent} from '../../components/Tree/TreeView/TreeViewComponent.tsx';
import {useParams} from "react-router-dom";
import {Header} from "../../components/Header/Header.tsx";

export const TreeDashboard = () => {
    const {id} = useParams<{ id: string }>();

    return (
        <>
            <Header/>
            <TreeViewComponent treeId={id}/>
        </>
    );
};