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

export const TreeTitle = styled.div`
    color: #000000;
    font-size: 24px;
    font-weight: 500;
    margin: 12px 0 12px 12px;
`;

export const AddTreeNodeButtonWrapper = styled.div`
    margin-top: 250px;
    text-align: center;
`;