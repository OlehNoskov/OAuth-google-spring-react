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
import {EditIcon, MoreVertIcon} from "react-magma-icons";

interface RenameButtonProps {
    marginRight?: string;
    background?: string;
}

export const RenameButton: React.FC<RenameButtonProps> = (props: RenameButtonProps) => {

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
                    icon={<EditIcon aria-hidden/>}
                    onClick={() => console.log('Rename clicked!')}
                >
                    Rename
                </DropdownMenuItem>
            </DropdownContent>
        </Dropdown>
    )
};