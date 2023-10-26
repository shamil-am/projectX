import './style.scss';

import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { NodeContext } from '@/contexts/categoryContext';
import { ICategoryNode } from '@/types/nodeTypes';
import { BsPencil } from 'react-icons/bs';
import { BsPlus } from 'react-icons/bs';
import { ImCancelCircle } from 'react-icons/im';
import { MdFileDownloadDone } from 'react-icons/md';

interface IProps {
    categoryNode: ICategoryNode;
}

const CategoryNode: FC<IProps> = ({ categoryNode }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { addNewCategoryNode, deleteCategoryNode, updateCategoryNode } = useContext(NodeContext);

    const [categoryName, setCategoryName] = useState('');
    const [isEditable, setIsEditable] = useState(true);

    const handleEdit = () => {
        setIsEditable(!isEditable);
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
        const isConfirmDelete = window.confirm('Are you sure you want to delete?');

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

    useEffect(() => {
        if (isEditable && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditable]);

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
                                <ImCancelCircle />
                            </button>
                            <button onClick={handleSaveNewNode} className='btn-save'>
                                <MdFileDownloadDone />
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => addNewCategoryNode(categoryNode.id, '')} className='btn-add'>
                                <BsPlus />
                            </button>
                            <button onClick={() => handleEdit()} className='btn-edit'>
                                <BsPencil />
                            </button>
                            {categoryNode.id !== '1' && (
                                <button onClick={handleDeleteNode} className='btn-delete'>
                                    <ImCancelCircle />
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
