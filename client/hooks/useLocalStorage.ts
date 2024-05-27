import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
  console.log(initialValue)
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
   
    try {
      const item = window.localStorage.getItem(key);
      console.log(item)
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    console.log(value)
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      console.log(storedValue)
      
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
