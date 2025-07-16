import React, {useMemo, useState} from 'react';
import {PostItem} from './PostItem.tsx';
import type {Post} from "../types/types.tsx";
import MySelect from "./UI/select/MySelect.tsx";
import MyButton from "./UI/button/MyButton.tsx";

interface PostListProps {
    posts: Post[];
    removePost: (id: number) => void;
    updatePost: (id: number, updatedPost: Post) => void;
    updateStatus: (id: number, updatedPost: Post) => void;
}

const PostList = ({posts, removePost, handleAddPost, updatePost, updateStatus}: PostListProps) => {

    const [selecterSort, setSelectedSort] = useState('') //сортировка

    const [searchQuery, setSearchQuery] = useState('') //поиск

    const sortedPosts = useMemo(() => {
        if (selecterSort) {
            return [...posts].sort((a, b) => a[selecterSort].localeCompare(b[selecterSort]))
        }
        return posts;
    }, [selecterSort, posts])

    const sortedAndSearchPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.text.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [searchQuery, sortedPosts])
    const sortPosts = (sort) => {
        setSelectedSort(sort)
    }

    return (
        <div
            className="relative bg-indigo-500 shadow-lg shadow-indigo-500/50 border-2 border-indigo-600 rounded-[1vw] m-[30px] pl-3 pr-2 outline-black/5 dark:bg-gray-800 bg-opacity-10 h-auto w-auto">

            <div className="flex justify-between items-center">
                <MySelect
                    value={selecterSort}
                    onChange={sortPosts}
                    defaultValue='Сортировка'
                    options={[
                        {value: 'old', name: 'Старые'},
                        {value: 'data', name: 'Новые'},
                        {value: 'title', name: 'По названию'},
                        {value: 'text', name: 'По описанию'},
                    ]}>
                </MySelect>
                <div>
                    <input
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Поиск..."
                        className="min-w-[200] border-2 border-indigo-600 rounded-[1vw] p-2 -mt-[100px] bg-indigo-800"
                    />
                    <MyButton className="m-2">Поиск</MyButton>
                </div>
            </div>
            {sortedAndSearchPosts.length !== 0 ? (
                sortedAndSearchPosts.map((post, count) => (
                    <PostItem handleAddPost={handleAddPost} removePost={removePost} removePost={removePost} updateStatus={updateStatus}
                              updatePost={updatePost} key={post.id} {...post} index={count}/>
                ))
            ) : (
                <div className="p-10 place-self-center">
                    <h1>Задачи отсутствуют...</h1>
                </div>
            )}
        </div>
    );
};

export default PostList;
