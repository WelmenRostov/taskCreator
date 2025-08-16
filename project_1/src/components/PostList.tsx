import { useMemo, useState, type SetStateAction } from 'react';
import MySelect from './UI/select/MySelect';
import MyButton from './UI/button/MyButton';
import { PostItem } from './PostItem/PostItem';
import { usePostContext } from '../context/usePostContext';

const PostList = () => {
  const { posts, removePost, updatePost, updateStatus, setLimit, limit } = usePostContext();
  const [selectedSort, setSelectedSort] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const postsWithDates = posts.map((post) => ({
    ...post,
    data: new Date(post.data).toISOString(),
  }));

  const sortedPosts = useMemo(() => {
    const data = {
      ['text']: [...postsWithDates].sort((a, b) => a.text.localeCompare(b.text)),
      ['title']: [...postsWithDates].sort((a, b) => a.title.localeCompare(b.title)),
      ['data']: [...postsWithDates].sort((a, b) => +b.data - +a.data),
      ['old']: [...postsWithDates].sort((a, b) => +a.data - +b.data),
      ['']: postsWithDates, // Без сортировки
    };
    return data[selectedSort as keyof typeof data];
  }, [selectedSort, postsWithDates, searchQuery]);

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
    <div className="h-full">
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
        <div className="join mr-auto ml-[10px]">
          <button
            className={`join-item btn bg-indigo-800 ${limit === 5 ? 'bg-indigo-950' : ''} active:bg-indigo-900 `}
            onClick={() => setLimit(5)}
          >
            5
          </button>
          <button
            className={`join-item btn bg-indigo-800 ${limit === 10 ? 'bg-indigo-950' : ''} active:bg-indigo-900 `}
            onClick={() => setLimit(10)}
          >
            10
          </button>
          <button
            className={`join-item btn bg-indigo-800 ${limit === 20 ? 'bg-indigo-950' : ''} active:bg-indigo-900 `}
            onClick={() => setLimit(20)}
          >
            20
          </button>
        </div>
        <div className={'flex justify-between items-center ml-[10px]'}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск..."
            className="min-w-[200] rounded-[1vw] p-2 bg-indigo-800"
          />
          <MyButton additionalStyle="m-2 btn btn-soft">Поиск</MyButton>
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
