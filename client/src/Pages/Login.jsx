import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post('http://localhost:8000/login', { // Ensure the URL matches your server setup
        email, password
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          email: "",
          password: ""
        });
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error occurred:", error); // Debugging: Log errors
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type='email' // Changed type to 'email' for better validation
          placeholder='Enter email..'
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label>Password</label>
        <input
          type='password' // Changed type to 'password' for better security
          placeholder='Enter password..'
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
