import type { Post, TStatus } from '../../types/types';

export interface PostState {
  posts: Post[];
  status: TStatus;
  limit: number;
}

export const PostActionType = {
  SET_POSTS: 'SET_POSTS',
  ADD_POST: 'ADD_POST',
  UPDATE_POST: 'UPDATE_POST',
  REMOVE_POST: 'REMOVE_POST',
  SET_STATUS: 'SET_STATUS',
  SET_LIMIT: 'SET_LIMIT',
} as const;

export type PostAction =
  | { type: typeof PostActionType.SET_POSTS; payload: Post[] }
  | { type: typeof PostActionType.ADD_POST; payload: Post }
  | { type: typeof PostActionType.UPDATE_POST; payload: Post }
  | { type: typeof PostActionType.REMOVE_POST; payload: number }
  | { type: typeof PostActionType.SET_STATUS; payload: TStatus }
  | { type: typeof PostActionType.SET_LIMIT; payload: number };
