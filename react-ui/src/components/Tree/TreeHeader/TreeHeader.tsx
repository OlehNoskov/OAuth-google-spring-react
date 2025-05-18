import React from 'react';
import {TreeHeaderWrapper} from "./TreeHeaderStyled.tsx";
import {IconButton} from 'react-magma-dom';
import {KeyboardBackspaceIcon, SaveIcon} from "react-magma-icons";
import {useNavigate} from "react-router-dom";

interface TreeHeaderProps {
    onSave: () => void;
    isDisabledSaveButton: boolean;
}

export const TreeHeader = (props: TreeHeaderProps) => {
    const navigate = useNavigate();
    const {isDisabledSaveButton, onSave} = props;

    return (
        <TreeHeaderWrapper>
            <IconButton style={{margin: '20px 0 0 25px'}}
                        icon={<KeyboardBackspaceIcon/>} aria-label="Back"
                        onClick={() => navigate('/home')}
            >
                Go Home
            </IconButton>
            <IconButton
                disabled={isDisabledSaveButton}
                style={{margin: '20px 25px 0 0'}}
                icon={<SaveIcon/>} aria-label="Back"
                onClick={() => onSave()}
            >
                Save
            </IconButton>

        </TreeHeaderWrapper>
    );
};