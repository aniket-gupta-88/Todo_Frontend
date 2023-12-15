import React, { useState, useEffect } from 'react';
import { login } from '../services/api.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header.jsx';

const Login = () => {
  const navigation = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if(user){
      navigation("/")
    }
  }, [navigation])
  


  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    console.log(result);
   setErrors(null);
    
    if(result.status === 200){
        if(result.data.status === 200){
            localStorage.setItem('user', JSON.stringify(result.data.data))
            navigation("/");
            return;
        }
        if(result.data.status === 201){
          toast(result.data.msg);
            setErrors(result.data.data);
            return;
        }

        if(result.data.status===202){
            toast(result.data.message);
            return;
        }
    }
   
  }

  return (
    <>
    <Header />
    <div className="container">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-4">
          <form className="mt-5" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label mt-4">
                User Name
              </label>
              <input
                type="text"
                onChange={handleChange}
                name='username'
                className="form-control"
                id="username"
                aria-describedby="usernameHelp"
                placeholder="Enter Username"
              />
              {
                errors?.username && <small id="usernameHelp" className="form-text text-muted">
                {errors.username.msg}
              </small>
              }
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1" className="form-label mt-4">
                Password
              </label>
              <input
                type="password"
                onChange={handleChange}
                name='password'
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                autoComplete="off"
              />
              {
                errors?.password && <small id="usernameHelp" className="form-text text-muted">
                { errors.password.msg}
              </small>
              }
            </div>
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
