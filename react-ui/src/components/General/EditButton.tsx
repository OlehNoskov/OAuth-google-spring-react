import React from "react";
import {
    ButtonColor,
    ButtonShape,
    ButtonSize,
    Dropdown,
    DropdownButton,
    DropdownContent,
    DropdownMenuItem,
} from "react-magma-dom";
import {AddIcon, DeleteIcon, EditIcon, MoreVertIcon} from "react-magma-icons";

interface RenameButtonProps {
    marginRight?: string;
    background?: string;
    onClickAdd: () => void;
    onClickEdit: () => void;
    onClickDelete: () => void;
}

export const EditButton: React.FC<RenameButtonProps> = (props: RenameButtonProps) => {

    const {onClickAdd, onClickEdit, onClickDelete} = props;

    return (
        <Dropdown style={{marginRight: `${props.marginRight || '12px'}`}}>
            <DropdownButton
                aria-label="Extra icon example"
                color={ButtonColor.secondary}
                size={ButtonSize.small}
                icon={<MoreVertIcon/>}
                shape={ButtonShape.fill}
                style={{border: 'none', background: `${props.background || '#FFFFFF'}`}}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#D4D4D4')}
                onMouseLeave={(e) => (e.currentTarget.style.background = `${props.background || '#FFFFFF'}`)}
            />
            <DropdownContent>
                <DropdownMenuItem
                    icon={<AddIcon aria-hidden/>}
                    onClick={onClickAdd}>
                    Add Tree Node
                </DropdownMenuItem>
                <DropdownMenuItem
                    icon={<EditIcon aria-hidden/>}
                    onClick={onClickEdit}>
                    Edit Name & Description
                </DropdownMenuItem>
                <DropdownMenuItem
                    icon={<DeleteIcon aria-hidden/>}
                    onClick={onClickDelete}>
                    Delete
                </DropdownMenuItem>
            </DropdownContent>
        </Dropdown>
    )
};