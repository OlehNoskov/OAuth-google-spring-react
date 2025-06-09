import React, {useState} from 'react';
import HomeHeader from "../../components/HomeHeader/HomeHeader.tsx";
import {getCurrentUser} from "../../services/userStorage.ts";
import {TreeViewComponent} from '../../components/Tree/TreeView/TreeViewComponent.tsx';
import {useParams} from "react-router-dom";
import {getTreeById} from "../../services/treeService.ts";
import {TreeInterface} from "../../interfaces/TreeInterface.ts";

export const TreeDashboard = () => {
    const {id} = useParams<{ id: string }>();
    const [currentTree, setCurrentTree] = useState<TreeInterface>()// Retrieve the id of tree from the URL

    React.useEffect(() => {
        getTreeById(id).then(response => {
            setCurrentTree(response);
        });
    }, []);

    return (
        <>
            <HomeHeader user={getCurrentUser()}/>
            {currentTree
                && <TreeViewComponent
                    tree={currentTree}/>
            }
        </>
    );
};