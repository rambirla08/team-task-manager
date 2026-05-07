import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {

    try {

      await API.post('/auth/register', {
        name,
        email,
        password
      });

     toast.success('Registration Successful');

      navigate('/');

    } catch (err) {

      toast.error('Registration Failed');

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-pink-100">

      <div className="bg-pink-50 w-[400px] p-10 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold text-center mb-10">
          Register
        </h1>

        <div className="mb-5">

          <label className="block mb-2 font-semibold">
            Name
          </label>

          <input
            type="text"
            placeholder="Enter Name"
            className="w-full border-4 border-black rounded-xl px-4 py-3 outline-none"
            onChange={(e) => setName(e.target.value)}
          />

        </div>

        <div className="mb-5">

          <label className="block mb-2 font-semibold">
            Email address
          </label>

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border-4 border-black rounded-xl px-4 py-3 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        <div className="mb-8">

          <label className="block mb-2 font-semibold">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border-4 border-black rounded-xl px-4 py-3 outline-none"
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-3 rounded-full text-lg font-semibold hover:scale-105 transition"
        >
          Sign Up
        </button>

      </div>

    </div>

  );

}

export default Register;