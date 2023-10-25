import './style.scss';

import { useContext } from 'react';

import CategoryNode from '@/components/CategoryNode';
import { NodeContext } from '@/contexts/categoryContext';

const Area = () => {
    const { categoryNode } = useContext(NodeContext);

    return (
        <main className='area'>
            <CategoryNode categoryNode={categoryNode} />
        </main>
    );
};

export default Area;
