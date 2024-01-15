import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schema/yupSchema";
import { useRegisterMutation } from "./authApiSlice";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleExclamation,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

function Register() {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { errors } = formState;
  const email = watch("email");
  const username = watch("username");
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    setSuccess("");
    setErr("");
  }, [email, username, password, confirmPassword]);

  const [registerUser, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data) => {
    try {
      const res = await registerUser({
        email: data.email,
        username: data.username,
        password: data.password,
      }).unwrap();
      setSuccess(res.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setErr(err.data.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-content-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-1 flex-col justify-center px-6 lg:px-8 relative">
      {err && (
        <div
          role="alert"
          className=" bg-error rounded-2xl flex alert-error w-[300px] self-center absolute top-5 p-4 items-center gap-1"
        >
          <FontAwesomeIcon icon={faCircleExclamation} size="lg" />
          <span className="flex-1 text-white">{err}</span>
          <button
            className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center"
            onClick={() => setErr("")}
          >
            <FontAwesomeIcon icon={faCircleXmark} size="lg" />
          </button>
        </div>
      )}
      {success && (
        <div
          role="alert"
          className="bg-success rounded-2xl flex alert-success w-[300px] self-center absolute top-5 p-4 items-center gap-1"
        >
          <FontAwesomeIcon icon={faCheckCircle} size="lg" />
          <span className="flex-1 text-white">{success}</span>
          <button
            className="absolute -top-2 -right-2 rounded-full w-6 h-6 flex items-center justify-center"
            onClick={() => setSuccess("")}
          >
            <FontAwesomeIcon icon={faCircleXmark} size="lg" />
          </button>
        </div>
      )}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-56"
          src="/thumb-removebg-preview.png"
          alt="Your Company"
        />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
          Sign up for an account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block sm:text-base text-sm font-medium leading-6 label-text label"
            >
              Email address
            </label>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className={
                  errors.email
                    ? "input input-bordered input-error w-full"
                    : "input input-bordered input-primary w-full"
                }
              />
              {errors.email && (
                <p className="text-error text-sm">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="username"
              className="block sm:text-base text-sm font-medium leading-6 label-text label"
            >
              Username
            </label>
            <div>
              <input
                id="username"
                name="username"
                type="string"
                {...register("username")}
                className={
                  errors.username
                    ? "input input-bordered input-error w-full"
                    : "input input-bordered input-primary w-full"
                }
              />
              {errors.username && (
                <p className="text-error text-sm">{errors.username.message}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block sm:text-base text-sm font-medium leading-6 label-text label"
            >
              Password
            </label>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                {...register("password")}
                className={
                  errors.password
                    ? "input input-bordered input-error w-full"
                    : "input input-bordered input-primary w-full"
                }
              />
              {errors.password && (
                <p className="text-error text-sm">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block sm:text-base text-sm font-medium leading-6 label-text label"
            >
              Confirm Password
            </label>
            <div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={
                  errors.confirmPassword
                    ? "input input-bordered input-error w-full"
                    : "input input-bordered input-primary w-full"
                }
              />
              {errors.confirmPassword && (
                <p className="text-error text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="mt-6 btn btn-primary flex w-full sm:text-base"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already registered?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 link link-primary"
          >
            Login Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
