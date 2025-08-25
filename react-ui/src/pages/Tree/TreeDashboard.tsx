import React, {useState} from 'react';
import HomeHeader from "../../components/HomeHeader/HomeHeader.tsx";
import {TreeViewComponent} from '../../components/Tree/TreeView/TreeViewComponent.tsx';
import {useParams} from "react-router-dom";
import {getTreeById} from "../../services/treeService.ts";
import {TreeInterface} from "../../interfaces/TreeInterface.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";

export const TreeDashboard = () => {
    const {id} = useParams<{ id: string }>(); // Retrieve the id of tree from the URL
    const [currentTree, setCurrentTree] = useState<TreeInterface>();
    const user = useSelector((state: RootState) => state.userProfile);

    React.useEffect(() => {
        getTreeById(id).then(response => {
            setCurrentTree(response);
        });
    }, []);

    return (
        <>
            <HomeHeader user={user}/>
            {currentTree &&
                <TreeViewComponent tree={currentTree}/>
            }
        </>
    );
};