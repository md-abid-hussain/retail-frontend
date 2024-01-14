import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./schema/yupSchema";

function Register() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { errors,isValid } = formState;

  const onSubmit = (data) => {
    console.log(errors)
    console.log(isValid)
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
