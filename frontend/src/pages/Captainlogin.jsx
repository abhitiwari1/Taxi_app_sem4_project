import React, {useState, useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const Captainlogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { captain, setCaptain } = useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      email: email,
      password: password,
    };

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
    if (response.status === 200) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/captain-home");
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-5"
          src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Emblem.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 mb-7 w-full text-base placeholder: text-sm"
            type="email"
            placeholder="Enter your email"
          />
          <h3 className="text-lg mb-2">Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-[#eeeeee] rounded px-4 py-2 mb-10 w-full text-base placeholder: text-sm"
            type="password"
            placeholder="Enter your password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base"> Login </button>
        </form>
        <p className="text-center"> 
           New here?
          <Link to="/captain-signup" className="text-blue-600"> Register as a Captain </Link>
        </p>
      </div>

      <div>
        <Link to="/login" className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-base">
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default Captainlogin;