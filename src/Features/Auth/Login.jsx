import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/yupSchema";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import ForgotPassword from "./ForgotPassword";
import usePersist from "../../hooks/usePersist";

function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [persist, setPersist] = usePersist();
  const handlePersistToggle = () => setPersist((prev) => !prev);

  const [err, setErr] = useState("");
  const [login, { isLoading }] = useLoginMutation();

  const { register, handleSubmit, watch, formState, reset } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const emailOrUsername = watch("emailOrUsername");
  const password = watch("password");

  useEffect(() => {
    setErr("");
  }, [emailOrUsername, password]);

  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const { accessToken } = await login({
        username: data.emailOrUsername,
        password: data.password,
      }).unwrap();
      dispatch(setCredentials({ accessToken }));
      reset();
      navigate("/catalogue");
    } catch (error) {
      setErr(error.data.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-content-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const forgotPassword = () => {
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative">
      <ForgotPassword isOpen={isOpen} setIsOpen={setIsOpen} />
      {err && (
        <div
          role="alert"
          className=" bg-error rounded-2xl flex alert-error w-[300px] self-center absolute top-5 p-4 items-center gap-1"
        >
          <FontAwesomeIcon icon={faCircleExclamation} size="16" />
          <span className="flex-1">{err}</span>
          <button
            className="absolute bg-error -top-2 -right-2 border rounded-full w-6 h-6 flex items-center justify-center"
            onClick={() => setErr("")}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="emailOrUsername"
              className="block sm:text-base text-sm font-medium leading-6 label-text label"
            >
              Email address / Username
            </label>
            <div>
              <input
                id="emailOrUsername"
                name="emailOrUsername"
                type="test"
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
                  value={persist}
                  onChange={handlePersistToggle}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="block sm:text-base text-sm font-medium leading-6 label-text label">
                  Remember me
                </span>
              </label>
            </div>
            <div className="text-sm">
              <button
                type="button"
                onClick={forgotPassword}
                className="font-semibold link link-primary"
              >
                Forgot password?
              </button>
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
