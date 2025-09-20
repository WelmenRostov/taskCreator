export const loadUserFromLocalStorage = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    console.log(accessToken);
    return {
      accessToken,
    };
  } else {
    return 'Пизда вашему токену';
  }
  return null;
};
