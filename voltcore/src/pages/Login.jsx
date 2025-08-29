import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import '../index.css';
// import { loginUserService } from '../api/services';
import axios from 'axios';
import { useAuth } from '../CustomHook/useAuth';
function Login() {
  const [loginData, setLoginIndata] = useState({
    userName: '',
    password: '',
  });
  const auth = useAuth()
  // const navigate = useNavigate();
  const handleLogin = async (test) => {
    // if (username === 'admin' && password === '123456') {
    //   // localStorage.setItem('isLoggedIn', 'true'); // ✅ set login flag
    //   navigate('/home');
    // } else {
    //   alert('Invalid username or password');
    // }
    if (test) {
      const csrf = await getCsrfToken();
      const response = axios.post('http://localhost:8000/login/', loginData, {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf, // Include the token in the header
        },
        withCredentials: true, // Important for session cookie
      });
    } else {
      try {
        const csrf = await getCsrfToken();
        const response = await axios.post(
          'http://localhost:8000/test/',
          {},
          {
            headers: {
              'X-CSRFToken': csrf,
            },
            withCredentials: true,
          }
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error('Authentication test failed:', error);
        throw error;
      }
    }
  };

  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginIndata((prev) => ({ ...prev, [name]: value }));
  };
  const getCsrfToken = async () => {
    try {
      const res = await axios.get('http://localhost:8000/csrf/', {
        withCredentials: true,
      });
      const data = res.data;
      console.log(data.csrftoken);
      return data.csrftoken;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="title">Corevolt HRMS</h2>
        <div className="login-form">
          <label>Username</label>
          <input
            type="text"
            name="userName"
            onChange={(e) => {
              handleLoginInput(e);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => {
              handleLoginInput(e);
            }}
          />
          <button
            onClick={() => {
              // handleLogin(true);
              auth.login(loginData)
            }}
          >
            Login
          </button>
          <button
            onClick={async () => {
              const csrf = await getCsrfToken();
              try {
                await axios.post(
                  'http://localhost:8000/logout/',
                  {},
                  {
                    headers: {
                      'X-CSRFToken': csrf,
                    },
                    withCredentials: true,
                  }
                );
              } catch (error) {
                console.log(error);
              }
            }}
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
