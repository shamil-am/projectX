import './style.scss';
import { FaLocationArrow } from 'react-icons/fa6';
import { ViewContext } from '@/contexts/viewContext';
import { useContext } from 'react';

const Header = () => {
    const { zoom, zoomIn, zoomOut, setZoom, reset } = useContext(ViewContext);

    return (
        <header className='header'>
            <div className='header__title'>
                <h1>Services</h1>
            </div>
            <div className='header__actions'>
                <div className='header__actions__center'>
                    <button onClick={reset}>
                        <FaLocationArrow />
                    </button>
                </div>
                <div className='header__actions__zoom'>
                    <button onClick={zoomOut}>-</button>
                    <select value={zoom} onChange={(e) => setZoom(+e.target.value)}>
                        {Array.from(Array(20), (_, i) => i * 10 + 10).map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                    <button onClick={zoomIn}>+</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
