import { colorShadow } from '../ReduxComponents/type/type';
import { useLoadUser } from '../ReduxComponents/hooks/useLoadUser';

const Profile = () => {
  const { user, loading, error } = useLoadUser();

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!user) return <div>Пользователь не найден</div>;

  return (
    <div>
      <div>
        <div
          className={`pt-[20px] mx-auto h-[300px] bg-cover bg-center bg-no-repeat items-center`}
          style={{ backgroundImage: `url(${user.cover})` }}
        >
          <div
            className={`mx-auto dark:${colorShadow} shadow-sl justify-center w-[200px] h-[200px] rounded-full bg-cover bg-center bg-no-repeat grid place-items-center`}
            style={{ backgroundImage: `url(${user.profile})` }}
          ></div>
          <h3 className={`relative text-white text-center text-[30px] font-semibold rounded-full bg-indigo`}>
            {user.email}
          </h3>
        </div>
      </div>
    </div>
  );
};
export default Profile;
