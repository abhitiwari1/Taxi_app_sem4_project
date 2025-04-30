import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext.jsx";
import axios from "axios";


const Userlogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const {user, setUser} = useContext(UserDataContext);

    const submitHandler = async (e) => {
      e.preventDefault();
      const userData = { 
        email: email,
        password: password,
      };
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    
      setEmail("");
      setPassword("");
    }
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img className="w-16 ml-1 mb-5" src="https://1000marcas.net/wp-content/uploads/2020/10/Uber-Logo.png" alt=""/>
        <form onSubmit = {(e) => {
            submitHandler(e)
        }}>
          <h3 className="text-lg mb-2">What's your email</h3>
          <input
            required

            value={email}
            onChange={(e)=> setEmail(e.target.value)}

            className="bg-[#eeeeee] rounded px-4 py-2 mb-5 w-full text-base placeholder: text-sm"
            type="email"
            placeholder="Enter your email"
          />
          <h3 className="text-lg mb-2">Password</h3>
          <input
            required

            value={password}
            onChange={(e)=> setPassword(e.target.value)}

            className="bg-[#eeeeee] rounded px-4 py-2 mb-15 w-full text-base placeholder: text-sm"
            type="password"
            placeholder="Enter your password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base"> Login </button>
        </form>
        <p className="text-center"> New here? <Link to='/signup' className="text-blue-600">Register as a User</Link></p>
      </div>

      <div>
        <Link to='/captain-login' className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2 w-full text-base">
            Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default Userlogin;
