import { colorShadow } from '../ReduxComponents/type/type';
import { useLoadUser } from '../ReduxComponents/hooks/useLoadUser';
import LoadSpinner from './LoadSpinner';
import Error404Page from '../ReduxComponents/RoutersPage/Error404Page';
import ProfileInfo from './ProfileInfo';

const Profile = () => {
  const { user, loading } = useLoadUser();
  if (loading) return <LoadSpinner />;

  if (!user)
    return (
      <>
        <Error404Page />
      </>
    );

  return (
    <div className={`h-screen`}>
      <div>
        <div
          className={`pt-[20px] mx-auto h-[300px] bg-cover bg-center bg-no-repeat items-center`}
          style={{ backgroundImage: `url(${user.cover})` }}
        >
          <div
            className={`mx-auto dark:${colorShadow} shadow-sl justify-center w-[200px] h-[200px] rounded-full bg-cover bg-center bg-no-repeat grid place-items-center`}
            style={{ backgroundImage: `url(${user.profile})` }}
          ></div>
          {/*
          <div className={`${colorShadow} ${colorBase}`}>
            <h3 className={`relative text-white text-center text-[40px] font-semibold `}>{user.email}</h3>
          </div>*/}
        </div>
      </div>
      <ProfileInfo />
    </div>
  );
};
export default Profile;
