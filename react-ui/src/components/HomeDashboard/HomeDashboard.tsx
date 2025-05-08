import React from 'react';
import {HomeDashboardStyled, SearchWrapper} from "./HomeDashboardStyled.ts";
import {Button, ButtonSize, InputSize, Search} from "react-magma-dom";
import {DEFAULT_TREE} from "../../interfaces/TreeInterface.ts";
import {TreeCard} from "../Tree/TreeCard/TreeCard.tsx";
import {TreeCardsWrapper} from "../Tree/TreeCard/TreeCardStyled.ts";

export const HomeDashboard = () => {
    const handleSearch = (search: string) => {

        console.log(search);
    };

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
            <TreeCardsWrapper>
                <TreeCard tree={DEFAULT_TREE}/>
            </TreeCardsWrapper>
        </>
    );
};