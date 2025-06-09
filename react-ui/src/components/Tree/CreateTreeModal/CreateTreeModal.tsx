import React, {useEffect} from 'react';
import {Input, Modal, Select, Spacer} from "react-magma-dom";
import {ModalFooterButtons} from "../../General/ModalFooterButtons.tsx";
import {SelectWrapper} from "./CreateTreeModalStyled.ts";
import {getAllLabels} from "../../../services/labelService.ts";
import {getAllUsers} from "../../../services/userService.ts";
import {LabelInterface, TreeInterface} from '../../../interfaces/TreeInterface.ts';
import {UserInterface} from "../../../interfaces/UserInterface.ts";
import {getCurrentUser} from "../../../services/userStorage.ts";
import {createTree} from "../../../services/treeService.ts";
import {useNavigate} from "react-router-dom";

interface CreateTreeModalProps {
    isOpen: boolean;
    handleOnCLose: () => void;
}

export const CreateTreeModal = (props: CreateTreeModalProps) => {
    const navigate = useNavigate();
    const {isOpen, handleOnCLose} = props;

    const [titleTree, setTitleTree] = React.useState('');
    const [descriptionTree, setDescriptionTree] = React.useState('');
    const isDisabledSaveButton = !titleTree.length || !descriptionTree;
    const [allLabels, setAllAllLabels] = React.useState<LabelInterface[]>([]);
    const [allUsers, setAllAllUsers] = React.useState<UserInterface[]>([]);

    const [selectedLabelOptions, setSelectedLabelOptions] = React.useState<string[]>([]);
    const [selectedUserOptions, setSelectedUserOptions] = React.useState<string[]>([]);

    // Filter selected labels and users based on selected options
    const selectedLabels = allLabels.filter(label =>
        selectedLabelOptions.includes(`${label.labelKey}: ${label.value}`)
    );
    const selectedUsers = allUsers.filter(user =>
        selectedUserOptions.includes(`${user.firstName}: ${user.lastName}`)
    );

    useEffect(() => {
        getAllLabels().then((response) => {
            setAllAllLabels(response);
        });

        getAllUsers().then((response) => {
            setAllAllUsers(response);
        });
    }, []);

    const saveData = () => {
        const currentUser = getCurrentUser();
        const currentUserData = currentUser && currentUser.email;
        const owners = selectedUsers.concat(allUsers.filter(user => user.email === currentUserData)[0]);

        const newTree: TreeInterface = {
            createdBy: currentUserData,
            title: titleTree,
            description: descriptionTree,
            labels: selectedLabels,
            owners: owners,
            nodes: []
        };

        createTree(newTree).then(response => {
            navigate(`/tree/${response.id}`)

        })
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
                <Select
                    labelText={'Labels*'}
                    isMulti
                    items={getAllLabelsOptions()}
                    selectedItems={selectedLabelOptions}
                    onSelectedItemsChange={change => setSelectedLabelOptions(change?.selectedItems ?? [])}
                    onRemoveSelectedItem={removedLabel => setSelectedLabelOptions(selectedLabelOptions.filter(label => label !== removedLabel))}

                />
            </SelectWrapper>
            <SelectWrapper>
                <Select
                    labelText={'Owners'}
                    isMulti
                    items={getAllUsersOptions()}
                    selectedItems={selectedUserOptions}
                    onSelectedItemsChange={change => setSelectedUserOptions(change?.selectedItems ?? [])}
                    onRemoveSelectedItem={removedUser => setSelectedUserOptions(selectedUserOptions.filter(user => user !== removedUser))}
                />
            </SelectWrapper>
            <ModalFooterButtons
                handleOnCLose={handleOnCLose}
                saveButtonDisabled={isDisabledSaveButton}
                onSave={saveData}
            />
        </Modal>
    );
};