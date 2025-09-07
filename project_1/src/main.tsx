import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { PostProvider } from './context/PostProvider';

createRoot(document.getElementById('root')!).render(
  (
    <Provider store={store}>
      <PostProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostProvider>
    </Provider>
  ) as React.ReactNode
);
