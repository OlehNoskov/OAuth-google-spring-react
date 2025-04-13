import React from 'react';
import {DashboardStyled, SearchWrapper} from "./DashboardStyled.ts";
import {Button, ButtonSize, InputSize, Search} from "react-magma-dom";
import {getAllTreeByUsername} from "../../services/treeService.ts";
import {DEFAULT_TREE} from "../../interfaces/TreeInterface.ts";
import {TreeCard} from "../TreeCard/TreeCard.tsx";
import {TreeCardsWrapper} from "../TreeCard/TreeCardStyled.ts";

export const Dashboard = () => {
    const handleSearch = (search: string) => {

        const test = getAllTreeByUsername('test');
        console.log(search);
        console.log(test);
    };

    return (
        <>
            <DashboardStyled>
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
            </DashboardStyled>
            <TreeCardsWrapper>
                {DEFAULT_TREE.map(tree => (
                    <TreeCard tree={tree}/>
                ))}
            </TreeCardsWrapper>
        </>
    );
};