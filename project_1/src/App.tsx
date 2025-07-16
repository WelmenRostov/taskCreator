import React, {useEffect, useState} from 'react';
import Navigation from "./components/Navigation.tsx";
import TaskForm from "./components/TaskForm.tsx";
import PostList from "./components/PostList.tsx";
import type {Post} from "./types/types.tsx";

export const App: React.FC = () => {
    const [modal, setModal] = useState(false)

    const postsState: Post[] = [
        {
            id: 1,
            count: 1,
            title: "Добавление задачи",
            text: 'Поле ввода для текста задачи.\n' +
                'Кнопка "Добавить", которая добавляет задачу в список.',
            data: (new Date(10000)),
            status: 'pending'
        },
        {
            id: 2,
            count: 2,
            title: "Отображение задач",
            text: 'Список задач с возможностью отметить задачу как выполненную.\n' +
                'Возможность удалить задачу из списка.',
            data: new Date(300000),
            status: 'pending'
        },
        {
            id: 3,
            count: 3,
            title: "Редактирование задачи",
            text: 'Добавьте кнопку "Редактировать" для каждой задачи.\n' +
                'При нажатии на кнопку открывается форма редактирования текста задачи.',
            data: new Date(600000),
            status: 'editor'
        },
        {
            id: 4,
            count: 4,
            title: "Сохранение задач",
            text: 'Бетта',
            data: new Date(900000),
            status: 'pending'
        },
        {
            id: 5,
            count: 5,
            title: "Гамма",
            text: 'Задачи должны сохраняться в localStorage и восстанавливаться при перезагрузке страницы.',
            data: new Date(1200000),
            status: 'pending'
        },]

    const [posts, setPosts] = useState<Post[]>(postsState);


    const updatePost = (id: number, updatedPost: Post) => {
        setPosts(prevPosts => {
            return prevPosts.map(post =>
                post.id === id ? updatedPost : post
            );
        });
    };

    const updateStatus = (id: number, updatedPost: Post) => {
        setPosts(prevPosts => {
            return prevPosts.map(post =>
                post.id === id ? { ...post, status: updatedPost.status } : post
            );
        });
    };

    const handleAddPost = (post: Post) => {
        setPosts((prev) => {
            return [...prev, post]
        })
        setModal(false)
    }

    const removePost = (id: number) => {
        setPosts(posts.filter(p => p.id !== id));
    };

    useEffect(() => {
        console.log('Posts changed:', posts);
    }, [posts]);

    return (
        <>
            <Navigation setVisible={setModal}/>
            <PostList posts={posts} removePost={removePost} updatePost={updatePost} updateStatus={updateStatus}/>
            <TaskForm handleAddPost={handleAddPost} modal={modal} setModal={setModal}/>
        </>
    );
};