import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthContext";
import GoogleBtn from "../components/GoogleBtn";

export default function Register() {
  const { createUser, setuser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.userName.value;
    const profile_image = form.photoUrl.value;
    const email = form.email.value;
    const password = form.password.value;

    const strongPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!strongPassword.test(password)) {
      toast.error(
        "Password must be at least 6 chars and include a number & uppercase letter"
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setuser(user);
        toast.success("Register successfully!");
        navigate(`${location.state ? location.state : "/"}`);
        fetch("http://localhost:3000/usersPost", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify({ name, profile_image, email, password }),
        })
          .then((res) => res.json())
          .then((data) => console.log(data));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div className="card-body max-w-[600px] mx-auto">
        <h1 className="text-2xl font-extrabold text-center">Register Page</h1>
        <form className="fieldset" onSubmit={handleRegister}>
          <label className="label">User Name</label>
          <input
            name="userName"
            type="text"
            className="input w-full"
            placeholder="User name"
          />

          <label className="label">Photo URL</label>
          <input
            name="photoUrl"
            type="text"
            className="input w-full"
            placeholder="Photo URL"
          />

          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input w-full"
            placeholder="Email"
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
              className="absolute top-3 right-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="btn btn-neutral mt-4">Register</button>
        </form>

        {/* Google */}
        <GoogleBtn />
        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link className="text-red-600 font-bold" to="/auth/login">
            Login
          </Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
}
