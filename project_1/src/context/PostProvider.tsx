import { type FC, type ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostContext } from './usePostContext';
import { setPosts, addPost, updatePost, removePost, setStatus, setLimit } from '../features/postReducer/postReducer';
import type { Post, TStatus } from '../types/types';
import { fetchTodos } from '../api/todos';
import type { RootState } from '../app/store';

export const PostProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { posts, status, limit, loading } = useSelector((state: RootState) => state.post);

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

        dispatch(setPosts(preparedPosts));
      } catch (error) {
        console.error('Ошибка при загрузке с сервера. Используем localStorage');
        return error;
      }
    };

    loadPosts();
  }, [dispatch, status, limit]);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = (post: Post) => {
    dispatch(addPost(post));
    setModal(false);
  };

  const handleSave = (post: Post) => {
    dispatch(updatePost(post));
  };

  const removePostHandler = (id: number) => {
    dispatch(removePost(id));
  };

  const updatePostHandler = (_id: number, post: Post) => {
    dispatch(updatePost(post));
  };

  const handleStatus = (status: TStatus) => {
    dispatch(setStatus(status));
  };

  const setLimitHandler = (val: number) => {
    dispatch(setLimit(val));
  };

  const updateStatus = (_id: number, updatedPost: Post) => {
    dispatch(updatePost(updatedPost));
  };
  return (
    <PostContext.Provider
      value={{
        posts,
        modal,
        setModal,
        handleSave,
        handleAddPost,
        removePost: removePostHandler,
        updatePost: updatePostHandler,
        updateStatus, // Передаем updateStatus
        handleStatus,
        setLimit: setLimitHandler,
        limit,
        status,
        loading, // Передаем loading
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
