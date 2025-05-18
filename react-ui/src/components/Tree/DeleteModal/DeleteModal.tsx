import React from 'react';
import {Button, ButtonColor, ButtonGroup, ButtonGroupAlignment, Modal} from "react-magma-dom";

interface DeleteModalProps {
    isOpen: boolean;
    handleOnCLose: () => void;
    onDelete: () => void;
    isNodeDelete?: boolean;
}

export const DeleteModal = (props: DeleteModalProps) => {
    const {isOpen, handleOnCLose, onDelete, isNodeDelete = true} = props;

    return (
        <Modal
            header={
                isNodeDelete
                    ? "Are you sure that you want to delete this node?"
                    : "Are you sure that you want to delete this tree?"
            }
            isOpen={isOpen}
            onClose={handleOnCLose}
        >
            <ButtonGroup alignment={ButtonGroupAlignment.right}>
                <Button onClick={handleOnCLose} color={ButtonColor.secondary}>Cancel</Button>
                <Button onClick={onDelete} color={ButtonColor.primary}>Delete</Button>
            </ButtonGroup>
        </Modal>
    );
};