import React, { use, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GoogleBtn from "../components/GoogleBtn";

export default function Login() {
  const emailRef = useRef();
  const { singIn, setuser } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    singIn(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setuser(user);
        toast.success("Signed in successfully!");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };



  return (
    <div>
      <div className="card-body max-w-[600px] mx-auto">
        <h1 className="text-2xl font-extrabold text-center">Login Page</h1>
        <form className="fieldset" onSubmit={handleLogin}>
          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input w-full"
            placeholder="Email"
            ref={emailRef}
            required
          />

          <label className="label">Password</label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="input w-full pr-10"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3 cursor-pointer text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="mt-2">
            <button
              type="button"
              className="link link-hover text-blue-600"
            >
              Forgot password?
            </button>
          </div>

          <button className="btn btn-neutral mt-4">Login</button>
        </form>
          <GoogleBtn/>
          <p className="mt-3">
            Don’t have an account?{" "}
            <Link className="text-red-600 font-bold" to="/auth/register">
              Register
            </Link>
          </p>
        <ToastContainer />
      </div>
    </div>
  );
}
