import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import generateDummyData from '@/db';
;

const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user cookie on component mount
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const { users } = generateDummyData();
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      Cookies.set('user', JSON.stringify(userWithoutPassword), { expires: 7 });
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('user');
  };

  return { user, loading, login, logout };
};

export default useUser;
