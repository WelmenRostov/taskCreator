import { colorBase } from '../ReduxComponents/type/type';
import { useLoadUser } from '../ReduxComponents/hooks/useLoadUser';
import MyButton from './UI/button/MyButton';
import { useState } from 'react';
import { userPasswordUpdate } from '../ReduxComponents/features/user/userThunk';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../app/store';

const ProfileInfo = () => {
  const { user } = useLoadUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const rUser = localStorage.getItem('persist:root');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [NewPasswordRepeat, setNewPasswordRepeat] = useState('');

  console.log(rUser);

  const handleAddClick = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAddForm(!showAddForm);
  };
  const handleNewPass = (e: React.FormEvent) => {
    e.preventDefault();
    // Базовые проверки перед запросом
    const hasUser = Boolean(user);
    const isLengthOk = newPassword.length >= 6 && oldPassword.length >= 6 && NewPasswordRepeat.length >= 6;
    const isRepeatOk = NewPasswordRepeat === newPassword;
    const isDifferent = oldPassword !== newPassword;

    if (!hasUser) return; // нет пользователя — не отправляем
    if (!(isLengthOk && isRepeatOk && isDifferent)) return; // форма невалидна — выходим

    dispatch(userPasswordUpdate({ oldPassword, newPassword }));
    setShowAddForm(!showAddForm);
  };

  // Безопасные значения для отображения
  const email = user?.email ?? '—';
  const login = user?.login ?? '—';
  const age = user?.age ?? '—';

  // Валидации формы изменения пароля
  const isLenOk = newPassword.length >= 6 && oldPassword.length >= 6 && NewPasswordRepeat.length >= 6;
  const isEqual = NewPasswordRepeat === newPassword;
  const isNewDifferent = oldPassword !== newPassword && newPassword.length > 0;
  const isFormValid = isLenOk && isEqual && isNewDifferent && Boolean(user);

  // Если пользователя нет — рендерим плейсхолдер (доп. защита от ошибок доступа к полям)
  if (!user) {
    return (
      <>
        <div className={`${colorBase} mt-10`}>
          <div className="px-6 lg:max-w-7xl lg:px-8 ">
            <h2 className="text-base/7 font-semibold text-indigo-600">Информация о вас</h2>
            <p className={`text-3xl`}>Данные пользователя загружаются…</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className={`${colorBase} mt-10`}>
        <div className="px-6 lg:max-w-7xl lg:px-8 ">
          <h2 className="text-base/7 font-semibold text-indigo-600">Информация о вас</h2>
          <div className={``}>
            <p className={`text-3xl`}>Почта хуечта: {email}</p>
            <p className={`text-3xl`}>Логин: {login}</p>
            <p className={`text-3xl`}>Возраст: {age}</p>
            <p className={`text-3xl`}>Дата регистрации: {age}</p>
          </div>
          <h2 className="text-base/7 font-semibold text-indigo-600 mt-10">Статистика:</h2>
          <div className={``}>
            <p className={`text-3xl`}>Всего задач: —</p>
            <p className={`text-3xl`}>Выполнено задач: —</p>
            <p className={`text-3xl`}>Проваленных задач: —</p>
          </div>
        </div>
        <div className={`m-[32px]`}>
          <MyButton
            className={`btn btn-square btn-soft ${showAddForm ? 'active' : ''} w-auto`}
            onClick={handleAddClick}
            title="Добавить новую задачу"
          >
            {showAddForm ? 'Отмена' : 'Изменить пароль'}
          </MyButton>
          {showAddForm && (
            <div className={`add-form-container mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded`}>
              <h3 className="text-lg font-medium mb-3">Смена пароля</h3>
              <form className="space-y-3">
                <div>
                  <label htmlFor="taskTitle" className="block text-sm font-medium mb-1">
                    Старый пароль:
                  </label>
                  <input
                    type="password"
                    maxLength={30}
                    minLength={6}
                    name="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    id="taskTitle"
                    className="w-[250px] px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    placeholder=""
                  />
                </div>
                <div>
                  <label htmlFor="taskDescription" className="block text-sm font-medium mb-1">
                    Новый пароль:
                  </label>
                  <input
                    id="taskDescription"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    maxLength={30}
                    minLength={6}
                    className="w-[250px] px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    placeholder=""
                  ></input>
                </div>
                <div>
                  <label htmlFor="taskDescription" className="block text-sm font-medium mb-1">
                    Повторите пароль:
                  </label>
                  <input
                    id="taskDescription"
                    type="password"
                    maxLength={30}
                    value={NewPasswordRepeat}
                    onChange={(e) => setNewPasswordRepeat(e.target.value)}
                    minLength={6}
                    className="w-[250px] px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
                    placeholder=""
                  ></input>
                </div>
                {/* Подсказки валидации */}
                <div className="text-sm text-red-500 space-y-1">
                  {!isLenOk && <p>Пароли должны быть длиной не менее 6 символов.</p>}
                  {!isEqual && <p>Пароли не совпадают.</p>}
                  {!isNewDifferent && <p>Новый пароль не должен совпадать со старым.</p>}
                </div>
                <div className="flex justify-start space-x-2">
                  <MyButton
                    type="button"
                    onClick={handleNewPass}
                    className="px-4 py-2 text-sm bg-gray-300  rounded-md hover:bg-gray-400 dark:bg-gray-600 dark:text-gray-200"
                    disabled={!isFormValid}
                  >
                    Изменить
                  </MyButton>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
