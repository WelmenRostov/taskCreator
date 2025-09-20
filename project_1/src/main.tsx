import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from './app/store'; // persistor добавили
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LoadSpinner from './components/LoadSpinner';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate
      loading={<LoadSpinner />}
      persistor={persistor}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
