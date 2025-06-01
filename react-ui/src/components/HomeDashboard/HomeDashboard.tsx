import React, {useState} from 'react';
import {HomeDashboardStyled, SearchWrapper} from "./HomeDashboardStyled.ts";
import {Button, ButtonSize, InputSize, Search} from "react-magma-dom";
import {DEFAULT_TREE, TreeInterface} from "../../interfaces/TreeInterface.ts";
import {TreeCardDashboard} from "../Tree/TreeCardDashboard/TreeCardDashboard.tsx";
import {TreeCardsWrapper} from "../Tree/TreeCardDashboard/TreeCardDashboardStyled.ts";
import {EmptyDashboard} from "./EmptyDashboard/EmptyDashboard.tsx";
import {CreateTreeModal} from "../Tree/CreateTreeModal/CreateTreeModal.tsx";

export const HomeDashboard = () => {
    const [allTrees, setAllTrees] = React.useState<TreeInterface[]>([]);
    const [isOpenCreateTreeModal, setIsOpenCreateTreeModal] = useState<boolean>(false);


    const handleSearch = (search: string) => {
        console.log(search);
    };

    React.useEffect(() => {
        setAllTrees(DEFAULT_TREE);
    }, []);

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
                            onSearch={handleSearch}
                            isClearable
                            inputSize={InputSize.large}/>
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