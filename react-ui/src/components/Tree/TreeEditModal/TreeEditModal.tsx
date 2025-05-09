import React from 'react';
import {Button, ButtonColor, ButtonGroup, ButtonGroupAlignment, Input, Modal, Spacer, Textarea} from "react-magma-dom";

interface TreeEditModalProps {
    isOpen: boolean;
    handleOnCLose: () => void;
    save: () => void;
}

export const TreeEditModal = (props: TreeEditModalProps) => {
    const {isOpen, handleOnCLose, save} = props;

    const saveData = () => {
        handleOnCLose();
        save();
    }

    return (
        <Modal header="Edit name and description" isOpen={isOpen} onClose={handleOnCLose}>
            <Input maxCount={255} labelText={"Name"} required/>
            <Spacer size={20}/>
            <Textarea maxCount={1000} labelText="Description"/>
            <ButtonGroup alignment={ButtonGroupAlignment.right}>
                <Button onClick={handleOnCLose} color={ButtonColor.secondary}>Cancel</Button>
                <Button onClick={saveData} color={ButtonColor.primary}>Save</Button>
            </ButtonGroup>
        </Modal>
    );
};
