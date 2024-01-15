import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../../schema/yupSchema";
import { useForgotPasswordMutation } from "./authApiSlice";

export default function ForgotPassword({ isOpen, setIsOpen }) {
  const [err, setErr] = useState("");

  const [forgotPassword, { isSuccess, isLoading }] =
    useForgotPasswordMutation();

  const { register, handleSubmit, formState, watch, reset } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const email = watch("email");

  useEffect(() => {
    setErr("");
  }, [email]);

  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const res = await forgotPassword({ email: data.email }).unwrap();
      reset();
      setTimeout(()=>{
        setIsOpen(false);
      },2000)
    } catch (err) {
      setErr(err.data.message);
      console.log(err);
    }
  };

  let content = (
    <div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">
          Please enter your email to receive a password reset link.
        </p>
      </div>
      <form
        className="space-y-1 mt-4 flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            id="emailOrUsername"
            name="emailOrUsername"
            placeholder="Enter your email"
            type="test"
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
        <div className="flex gap-6">
          <button
            type="submit"
            className="btn bg-blue-500 hover:bg-blue-600 text-white sm:text-base flex-1"
          >
            Reset Password
          </button>
          <button type="button" onClick={closeModal} className="btn flex-1">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  if (isLoading) {
    content =  (
      <div className=" min-h-48 flex items-center justify-center">
        <span className="loading loading-spinner text-primary loading-lg"></span>
      </div>
    );
  }

  if (isSuccess) {
    content = (
      <div className="min-h-48 flex items-center justify-center">
        <p className=" text-success text-center">
          Password reset link has been sent to your email
        </p>
      </div>
    );
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Request Password Reset
                  </Dialog.Title>
                  {content}
                  <div className="mt-2">
                    {err && <p className="text-sm text-error">{err}</p>}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
