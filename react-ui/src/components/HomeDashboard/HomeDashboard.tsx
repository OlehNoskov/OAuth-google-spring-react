import React, {useState} from 'react';
import {HomeDashboardStyled, SearchWrapper} from "./HomeDashboardStyled.ts";
import {Button, ButtonSize, InputSize, Search} from "react-magma-dom";
import {TreeInterface} from "../../interfaces/TreeInterface.ts";
import {TreeCardDashboard} from "../Tree/TreeCardDashboard/TreeCardDashboard.tsx";
import {TreeCardsWrapper} from "../Tree/TreeCardDashboard/TreeCardDashboardStyled.ts";
import {EmptyDashboard} from "./EmptyDashboard/EmptyDashboard.tsx";
import {CreateTreeModal} from "../Tree/CreateTreeModal/CreateTreeModal.tsx";
import {getAllTreeByUsername, getTreeByTitle} from "../../services/treeService.ts";
import {getCurrentUser} from "../../services/userStorage.ts";

export const HomeDashboard = () => {
    const [allTrees, setAllTrees] = React.useState<TreeInterface[]>([]);
    const [isOpenCreateTreeModal, setIsOpenCreateTreeModal] = useState<boolean>(false);
    const [searchTitle, setSearchTitle] = useState<string>('');
    const currentUserName = getCurrentUser()?.email;

    const getAllTrees = () => {
        getAllTreeByUsername(currentUserName).then(response => {
            setAllTrees(response);
        });
    };

    React.useEffect(() => {
        getAllTrees();
    }, []);

    function handleChange(event: { target: { value: React.SetStateAction<string>; }; }) {
        setSearchTitle(event.target.value);
    }

    const handleSearch = (title: string) => {
        getTreeByTitle(title).then(response => {
            setAllTrees(response);
        })
    };

    return (
        <>
            {isOpenCreateTreeModal && (
                <CreateTreeModal
                    isOpen={isOpenCreateTreeModal}
                    handleOnCLose={() => setIsOpenCreateTreeModal(false)}
                />
            )}
            <HomeDashboardStyled>
                <SearchWrapper>
                    <Search placeholder="Search tree by title"
                            isClearable
                            inputSize={InputSize.large}
                            value={searchTitle}
                            onChange={handleChange}
                            onSearch={handleSearch}
                            onClick={getAllTrees}
                    />
                </SearchWrapper>
                <Button
                    size={ButtonSize.large}
                    style={{position: 'absolute', right: '0', marginRight: '260px'}}
                    onClick={() => setIsOpenCreateTreeModal(true)}>
                    Create tree
                </Button>
            </HomeDashboardStyled>
            {
                allTrees.length === 0 ?
                    <EmptyDashboard/>
                    :
                    <TreeCardsWrapper>
                        {allTrees.map(tree => (
                            <TreeCardDashboard tree={tree}/>
                        ))}
                    </TreeCardsWrapper>
            }
        </>
    );
};