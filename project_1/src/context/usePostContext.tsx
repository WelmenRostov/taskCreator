import {createContext, useContext} from "react";

import type {PostContextType} from "../types/types";

export const PostContext = createContext<PostContextType | null>(null);

export const usePostContext = (): PostContextType => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error('usePostContext must be used within a PostProvider');
    }
    return context;
}