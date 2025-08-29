import { interpolate } from 'd3';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { set } from 'date-fns';
import { useNavigate,useLocation } from 'react-router-dom';
const initialState = { firstName: '', email: '', isLoggedIn: false, id: '' };
export const AuthContext = createContext();

export const getCsrfToken = async () => {
  try {
    const res = await axios.get('http://localhost:8000/csrf/', {
      withCredentials: true,
    });
    return res.data.csrftoken
  } catch (error) {
    console.log(error);
  }
};

export const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(initialState);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const login = async (loginData) => {
    console.log(loginData);
    const csrf = await getCsrfToken();
    const response = await axios.post('http://localhost:8000/login/', loginData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf, // Include the token in the header
      },
      withCredentials: true, // Important for session cookie
    });
    console.log(response.data.user);
    const {firstName,isLoggedIn,role} = response.data.user;
    localStorage.setItem('userName',firstName);
    localStorage.setItem('role',role.replace(/\s/g, "").toLowerCase())
    setLoginData({ ...response.data.user });
    if (isLoggedIn) {
      navigate('/', { replace: true });
    }
  };
  const logout = async () => {
    try {
      const csrf = await getCsrfToken();
      await axios
        .post(
          'http://localhost:8000/logout/',
          {},
          {
            headers: {
              'X-CSRFToken': csrf,
            },
            withCredentials: true,
          }
        )
        .then(async (res) => {
          console.log(res.data.user);
          const { isLogged } = res.data;
          if (!isLogged) {
            navigate('/login');
          }
        });
        localStorage.clear()
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
   console.log('AuthContext UseEffect')
   if(location.pathname === '/login' || location.pathname === '/register') return;
   !loginData.isLoggedIn ?  navigate('/login'):navigate('/', { replace: true })
  }, []);
  return (
    <AuthContext.Provider value={{ ...loginData, login, logout }}>{children}</AuthContext.Provider>
  );
};
