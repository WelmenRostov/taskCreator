import MyButton from './UI/button/MyButton';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { colorBase, colorShadow, fonColor } from '../ReduxComponents/type/type';
import { useDispatch, useSelector } from 'react-redux';
import { userNewRegister } from '../ReduxComponents/features/user/userThunk';
import type { AppDispatch, RootState } from '../app/store';

interface Errors {
  email?: string;
  password?: string;
  password_confirmation?: string;
  repeatPassword?: string;
}

const Registration = () => {
  const navigate = useNavigate();
  const loading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const [error, setError] = useState<Errors>({
    email: '',
    password: '',
    password_confirmation: '',
    repeatPassword: '',
  });

  const profileRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    const newErrors: Errors = {};

    if (password !== repeatPassword) {
      newErrors.repeatPassword = 'Пароли не совпадают';
      valid = false;
    }

    if (password !== repeatPassword) {
      newErrors.email = 'Пользователь с такой почтой уже есть!';
      valid = false;
    }

    if (!valid) {
      setError(newErrors);
      return;
    }

    setError({
      email: '',
      password: '',
      password_confirmation: '',
      repeatPassword: '',
    });

    const formData = new FormData();

    // Добавляем обычные поля
    formData.append('email', email);
    formData.append('password', password);
    formData.append('login', email.split('@')[0]);

    if (profileRef.current?.files?.[0]) {
      formData.append('profile', profileRef.current.files[0]);
    } else {
      formData.append('profile', 'default');
    }

    if (coverRef.current?.files?.[0]) {
      formData.append('cover', coverRef.current.files[0]);
    } else {
      formData.append('cover', 'default');
    }
    dispatch(userNewRegister(formData));
  };

  useEffect(() => {
    if (loading === 'succeeded') {
      navigate('/user/profile');
    }
  }, [loading, navigate]);

  const login = email.split('@')[0];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);
  const isEmail = isValidEmail
    ? 'rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500'
    : 'border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500';

  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
      if (coverPreview) URL.revokeObjectURL(coverPreview);
    };
  }, [profilePreview, coverPreview]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`resize-none absolute top-0 left-0 w-full h-full ${fonColor} `}></div>
        <div
          className={`shadow-lg w-[400px] item-center justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 rounded-4xl max-w-sm mx-auto p-6 outline-black/5 bg-opacity-50 ${colorBase} ${colorShadow}`}
        >
          <h1 className="text-center font-semibold text-3xl -mt-[20px]">Registration</h1>
          <div className={`flex flex-col `}>
            <>
              <div className={`my-3`}>
                <div
                  style={{
                    backgroundImage: `url(${coverPreview || 'https://wallpaper.feodosia.net/media/wallpaper/landscape/95099-2908x1323.jpg'})`,
                  }}
                  className={` border-2 rounded-6xl w-full rounded-sm bg-cover bg-center bg-no-repeat items-center ${colorBase} ${colorShadow}`}
                >
                  <div
                    style={{
                      backgroundImage: `url(${profilePreview || 'https://i.pinimg.com/originals/cd/4e/1f/cd4e1f05e16939f18909e535463b0808.jpg'})`,
                    }}
                    className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat "
                  >
                    <div className={`${colorBase} bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4 `}>
                      <input
                        type="file"
                        name="profile"
                        id="upload_profile"
                        hidden
                        ref={profileRef}
                        onChange={handleProfileChange}
                      />

                      <label htmlFor="upload_profile">
                        <svg
                          data-slot="icon"
                          className="mt-[2px] w-6 h-5 text-red-500"
                          fill="none"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                          ></path>
                        </svg>
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <input
                      type="file"
                      name="cover"
                      id="upload_cover"
                      hidden
                      ref={coverRef}
                      onChange={handleCoverChange}
                    />

                    <div
                      className={`${colorBase} flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold`}
                    >
                      <label htmlFor="upload_cover" className="inline-flex items-center gap-1 cursor-pointer">
                        Cover
                        <svg
                          data-slot="icon"
                          className="w-6 h-5 text-red-500"
                          fill="none"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                          ></path>
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </>
            <>
              <h2 className="text-2xl font-semibold mb-4">Email</h2>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`w-full p-3 mb-4 rounded-lg border-2 border-gray-600 dark:border-indigo-600 dark:focus:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 ${isEmail}`}
                  placeholder="Email..."
                  maxLength={35}
                  minLength={0}
                />
                {error && <p className="absolute text-red-500 -mt-[20px]">{error.email}</p>}
              </div>

              <h2 className="text-2xl font-semibold mb-4">Login</h2>
              <input
                name="title"
                type="title"
                className={`
                  'w-full p-3 mb-4 rounded-lg border-2 border-gray-600 dark:border-indigo-600 dark:focus:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50
                  '
                `}
                value={login}
                readOnly
                minLength={0}
              />

              <h2 className="text-2xl font-semibold mb-4">Password</h2>

              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mb-4 rounded-lg border-2 border-gray-600 dark:border-indigo-600 dark:focus:ring-blue-400 focus:outline-none
    focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                placeholder="Password..."
                maxLength={30}
                minLength={0}
              />
              <div className="relative">
                <input
                  name="password"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="w-full p-3 mb-4 rounded-lg border-2 border-gray-600 dark:border-indigo-600 dark:focus:ring-blue-400 focus:outline-none
    focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                  placeholder="Repeat the password..."
                  maxLength={30}
                  minLength={0}
                />
                {error && <p className="absolute text-red-500 -mt-[20px]">{error.repeatPassword}</p>}
              </div>
            </>
          </div>

          <MyButton className={`mt-10 btn btn-soft w-full text-2xl `} type="submit" color="blue">
            Log
          </MyButton>
          <NavLink to="/signin">
            <p className=" text-gray-600/100 dark:text-gray-600/200">Login in</p>
          </NavLink>
        </div>
      </form>
    </>
  );
};

export default Registration;
