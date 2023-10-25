import './style.scss';

import cn from 'classnames';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';

import { NodeContext } from '@/contexts/categoryContext';
import { ICategoryNode } from '@/types/nodeTypes';

interface IProps {
    categoryNode: ICategoryNode;
}

const CategoryNode: FC<IProps> = ({ categoryNode }) => {
    const inputRef = useRef(null);
    const { addNewCategoryNode, deleteCategoryNode, updateCategoryNode } = useContext(NodeContext);

    const [categoryName, setCategoryName] = useState('');
    const [isEditable, setIsEditable] = useState(true);

    const handleEdit = () => {
        setIsEditable(!isEditable);
        console.log(inputRef.current);

        // inputRef.current && inputRef.current.focus();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    };

    const handleSaveNewNode = (
        e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
        e.preventDefault();

        updateCategoryNode(categoryNode.id, { ...categoryNode, name: categoryName });
        setIsEditable(false);
    };

    const handleDeleteNode = () => {
        const isConfirmDelete = window.confirm('Are you sure you want to delete');

        if (isConfirmDelete) {
            deleteCategoryNode(categoryNode.id);
        }
    };

    const handleCancelCreateNode = () => {
        categoryNode.name ? setIsEditable(false) : deleteCategoryNode(categoryNode.id);
    };

    useEffect(() => {
        setCategoryName(categoryNode.name);
        setIsEditable(!categoryNode.name);
    }, [categoryNode]);

    return (
        <div className={cn('category', { 'category--with-line': categoryNode.subCategories.length })}>
            <div className='category__header'>
                <form onSubmit={handleSaveNewNode}>
                    <input
                        type='text'
                        value={categoryName}
                        onChange={handleInputChange}
                        disabled={!isEditable}
                        ref={inputRef}
                        placeholder='Category Name'
                    />
                </form>
                <div className='category__header__actions'>
                    {isEditable ? (
                        <>
                            <button className='btn-cancel' onClick={handleCancelCreateNode}>
                                x
                            </button>
                            <button onClick={handleSaveNewNode} className='btn-save'>
                                s
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => addNewCategoryNode(categoryNode.id, '')} className='btn-add'>
                                +
                            </button>
                            <button onClick={handleEdit} className='btn-edit'>
                                e
                            </button>
                            {categoryNode.id !== '1' && (
                                <button onClick={handleDeleteNode} className='btn-delete'>
                                    x
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
            {categoryNode.subCategories.length > 0 && (
                <div
                    className={cn('category__subcategories', {
                        'category__subcategories--with-line': categoryNode.subCategories.length > 1,
                    })}
                >
                    {categoryNode.subCategories.map((child, index) => (
                        <React.Fragment key={index}>
                            <CategoryNode categoryNode={child} />
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryNode;
