import React, { use, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Login() {
  const emailRef = useRef();
  const { singIn, setuser, forgotEmail, googleSubmit } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email first!");
      return;
    }
    forgotEmail(email)
      .then(() => {
        toast.success("Check your email for reset instructions");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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

  const handleGoogle = () => {
    googleSubmit()
      .then((result) => {
        const user = result.user;
        setuser(user);
        toast.success("Signed in with Google!");
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
              onClick={handleForgotPassword}
              className="link link-hover text-blue-600"
            >
              Forgot password?
            </button>
          </div>

          <button className="btn btn-neutral mt-4">Login</button>
        </form>
          <button
            onClick={handleGoogle}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
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
