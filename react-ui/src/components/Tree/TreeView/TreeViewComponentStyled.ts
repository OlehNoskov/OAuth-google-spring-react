import styled from "@emotion/styled";

export const TreeViewComponentStyled = styled.div`
    display: flex;
    height: calc(100vh - 160px);
`;

export const LeftSideBar = styled.div`
    width: 30%;
    display: inline-block;
    padding: 16px;
    overflow: auto;
    background-color: #F5F5F5;
`;

export const TreeNodeContent = styled.div`
    width: 70%;
    display: inline-block;
    padding: 16px;
`;

export const TreeHeader = styled.div`
    width: 100%;
    height: 80px;
    background-color: #E8E9F8;
    border-bottom: #D4D4D4 solid 1px;
`;

export const TreeTitle = styled.div`
    color: #000000;
    font-size: 24px;
    font-weight: 500;
    margin: 12px 0 12px 12px;
`;