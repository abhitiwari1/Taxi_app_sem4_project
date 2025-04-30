import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const UserSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate();

    const {user, setUser} = useContext(UserDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname:{
              firstname: firstName,
              lastname: lastName,
            },
            email: email,
            password: password,
        };

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

        if (response.status === 201) {
          const data = response.data;
          setUser(data.user);
          localStorage.setItem("token", data.token);
          navigate("/home");
        }

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }

  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-5"
          src="https://1000marcas.net/wp-content/uploads/2020/10/Uber-Logo.png"
          alt=""
        />
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg mb-2">What's your name</h3>
          <div className='flex gap-4 mb-5'>
            <input
                required

                value = {firstName}
                onChange={(e) => setFirstName(e.target.value)}

                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder: text-sm"
                type="text"
                placeholder="First name"
            />
            <input
                value = {lastName}
                onChange={(e) => setLastName(e.target.value)}
                
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 text-base placeholder: text-sm"
                type="text"
                placeholder="Last name"
            />
          </div>
          <h3 className="text-lg mb-2">What's your email</h3>
          <input
            required

            value = {email}
            onChange={(e) => setEmail(e.target.value)}
                
            className="bg-[#eeeeee] rounded px-4 py-2 mb-5 w-full text-base placeholder: text-sm"
            type="email"
            placeholder="Enter your email"
          />
          <h3 className="text-lg mb-2">Password</h3>
          <input
            required

            value = {password}
            onChange={(e) => setPassword(e.target.value)}
                
            className="bg-[#eeeeee] rounded px-4 py-2 mb-10 w-full text-base placeholder: text-sm"
            type="password"
            placeholder="Enter your password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-base"> Sign In </button>
        </form>
        <p className="text-center">
            Already have an account? 
          <Link to="/login" className="text-blue-600"> Login here </Link>
        </p>
      </div>

      <div>
        <p>Some text</p>
      </div>
    </div>
  )
}

export default UserSignup
