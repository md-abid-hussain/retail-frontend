import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./schema/yupSchema";

function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="block sm:text-base text-sm font-medium leading-6 label-text label"
            >
              Email address / Username
            </label>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                {...register("emailOrUsername")}
                className={
                  errors.emailOrUsername
                    ? "input input-bordered input-error w-full"
                    : "input input-bordered input-primary w-full"
                }
              />
              {errors.emailOrUsername && (
                <p className="text-error text-sm">
                  {errors.emailOrUsername.message}
                </p>
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
                autoComplete="current-password"
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

          <div className="flex items-center justify-between">
            <div className="form-control">
              <label className="label cursor-pointer items-center gap-1">
                <input
                  type="checkbox"
                  value={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="block sm:text-base text-sm font-medium leading-6 label-text label">
                  Remember me
                </span>
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-semibold link link-primary">
                Forgot password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary flex w-full sm:text-base"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link
            to="/register"
            className="font-semibold leading-6 link link-primary"
          >
            Register Now
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
