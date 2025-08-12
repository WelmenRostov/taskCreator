import { useContext, createContext } from 'react';
import type { Post, TStatus } from '../types/types';

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
  updateStatus: (id: number, post: Post) => void; // Добавляем updateStatus
  handleStatus: (status: TStatus) => void;
  setLimit: (val: number) => void;
}

export const PostContext = createContext<PostContextType | null>(null);

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
};
