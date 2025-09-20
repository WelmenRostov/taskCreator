export const useLocalStorageCleaner = () => {
  const clearStorage = () => {
    localStorage.clear();
    console.log('LocalStorage очищен');
  };

  const clearByPattern = (pattern: string) => {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes(pattern)) {
        localStorage.removeItem(key);
      }
    });
  };

  return { clearStorage, clearByPattern };
};
