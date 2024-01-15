import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, Link, useNavigate } from "react-router-dom";
import { resetPasswordSchema } from "../../schema/yupSchema";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "./authApiSlice";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faCircleXmark, faCheckCircle} from "@fortawesome/free-solid-svg-icons";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch,formState } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(()=>{
    setErr("");
    setSuccess("");
  },[password,confirmPassword])

  const { errors } = formState;

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data) => {
    try {
      const res = await resetPassword({
        token,
        password: data.password,
      }).unwrap();
      setSuccess(res.message);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
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
            className="absolute bg-error -top-2 -right-2 border rounded-full w-6 h-6 flex items-center justify-center"
            onClick={() => setErr("")}
          >
            <FontAwesomeIcon icon={faCircleXmark} size="lg"/>
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
          // src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          src="/thumb-removebg-preview.png"
          alt="Your Company"
        />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight">
          Create new password for your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
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
              Reset Password
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-gray-500">
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
};

export default ResetPassword;
