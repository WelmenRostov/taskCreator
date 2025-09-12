import { colorBase } from '../ReduxComponents/type/type';
import { useLoadUser } from '../ReduxComponents/hooks/useLoadUser';

const ProfileInfo = () => {
  const { user } = useLoadUser();
  console.log(user);
  return (
    <>
      <div className={`${colorBase} mt-10`}>
        <div className="px-6 lg:max-w-7xl lg:px-8 ">
          <h2 className="text-base/7 font-semibold text-indigo-600">Информация о вас</h2>
          <div className={``}>
            <p className={`text-3xl`}>Почта: {user?.email}</p>
            <p className={`text-3xl`}>Логин: {user?.login}</p>
            <p className={`text-3xl`}>Возраст: {user?.login}</p>
            <p className={`text-3xl`}>Дата регистрации: {user?.login}</p>
          </div>
          <h2 className="text-base/7 font-semibold text-indigo-600 mt-10">Статистика:</h2>
          <div className={``}>
            <p className={`text-3xl`}>Всего задач: {user?.login}</p>
            <p className={`text-3xl`}>Создано задач: {user?.login}</p>
            <p className={`text-3xl`}>Выполнено задач: {user?.login}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
