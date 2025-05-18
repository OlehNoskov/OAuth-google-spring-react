import React from 'react';
import {HomeDashboardStyled, SearchWrapper} from "./HomeDashboardStyled.ts";
import {Button, ButtonSize, InputSize, Search} from "react-magma-dom";
import {DEFAULT_TREE, TreeInterface} from "../../interfaces/TreeInterface.ts";
import {TreeCard} from "../Tree/TreeCard/TreeCard.tsx";
import {TreeCardsWrapper} from "../Tree/TreeCard/TreeCardStyled.ts";
import {EmptyDashboard} from "./EmptyDashboard/EmptyDashboard.tsx";

export const HomeDashboard = () => {
    const [allTrees, setAllTrees] = React.useState<TreeInterface[]>([]);

    const handleSearch = (search: string) => {
        console.log(search);
    };

    React.useEffect(() => {
        setAllTrees(DEFAULT_TREE);
    }, []);

    return (
        <>
            <HomeDashboardStyled>
                <SearchWrapper>
                    <Search placeholder="Search tree by title"
                            onSearch={handleSearch}
                            isClearable
                            inputSize={InputSize.large}/>
                </SearchWrapper>
                <Button
                    size={ButtonSize.large}
                    style={{position: 'absolute', right: '0', marginRight: '260px'}}>
                    Create tree
                </Button>
            </HomeDashboardStyled>
            {
                allTrees.length === 0 ?
                    <EmptyDashboard/>
                    :
                    <TreeCardsWrapper>
                        {allTrees.map(tree => (
                            <TreeCard tree={tree}/>
                        ))}
                    </TreeCardsWrapper>
            }
        </>
    );
};