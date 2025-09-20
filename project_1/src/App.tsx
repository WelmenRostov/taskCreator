import React from 'react';

// Нда ну и жесть
import Navigation from "./components/Navigation.tsx";
import TaskForm from "./components/TaskForm.tsx";
import PostList from "./components/PostList.tsx";
import {PostProvider} from "./context/PostContext";


export const App: React.FC = () => {

    return (
        <PostProvider>
            <div className={'max-w-[1074px] m-auto'}>
                <Navigation/>
                <PostList/>
                <TaskForm/>
            </div>
        </PostProvider>
    );
};