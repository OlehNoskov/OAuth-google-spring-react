import React from 'react';
import {Button, ButtonColor, ButtonGroup, ButtonGroupAlignment} from "react-magma-dom";

interface ModalFooterButtonsProps {
    handleOnCLose: () => void;
    onSave: () => void;
    saveButtonDisabled?: boolean;
}

export const ModalFooterButtons = (props: ModalFooterButtonsProps) => {
    const {handleOnCLose, onSave, saveButtonDisabled} = props;

    return (
        <ButtonGroup alignment={ButtonGroupAlignment.right}>
            <Button onClick={handleOnCLose} color={ButtonColor.secondary}>Cancel</Button>
            <Button onClick={onSave} color={ButtonColor.primary} disabled={saveButtonDisabled}>Save</Button>
        </ButtonGroup>
    );
};