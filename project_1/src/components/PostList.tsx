import { useMemo, useState, type SetStateAction } from 'react';
import MySelect from './UI/select/MySelect.tsx';
import MyButton from './UI/button/MyButton.tsx';
import { PostItem } from './PostItem/PostItem';
import { usePostContext } from '../context/usePostContext';

const PostList = () => {
  const { posts, removePost, updatePost, updateStatus } = usePostContext();
  const [selectedSort, setSelectedSort] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const sortedPosts = useMemo(() => {
    const data = {
      ['text']: [...posts].sort((a, b) => a.text.localeCompare(b.text)),
      ['title']: [...posts].sort((a, b) => a.title.localeCompare(b.title)),
      ['data']: [...posts].sort((a, b) => +b.data - +a.data),
      ['old']: [...posts].sort((a, b) => +a.data - +b.data),
      ['']: posts,
    };
    return data[selectedSort as keyof typeof data];
  }, [selectedSort, posts, searchQuery]);

  const sortedAndSearchPosts = useMemo(() => {
    return sortedPosts.filter(
      (post: { title: string; text: string }) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, sortedPosts]);
  const sortPosts = (sort: SetStateAction<string>) => {
    setSelectedSort(sort);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <MySelect
          value={selectedSort}
          onChange={sortPosts}
          defaultValue="Сортировка"
          options={[
            { value: 'old', name: 'Старые' },
            { value: 'data', name: 'Новые' },
            { value: 'title', name: 'По названию' },
            { value: 'text', name: 'По описанию' },
          ]}
        ></MySelect>
        <div>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск..."
            className="min-w-[200] border-2 border-indigo-600 rounded-[1vw] p-2 -mt-[100px] bg-indigo-800"
          />
          <MyButton additionalStyle="m-2">Поиск</MyButton>
        </div>
      </div>
      {sortedAndSearchPosts.length !== 0 ? (
        sortedAndSearchPosts.map((post, count: number) => (
          <PostItem
            removePost={removePost}
            updateStatus={updateStatus}
            updatePost={updatePost}
            key={post.id}
            {...post}
            index={count}
          />
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
