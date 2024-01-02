import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TaskProvider } from './contexts/tasks.context';
import { FilterProvider } from './contexts/filter.context';
import '@fontsource/inter';
import StickWallProvider from './contexts/sticky-wall.context';
import SearchProvider from './contexts/search.context';
import { UserProvider } from './contexts/user.context';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <FilterProvider>
    <StickWallProvider>
    <TaskProvider>
    <SearchProvider>
      
        <App />
        
    </SearchProvider>
    </TaskProvider>
    </StickWallProvider>
    </FilterProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
