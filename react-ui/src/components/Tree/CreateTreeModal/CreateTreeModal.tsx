import React, {useEffect} from 'react';
import {Input, Modal, Select, Spacer} from "react-magma-dom";
import {ModalFooterButtons} from "../../General/ModalFooterButtons.tsx";
import {SelectWrapper} from "./CreateTreeModalStyled.ts";
import {getAllLabels} from "../../../services/labelService.ts";
import {getAllUsers} from "../../../services/userService.ts";
import {LabelInterface} from '../../../interfaces/TreeInterface.ts';
import {UserInterface} from "../../../interfaces/UserInterface.ts";

interface CreateTreeModalProps {
    isOpen: boolean;
    handleOnCLose: () => void;
}

export const CreateTreeModal = (props: CreateTreeModalProps) => {
    const {isOpen, handleOnCLose} = props;

    const [titleTree, setTitleTree] = React.useState('');
    const [descriptionTree, setDescriptionTree] = React.useState('');
    const isDisabledSaveButton = !titleTree.length || !descriptionTree;
    const [allLabels, setAllAllLabels] = React.useState<LabelInterface[]>([]);
    const [allUsers, setAllAllUsers] = React.useState<UserInterface[]>([]);

    useEffect(() => {
        getAllLabels().then((response) => {
            setAllAllLabels(response);
        });

        getAllUsers().then((response) => {
            setAllAllUsers(response);
        });
    }, []);

    const saveData = () => {
        console.log('Saving tree with title:', titleTree, 'and description:', descriptionTree);
    };

    const getAllLabelsOptions = () => {
        return allLabels.map(label => `${label.labelKey}: ${label.value}`);
    }

    const getAllUsersOptions = () => {
        return allUsers.map(user => `${user.firstName}: ${user.lastName}`);
    }

    return (
        <Modal header={'Create tree'} isOpen={isOpen} onClose={handleOnCLose}>
            <Input
                labelText={'Title*'}
                required
                value={titleTree}
                onChange={e => setTitleTree(e.target.value)}
                maxCount={255}
            />
            <Spacer size={20}/>
            <Input
                labelText={'Description*'}
                required
                value={descriptionTree}
                onChange={e => setDescriptionTree(e.target.value)}
                maxCount={255}
            />
            <SelectWrapper>
                <Select labelText={'Labels*'} isMulti items={getAllLabelsOptions()}/>
            </SelectWrapper>
            <SelectWrapper>
                <Select labelText={'Owners'} isMulti items={getAllUsersOptions()}/>
            </SelectWrapper>
            <ModalFooterButtons
                handleOnCLose={handleOnCLose}
                saveButtonDisabled={isDisabledSaveButton}
                onSave={saveData}
            />
        </Modal>
    );
};