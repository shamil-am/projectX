import { createContext, FC, ReactNode, useState } from 'react';

interface IProps {
    children?: ReactNode;
}

interface IContextProps {
    zoom: number;
    zoomIn: () => void;
    zoomOut: () => void;
    setZoom: React.Dispatch<React.SetStateAction<number>>;
    position: typeof initialPosition;
    handlePointerMove: (isDragging: boolean, e: any) => void;
    reset: () => void;
}

const ViewContext = createContext<IContextProps>({} as IContextProps);

ViewContext.displayName = 'ViewContext';

const maxZoom = 200;
const minZoom = 10;
const initialZoom = 100;
const initialPosition = {
    x: 0,
    y: 0,
};

const ViewProvider: FC<IProps> = ({ children }) => {
    const [zoom, setZoom] = useState(initialZoom);
    const [position, setPosition] = useState(initialPosition);

    const zoomIn = () => {
        if (zoom < maxZoom) {
            setZoom((prevZoom) => prevZoom + 10);
        }
    };

    const zoomOut = () => {
        if (zoom > minZoom) {
            setZoom((prevZoom) => prevZoom - 10);
        }
    };

    const handlePointerMove = (isDragging: boolean, e: any) => {
        if (isDragging) {
            setPosition({
                x: position.x + e.movementX,
                y: position.y + e.movementY,
            });
        }
    };

    const reset = () => {
        setPosition(initialPosition);
        setZoom(initialZoom);
    };

    return (
        <ViewContext.Provider value={{ zoom, zoomIn, zoomOut, setZoom, position, handlePointerMove, reset }}>
            {children}
        </ViewContext.Provider>
    );
};

export { ViewContext, ViewProvider };
