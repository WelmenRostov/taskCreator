import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './app/store'; // persistor добавили
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PostProvider } from './context/PostProvider';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <PostProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostProvider>
    </PersistGate>
  </Provider>
);
