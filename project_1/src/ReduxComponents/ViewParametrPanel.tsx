import MySelect from '../components/UI/select/MySelect';
import MyButton from '../components/UI/button/MyButton';
import { colorBase } from './type/type';

const ParameterViewingPanel = () => {
  return (
    <>
      <div className={`flex justify-between items-center ${colorBase}`}>
        <MySelect
          value={1}
          onChange={1}
          defaultValue="Сортировка"
          options={[
            { value: 'old', name: 'Старые' },
            { value: 'data', name: 'Новые' },
            { value: 'title', name: 'По названию' },
            { value: 'text', name: 'По описанию' },
          ]}
        />
        <div className="join mr-auto ml-[10px]">
          <button className="join-item btn bg-indigo-800 active:bg-indigo-900">5</button>
          <button className="join-item btn bg-indigo-800 active:bg-indigo-900">10</button>
          <button className="join-item btn bg-indigo-800 active:bg-indigo-900">20</button>
        </div>
        <div className="flex justify-between items-center ml-[10px]">
          <input placeholder="Поиск..." className="min-w-[200] rounded-[1vw] p-2 bg-indigo-800" />
          <MyButton additionalStyle="m-2 btn btn-soft">Поиск</MyButton>
        </div>
      </div>
    </>
  );
};

export default ParameterViewingPanel;
