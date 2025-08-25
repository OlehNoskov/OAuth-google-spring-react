import React, {useEffect} from 'react';
import {Input, Select, Spacer} from "react-magma-dom";
import {ModalFooterButtons} from "../../General/ModalFooterButtons.tsx";
import {SelectWrapper} from "./TreeModalStyled.ts";
import {getAllLabels} from "../../../services/labelService.ts";
import {getAllUsers} from "../../../services/userService.ts";
import {LabelInterface, TreeInterface} from '../../../interfaces/TreeInterface.ts';
import {UserInterface} from "../../../interfaces/UserInterface.ts";
import {createTree} from "../../../services/treeService.ts";
import {useNavigate} from "react-router-dom";
import {BaseModal, BaseModalProps} from '../../General/BaseModal';
import {getAllLabelsOptions, getAllUsersOptions} from "../../../utils/getTreeSelectData.ts";
import {useSelector} from "react-redux";
import {RootState} from "../../../store/store.ts";

interface CreateTreeModalProps extends BaseModalProps {
    currentTree?: TreeInterface;
    onSave?: (currentTree: TreeInterface) => void;
}

export const TreeModal = (props: CreateTreeModalProps) => {
    const navigate = useNavigate();
    const {isOpen, onClose, header, currentTree, onSave} = props;

    const preSelectedLabels = getAllLabelsOptions(currentTree?.labels);
    const preSelectedUsers = getAllUsersOptions(currentTree?.owners);

    const [allLabels, setAllAllLabels] = React.useState<LabelInterface[]>([]);
    const [allUsers, setAllAllUsers] = React.useState<UserInterface[]>([]);

    const [titleTree, setTitleTree] = React.useState(currentTree?.title ?? '');
    const [descriptionTree, setDescriptionTree] = React.useState(currentTree?.description ?? '');
    const [selectedLabelOptions, setSelectedLabelOptions] = React.useState<string[]>(preSelectedLabels);
    const [selectedUserOptions, setSelectedUserOptions] = React.useState<string[]>(preSelectedUsers);
    const user = useSelector((state: RootState) => state.userProfile);

    const isDisabledSaveButton = !titleTree.length || !descriptionTree || selectedLabelOptions.length === 0;

    // Filter selected labels based on selected options
    const selectedLabels = allLabels.filter(label =>
        selectedLabelOptions.includes(`${label.value}`)
    );

    // Filter selected users based on selected options
    const selectedUsers = allUsers.filter(user =>
        selectedUserOptions.includes(`${user.firstName} ${user.lastName}`)
    );

    useEffect(() => {
        getAllLabels().then((response) => {
            setAllAllLabels(response);
        });

        getAllUsers().then((response) => {
            setAllAllUsers(response);
        });
    }, []);

    const saveNewTree = () => {
        const currentUserData = user.email;
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

    const updateCurrentTree = () => {
        if (!currentTree || !onSave) return;

        const updatedTree = {
            ...currentTree,
            title: titleTree,
            description: descriptionTree,
            labels: selectedLabels,
            owners: selectedUsers,
        };

        onSave(updatedTree);
        onClose();
    };

    return (
        <BaseModal header={header} isOpen={isOpen} onClose={onClose}>
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
                    items={getAllLabelsOptions(allLabels)}
                    selectedItems={selectedLabelOptions}
                    onSelectedItemsChange={change => setSelectedLabelOptions(change?.selectedItems ?? [])}
                    onRemoveSelectedItem={removedLabel => setSelectedLabelOptions(selectedLabelOptions.filter(label => label !== removedLabel))}

                />
            </SelectWrapper>
            <SelectWrapper>
                <Select
                    labelText={'Owners'}
                    isMulti
                    items={getAllUsersOptions(allUsers)}
                    selectedItems={selectedUserOptions}
                    onSelectedItemsChange={change => setSelectedUserOptions(change?.selectedItems ?? [])}
                    onRemoveSelectedItem={removedUser => setSelectedUserOptions(selectedUserOptions.filter(user => user !== removedUser))}
                />
            </SelectWrapper>
            <ModalFooterButtons
                handleOnCLose={onClose}
                saveButtonDisabled={isDisabledSaveButton}
                onSave={onSave ? updateCurrentTree : saveNewTree}  // Use provided onSave or default saveData
            />
        </BaseModal>
    );
};