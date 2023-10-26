import './style.scss';

import { useContext, useState } from 'react';

import CategoryNode from '@/components/CategoryNode';
import { NodeContext } from '@/contexts/categoryContext';
import { ViewContext } from '@/contexts/viewContext';

const Area = () => {
    const { categoryNode } = useContext(NodeContext);
    const { zoom, position, handlePointerMove } = useContext(ViewContext);

    const [isDragging, setIsDragging] = useState(false);

    return (
        <main className='area'>
            <div
                className='wrapper'
                onPointerDown={() => setIsDragging(true)}
                onPointerUp={() => setIsDragging(false)}
                onPointerMove={(e) => handlePointerMove(isDragging, e)}
                style={{
                    transform: `translateX(${position.x}px) translateY(${position.y}px) scale(${zoom / 100})`,
                }}
            >
                <CategoryNode categoryNode={categoryNode} />
            </div>
        </main>
    );
};

export default Area;
