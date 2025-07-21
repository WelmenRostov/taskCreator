import { type FC, type ReactNode, useEffect, useState } from 'react';
import type { Post } from '../types/types';
import { PostContext } from './usePostContext';

export const PostProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const storedPosts = (() => {
    try {
      const raw = localStorage.getItem('posts');
      if (!raw) return null;

      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return null;

      return parsed.map((post: Post) => ({
        ...post,
        data: new Date(post.data),
      }));
    } catch (error) {
      console.error('Ошибка чтения localStorage:', error);
      return null;
    }
  })();

  const defaultPosts: Post[] = [
    {
      id: 1,
      count: 1,
      title: 'Добавление задачи',
      text: 'Поле ввода для текста задачи.\nКнопка "Добавить", которая добавляет задачу в список.',
      data: new Date(10000),
      status: 'pending',
    },
    {
      id: 2,
      count: 2,
      title: 'Отображение задач',
      text: 'Список задач с возможностью отметить задачу как выполненную.\nВозможность удалить задачу из списка.',
      data: new Date(300000),
      status: 'pending',
    },
    {
      id: 3,
      count: 3,
      title: 'Редактирование задачи',
      text: 'Добавьте кнопку "Редактировать" для каждой задачи.\nПри нажатии на кнопку открывается форма редактирования текста задачи.',
      data: new Date(600000),
      status: 'editor',
    },
    {
      id: 4,
      count: 4,
      title: 'Сохранение задач',
      text: 'Бетта',
      data: new Date(900000),
      status: 'pending',
    },
    {
      id: 5,
      count: 5,
      title: 'Гамма',
      text: 'Задачи должны сохраняться в localStorage и восстанавливаться при перезагрузке страницы.',
      data: new Date(1200000),
      status: 'pending',
    },
  ];

  // 🔧 Состояния
  const [posts, setPosts] = useState<Post[]>(storedPosts || defaultPosts);
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const updatePost = (id: number, updatedPost: Post) => {
    setPosts((prevPosts) => prevPosts.map((post) => (post.id === id ? updatedPost : post)));
  };

  const updateStatus = (id: number, updatedPost: Post) => {
    setPosts((prevPosts) => prevPosts.map((post) => (post.id === id ? { ...post, status: updatedPost.status } : post)));
  };
  const handleAddPost = (post: Post) => {
    setPosts((prev) => [...prev, post]);
    setModal(false);
  };

  const handleSave = (post: Post) => {
    setPosts((prev) => {
      const index = prev.findIndex((p) => p.id === post.id);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = post;
        return updated;
      } else {
        return [...prev, post];
      }
    });
  };

  const removePost = (id: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        modal,
        setModal,
        handleSave,
        handleAddPost,
        removePost,
        updatePost,
        updateStatus,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
