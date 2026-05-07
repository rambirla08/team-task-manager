import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

      alert('Registration Successful');

      navigate('/');

    } catch (err) {

      alert('Registration Failed');

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-pink-100">

      <div className="bg-pink-50 w-[400px] p-10 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold text-center mb-10">
          Register
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          className="w-full border-4 border-black rounded-xl px-4 py-3 mb-5"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Enter Email"
          className="w-full border-4 border-black rounded-xl px-4 py-3 mb-5"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="w-full border-4 border-black rounded-xl px-4 py-3 mb-6"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-black text-white py-3 rounded-full text-lg font-semibold"
        >
          Sign Up
        </button>

        <p className="text-center mt-5">
          Already have an account?{' '}
          <Link to="/" className="font-bold">
            Login
          </Link>
        </p>

      </div>

    </div>

  );

}

export default Register;