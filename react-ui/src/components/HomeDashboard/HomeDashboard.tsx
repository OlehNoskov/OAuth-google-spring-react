import React, {useState} from 'react';
import {HomeDashboardStyled, SearchWrapper} from "./HomeDashboardStyled.ts";
import {Button, ButtonSize, Pagination, Combobox} from "react-magma-dom";
import {TreeCardDashboard} from "../Tree/TreeCardDashboard/TreeCardDashboard.tsx";
import {TreeCardsWrapper} from "../Tree/TreeCardDashboard/TreeCardDashboardStyled.ts";
import {TreeModal} from "../Tree/TreeModal/TreeModal.tsx";
import {getAllTreeByUsername, getAllTreesByAdmin} from "../../services/treeService.ts";
import {useSelector} from 'react-redux'
import {RootState} from "../../store/store.ts";
import {DocumentTreeInterface} from "../../interfaces/DocumentTreeInterface.ts";
import {hasEditPermissions, isOwner} from "../../utils/getTreeSelectData.ts";
import { getSuggestions } from '../../services/elasticsearchService.ts';
import {useNavigate} from "react-router-dom";
import { EmptyDashboard } from './EmptyDashboard/EmptyDashboard.tsx';
import { SuggestionInterface } from '../../interfaces/SuggestionInterface.ts';

export const HomeDashboard = () => {
    const [allTrees, setAllTrees] = React.useState<DocumentTreeInterface[]>([]);
    const [isOpenCreateTreeModal, setIsOpenCreateTreeModal] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [suggestions, setSuggestions] = useState<SuggestionInterface[]>([]);
    const pageSize = 10;
    const user = useSelector((state: RootState) => state.userProfile);
    const hasPermissions = hasEditPermissions(user.role);
    const navigate = useNavigate();

    function handleTreeResponse(response: any) {
        setAllTrees(response.elements);
        setTotalPages(response.totalPages);
    }

    const getAllTrees = (pageNum = 1) => {
        const promise = isOwner(user.role)
            ? getAllTreesByAdmin(pageNum - 1, pageSize)
            : getAllTreeByUsername(user.email, pageNum - 1, pageSize);

        promise.then(handleTreeResponse);
    };

    React.useEffect(() => {
        getAllTrees(page);
    }, [page]);

    function handlePageChange(event, pageNumber: number) {
        setPage(pageNumber);
    }

    const fetchSuggestions = async (event: any) => {
        const searchKeyword = event.inputValue;
        getSuggestions(searchKeyword, user.email).then((result) => setSuggestions(result));
    };

    const handleSelectedItemChange = (changes: any) => {
        const selectedTitle = changes.selectedItem;
        const selectedSuggestion = suggestions.find(suggestion => suggestion.title === selectedTitle);
        if (selectedSuggestion) {
            navigate(`/tree/${selectedSuggestion.id}`);
        }
    };

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
                      <Combobox
                        id="serch-combobox"
                        labelText="Search by title"
                        onInputValueChange={fetchSuggestions}
                        items={suggestions.map((suggestion) => suggestion.title)}
                        isClearable
                        disableCreateItem
                        onSelectedItemChange={handleSelectedItemChange}
                      />
                </SearchWrapper>
                {hasPermissions &&
                    <Button
                        size={ButtonSize.large}
                        style={{marginRight: '195px'}}
                        onClick={() => setIsOpenCreateTreeModal(true)}>
                        Create tree
                    </Button>
                }
            </HomeDashboardStyled>
            {
                allTrees.length === 0 ?
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