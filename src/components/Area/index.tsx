import './style.scss';

import { useContext, useState } from 'react';

import CategoryNode from '@/components/CategoryNode';
import { NodeContext } from '@/contexts/categoryContext';

const Area = () => {
    const { categoryNode } = useContext(NodeContext);

    const [translate, setTranslate] = useState({
        x: 0,
        y: 0,
    });
    const [isDragging, setIsDragging] = useState(false);

    const handlePointerMove = (e: any) => {
        if (isDragging) {
            setTranslate({
                x: translate.x + e.movementX,
                y: translate.y + e.movementY,
            });
        }
    };

    return (
        <main className='area'>
            <div
                className='wrapper'
                onPointerDown={() => setIsDragging(true)}
                onPointerUp={() => setIsDragging(false)}
                onPointerMove={handlePointerMove}
                style={{
                    transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
                }}
            >
                <CategoryNode categoryNode={categoryNode} />
            </div>
        </main>
    );
};

export default Area;
