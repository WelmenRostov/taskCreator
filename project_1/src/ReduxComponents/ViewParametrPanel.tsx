import MySelect from '../components/UI/select/MySelect';
import MyButton from '../components/UI/button/MyButton';
import { colorBase } from './type/type';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy, setLimit, setSearchText } from './features/todos/todoSlice';
import type { AppDispatch, RootState2 } from '../app/store';
import { useEffect, useState } from 'react';

const ParameterViewingPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const sortBy = useSelector((state: RootState2) => state.todo.sortBy);
  const limit = useSelector((state: RootState2) => state.todo.limit);
  const [search, setSearch] = useState('');
  const handleSearch = () => {
    dispatch(setSearchText(search));
  };

  useEffect(() => {
    dispatch(setSearchText(search));
  }, [search]);

  return (
    <div className={`flex justify-between items-center ${colorBase} `}>
      {/* Сортировка */}
      <MySelect
        defaultValue="Сортировка"
        value={sortBy}
        options={[
          { value: 'new', name: 'Новые' },
          { value: 'old', name: 'Старые' },
          { value: 'title', name: 'По названию' },
          { value: 'text', name: 'По описанию' },
        ]}
        onChange={(value) => dispatch(setSortBy(value))}
      />

      {/* Количество элементов на странице */}
      <div className="join mr-auto ml-[10px]">
        {[5, 10, 20].map((num) => (
          <button
            key={num}
            className={`join-item btn bg-indigo-800 active:bg-indigo-900 ${limit === num ? 'btn-active' : ''}`}
            onClick={() => dispatch(setLimit(num))} // убедись, что num — число
            type="button" // важно, чтобы кнопка не отправляла форму
          >
            {num}
          </button>
        ))}
      </div>

      {/* Поиск */}
      <div className="flex justify-between items-center ml-[10px]">
        <input
          placeholder="Поиск..."
          className="min-w-[200px] rounded-[1vw] p-2 bg-indigo-800 text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MyButton additionalStyle="m-2 btn btn-soft" onClick={handleSearch}>
          Поиск
        </MyButton>
      </div>
    </div>
  );
};

export default ParameterViewingPanel;
