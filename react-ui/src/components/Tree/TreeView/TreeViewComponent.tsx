import React from 'react';
import {TreeItem, TreeView} from 'react-magma-dom';
import {TreeNodeInterface} from "../../../interfaces/TreeNodeInterface.ts";
import {TreeInterface} from "../../../interfaces/TreeInterface.ts";
import {LeftSideBar, TreeContent, TreeViewComponentStyled} from "./TreeViewComponentStyled.ts";

interface TreeViewComponentProps {
    trees: TreeInterface[];
}

// Recursive component to render tree nodes
const TreeNode: React.FC<{
    node: TreeNodeInterface;
    depth?: number;
}> = ({ node, depth = 0 }) => (
    <TreeItem
        itemId={node.title + depth} // Should use proper unique ID in real implementation
        label={node.title}
        // depth={depth}
        // nodeType={node.children.length ? 'branch' : 'leaf'}
        data-testid={`tree-node-${node.title}-${depth}`}
    >
        {node.children.map((child, index) => (
            <TreeNode
                key={`${child.title}-${depth}-${index}`}
                node={child}
                depth={depth + 1}
            />
        ))}
    </TreeItem>
);

export const TreeViewComponent: React.FC<TreeViewComponentProps> = (props: TreeViewComponentProps) => {
    return (
        <TreeViewComponentStyled>
            <LeftSideBar>
                <TreeView aria-label="Main navigation tree">
                    {props.trees.map(tree => (
                        <TreeItem
                            key={tree.id}
                            itemId={tree.id.toString()}
                            label={tree.title}
                            // nodeType={tree.children.length ? 'branch' : 'leaf'}
                            data-testid={`tree-root-${tree.id}`}
                        >
                            {tree.children.map((child: { title: any; }, index: any) => (
                                <TreeNode
                                    key={`${tree.id}-${child.title}-${index}`}
                                    node={child}
                                    depth={1}
                                />
                            ))}
                        </TreeItem>
                    ))}
                </TreeView>
            </LeftSideBar>

            <TreeContent>
                {/* Add content area implementation here */}
            </TreeContent>
        </TreeViewComponentStyled>
    );
};