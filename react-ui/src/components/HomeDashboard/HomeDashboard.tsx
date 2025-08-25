import React, {useState} from 'react';
import {HomeDashboardStyled, SearchWrapper} from "./HomeDashboardStyled.ts";
import {Button, ButtonSize, InputSize, Pagination, Search} from "react-magma-dom";
import {TreeInterface} from "../../interfaces/TreeInterface.ts";
import {TreeCardDashboard} from "../Tree/TreeCardDashboard/TreeCardDashboard.tsx";
import {SearchEmptyMessageStyled, TreeCardsWrapper} from "../Tree/TreeCardDashboard/TreeCardDashboardStyled.ts";
import {EmptyDashboard} from "./EmptyDashboard/EmptyDashboard.tsx";
import {TreeModal} from "../Tree/TreeModal/TreeModal.tsx";
import {getAllTreeByUsername, getTreeByTitle} from "../../services/treeService.ts";
import { useSelector } from 'react-redux'
import {RootState} from "../../store/store.ts";

export const HomeDashboard = () => {
    const [allTrees, setAllTrees] = React.useState<TreeInterface[]>([]);
    const [isOpenCreateTreeModal, setIsOpenCreateTreeModal] = useState<boolean>(false);
    const [searchTitle, setSearchTitle] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [searchMode, setSearchMode] = useState<boolean>(false);
    const pageSize = 10;
    const user = useSelector((state: RootState) => state.userProfile);
    const currentUserName = user?.email;

    const getAllTrees = (pageNum = 1) => {
        getAllTreeByUsername(currentUserName, pageNum - 1, pageSize).then(response => {
            setAllTrees(response.elements);
            setTotalPages(response.totalPages);
            setSearchMode(false);
        });
    };

    React.useEffect(() => {
        getAllTrees(page);
    }, [page]);

    function handleChange(event: { target: { value: React.SetStateAction<string>; }; }) {
        setSearchTitle(event.target.value);
    }

    const handleSearch = (title: string) => {
        getTreeByTitle(title, 0, pageSize).then(response => {
            setAllTrees(response.elements);
            setTotalPages(response.totalPages);
            setPage(1);
            setSearchMode(true);
        })
    };

    function handlePageChange(event, pageNumber: number) {
        setPage(pageNumber);
    }

    return (
        <>
            {isOpenCreateTreeModal && (
                <TreeModal
                    header={'Create tree'}
                    isOpen={isOpenCreateTreeModal}
                    onClose={() => setIsOpenCreateTreeModal(false)}
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
                            onClear={getAllTrees}
                    />
                </SearchWrapper>
                <Button
                    size={ButtonSize.large}
                    style={{marginRight: '195px'}}
                    onClick={() => setIsOpenCreateTreeModal(true)}>
                    Create tree
                </Button>
            </HomeDashboardStyled>
            {
                allTrees.length === 0 ?
                    searchMode ?
                        <SearchEmptyMessageStyled>
                            Tree with title '{searchTitle}' wasn't found!
                        </SearchEmptyMessageStyled>
                        :
                        <EmptyDashboard/>
                    :
                    <>
                        <TreeCardsWrapper>
                            {allTrees.map(tree => (
                                <TreeCardDashboard tree={tree}/>
                            ))}
                        </TreeCardsWrapper>
                        <Pagination style={{margin: '25px', display: 'flex', justifyContent: 'center'}} page={page}
                                    onPageChange={handlePageChange} count={totalPages}/>
                    </>
            }
        </>
    );
};