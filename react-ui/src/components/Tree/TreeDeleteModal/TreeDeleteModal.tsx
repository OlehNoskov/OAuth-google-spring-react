import React from 'react';
import {Button, ButtonColor, ButtonGroup, ButtonGroupAlignment, Modal} from "react-magma-dom";

interface TreeDeleteModalProps {
    isOpen: boolean;
    handleOnCLose: () => void;
    onDelete: () => void;
}

export const TreeDeleteModal = (props: TreeDeleteModalProps) => {
    const {isOpen, handleOnCLose, onDelete} = props;

    return (
        <Modal header="Are you sure that you want to delete this node?" isOpen={isOpen} onClose={handleOnCLose}>
            <ButtonGroup alignment={ButtonGroupAlignment.right}>
                <Button onClick={handleOnCLose} color={ButtonColor.secondary}>Cancel</Button>
                <Button onClick={onDelete} color={ButtonColor.primary}>Delete</Button>
            </ButtonGroup>
        </Modal>
    );
};