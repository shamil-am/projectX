import { createContext, FC, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { ICategoryNode } from '@/types/nodeTypes';

interface IProps {
    children?: ReactNode;
}

interface IContextProps {
    categoryNode: ICategoryNode;
    addNewCategoryNode: (id: string, name: string) => void;
    deleteCategoryNode: (id: string) => void;
    updateCategoryNode: (id: string, updatedCategory: ICategoryNode) => void;
}

const addNewNodeToObject = (nodeObject: ICategoryNode, targetId: string, newNode: ICategoryNode): ICategoryNode => {
    if (nodeObject.id === targetId) {
        return {
            ...nodeObject,
            subCategories: [...nodeObject.subCategories, newNode],
        };
    }

    const newSubCategories = nodeObject.subCategories.map((subCategory) =>
        addNewNodeToObject(subCategory, targetId, newNode),
    );

    return {
        ...nodeObject,
        subCategories: newSubCategories,
    };
};

const deleteNodeFromObject = (nodeObject: ICategoryNode, targetId: string): ICategoryNode | null => {
    if (nodeObject.id === targetId) {
        return null;
    }

    const newSubCategories = nodeObject.subCategories
        .map((subCategory) => deleteNodeFromObject(subCategory, targetId))
        .filter((subCategory) => subCategory !== null) as ICategoryNode[];

    return {
        ...nodeObject,
        subCategories: newSubCategories,
    };
};

const updateNodeInObject = (nodeObject: ICategoryNode, targetId: string, updatedNode: ICategoryNode): ICategoryNode => {
    if (nodeObject.id === targetId) {
        return updatedNode;
    }

    const newSubCategories = nodeObject.subCategories.map((subCategory) =>
        updateNodeInObject(subCategory, targetId, updatedNode),
    );

    return {
        ...nodeObject,
        subCategories: newSubCategories,
    };
};

const localStorageKey = 'CategoryNodes';

const NodeContext = createContext<IContextProps>({} as IContextProps);

NodeContext.displayName = localStorageKey;

const NodeProvider: FC<IProps> = ({ children }) => {
    const firstUpdate = useRef(true);

    const [categoryNode, setCategoryNode] = useState<ICategoryNode>({ id: '1', name: 'Category', subCategories: [] });

    const addNewCategoryNode = (id: string, name: string) => {
        const newNode = {
            id: uuidv4(),
            name,
            subCategories: [],
        };

        setCategoryNode((prevState) => addNewNodeToObject(prevState, id, newNode));
    };

    const deleteCategoryNode = (id: string) => {
        const newCategoryNode = deleteNodeFromObject(categoryNode, id);
        newCategoryNode && setCategoryNode(newCategoryNode);
    };

    const updateCategoryNode = (id: string, updatedCategory: ICategoryNode) => {
        setCategoryNode((prevState) => updateNodeInObject(prevState, id, updatedCategory));
    };

    useLayoutEffect(() => {
        const categoryNodeFromStorage = localStorage.getItem(localStorageKey);

        if (categoryNodeFromStorage) {
            setCategoryNode(JSON.parse(categoryNodeFromStorage));
        }
    }, []);

    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        window.localStorage.setItem(localStorageKey, JSON.stringify(categoryNode));
    }, [categoryNode]);

    return (
        <NodeContext.Provider value={{ categoryNode, addNewCategoryNode, deleteCategoryNode, updateCategoryNode }}>
            {children}
        </NodeContext.Provider>
    );
};

export { NodeContext, NodeProvider };
