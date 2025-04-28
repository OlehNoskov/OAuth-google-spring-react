import styled from "@emotion/styled";

export const TreeViewComponentStyled = styled.div`
    display: flex;
    height: 100vh;
`;

export const LeftSideBar = styled.div`
    width: 20%;
    display: inline-block;
    border-right: #D4D4D4 solid 1px;
    min-height: calc(100vh - 80px);
    padding: 16px;
    overflow: auto;
`;

export const TreeContent = styled.div`
    width: 70%;
    display: inline-block;
    min-height: calc(100vh - 80px);
    padding: 16px;
`;