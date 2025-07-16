import React, {StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        {<App /> as React.ReactNode}  {/* Приводим явно к типу React.ReactNode */}
    </StrictMode>
);
