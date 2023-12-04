import React, { useEffect, useState } from 'react';
import './AuthenticationPage.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../../components/utils/requestAPI';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {

  const { setAuth } = useAuth();

  const [user, setUser] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirm, setConfirm] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = '/api/User/registration';
    const data = {
      userName: username,
      password: password,
      email: email
    };

    setIsLoading(true);
    try {
      if (password === confirm) {
        const response = await api.post(url, data);
        setUser(response.data)
        console.log(response.data)
      }

      setIsLoading(false);
    } catch (error) {
      console.error(error);
      // Xử lý lỗi ở đây
    }

    if (isLoading) {
      return;
    }
  }

  useEffect(() => {
    async function fetchUserData() {
      try {
        const url = '/api/User/login';
        const data = {
          userName: username,
          password: password,
        }
        const response = await api.post(url, data);
        var authen = response.data;
        setAuth({ user, authen });
        console.log(authen);
        navigate('/update-info');
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserData();
  }, [user])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className="authentication-section">
      <a href='/home' className='homepage-link'> Về trang chủ</a>
      <div className="authentication-container">
        <h2>Đăng ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="authentication-input-container">
            <label htmlFor="username" className='authentication-input-container-label' >Tên đăng nhập</label>
            <input type="text" id="name" name="name" className='authentication-input' placeholder='Tên đăng nhập' required onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div className="authentication-input-container">
            <label htmlFor="email" className='authentication-input-container-label'>Email</label>
            <input type="email" id="email" name="email" className='authentication-input' placeholder='Email' required onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="authentication-input-container">
            <label htmlFor="password" className='authentication-input-container-label'>Mật khẩu</label>
            <div className="input-password">
              <input type={showPassword ? "text" : "password"} id="password" name="password" className='authentication-input' placeholder='Mật khẩu' required onChange={(event) => setPassword(event.target.value)} />
              <button type="button" className="sign-up-password-toggle-button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

          </div>
          <div className="authentication-input-container">
            <label htmlFor="password-confirm" className='authentication-input-container-label'>Xác nhận mật khẩu</label>
            <div className="input-password">
              <input type={showConfirmPassword ? "text" : "password"} id="password-confirm" name="password-confirm" className='authentication-input' placeholder='Xác nhận mật khẩu' required onChange={(event) => setConfirm(event.target.value)} />
              <button type="button" className="confirm-password-toggle-button" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className='authentication-button'>Đăng ký</button>
        </form>
        <p>Bạn đã có tài khoản? <Link to='/log-in'>Đăng nhập</Link></p>
      </div>
    </div>
  );
}

export default SignUpPage;
