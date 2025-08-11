import { type FC, type ReactNode, useEffect, useReducer, useState } from 'react';
import { PostContext } from './usePostContext';
import { postReducer } from '../features/postReducer/postReducer';
import type { Post, TStatus } from '../types/types';
import { fetchTodos } from '../api/todos';
import { PostActionType } from '../features/postReducer/postReducerTypes';

const defaultPosts: Post[] = [
  {
    id: 1,
    count: 1,
    title: 'Добавление задачи',
    text: 'Поле ввода для текста задачи.\nКнопка "Добавить", которая добавляет задачу в список.',
    data: new Date(10000),
    status: 'pending',
    editable: false,
  },
  {
    id: 2,
    count: 2,
    title: 'Отображение задач',
    text: 'Список задач с возможностью отметить задачу как выполненную.\nВозможность удалить задачу из списка.',
    data: new Date(300000),
    status: 'pending',
    editable: false,
  },
];

const getStoredPosts = (): Post[] | null => {
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
};

const initialPosts = getStoredPosts() || defaultPosts;

const initialState = {
  posts: initialPosts,
  status: 'pending' as TStatus,
  limit: 5,
};

export const PostProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [state, dispatch] = useReducer(postReducer, initialState);

  const { status, limit } = state;

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetchTodos(1, limit, status);

        const preparedPosts: Post[] = response.data.map((item: Post) => ({
          id: item.id,
          count: item.count,
          title: item.title,
          text: item.text,
          data: new Date(item.data),
          status: item.status,
          editable: item.editable ?? false,
        }));

        dispatch({ type: PostActionType.SET_POSTS, payload: preparedPosts });
      } catch (error) {
        console.error('Ошибка при загрузке с сервера. Используем localStorage');
        const fallbackPosts = getStoredPosts();
        if (fallbackPosts) {
          dispatch({ type: PostActionType.SET_POSTS, payload: fallbackPosts });
        }
        return error;
      }
    };

    loadPosts();
  }, [status, limit]);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(state.posts));
  }, [state.posts]);

  const handleAddPost = (post: Post) => {
    dispatch({ type: PostActionType.ADD_POST, payload: post });
    setModal(false);
  };

  const handleSave = (post: Post) => {
    dispatch({ type: PostActionType.UPDATE_POST, payload: post });
  };

  const removePost = (id: number) => {
    dispatch({ type: PostActionType.REMOVE_POST, payload: id });
  };

  const updatePost = (_id: number, post: Post) => {
    dispatch({ type: PostActionType.UPDATE_POST, payload: post });
  };

  const updateStatus = (_id: number, updatedPost: Post) => {
    dispatch({
      type: PostActionType.UPDATE_POST,
      payload: { ...updatedPost },
    });
  };

  const handleStatus = (status: TStatus) => {
    dispatch({ type: PostActionType.SET_STATUS, payload: status });
  };

  const setLimit = (val: number) => {
    dispatch({ type: PostActionType.SET_LIMIT, payload: val });
  };

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        modal,
        setModal,
        handleSave,
        handleAddPost,
        removePost,
        updatePost,
        updateStatus,
        handleStatus,
        setLimit,
        limit: state.limit,
        status: state.status,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
