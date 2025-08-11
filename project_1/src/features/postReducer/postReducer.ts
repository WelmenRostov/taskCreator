import { type PostAction, PostActionType, type PostState } from './postReducerTypes';

export const postReducer = (state: PostState, action: PostAction): PostState => {
  switch (action.type) {
    case PostActionType.SET_POSTS:
      return { ...state, posts: action.payload };

    case PostActionType.ADD_POST:
      return { ...state, posts: [...state.posts, action.payload] };

    case PostActionType.UPDATE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => (post.id === action.payload.id ? action.payload : post)),
      };

    case PostActionType.REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };

    case PostActionType.SET_STATUS:
      return { ...state, status: action.payload };

    case PostActionType.SET_LIMIT:
      return { ...state, limit: action.payload };

    default:
      return state;
  }
};
