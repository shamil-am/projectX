import './globalStyles.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { NodeProvider } from './contexts/categoryContext.jsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <NodeProvider>
            <App />
        </NodeProvider>
    </React.StrictMode>,
);
