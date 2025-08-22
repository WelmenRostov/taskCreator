import { useContext, createContext } from 'react';
import type { Post, TStatus } from '../types/types';
import type { AppDispatch, RootState } from '../app/store';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

interface PostContextType {
  posts: Post[];
  limit: number;
  status: TStatus;
  loading: string | undefined;
  modal: boolean;
  setModal: (value: boolean) => void;
  handleAddPost: (post: Post) => void;
  handleSave: (post: Post) => void;
  removePost: (id: number) => void;
  updatePost: (id: number, post: Post) => void;
  updateStatus: (id: number, post: Post) => void;
  handleStatus: (status: TStatus) => void;
  setLimit: (val: number) => void;
}

export const PostContext = createContext<PostContextType | null>(null);

export const usePostContext = () => {
  const context = useContext(PostContext);
  console.log('Юзается контекст');
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};
