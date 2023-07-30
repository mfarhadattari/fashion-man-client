import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialConnect from "./SocialConnect";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import SuccessAlert from "../../../components/SuccessAlert";
import FirebaseErrorAlert from "../../../components/FirebaseErrorAlert";
import PageTitle from "../../../components/PageTitle";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { userLogin } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const redirectFrom = location?.state?.from || "/";

  const handelLogin = (data) => {
    userLogin(data.email, data.password)
      .then((result) => {
        if (result.user) {
          SuccessAlert("Successfully Login!").then(() => {
            reset();
            navigate(redirectFrom, { replace: true });
          });
        }
      })
      .catch((error) => {
        FirebaseErrorAlert(error.message);
      });
  };

  return (
    <main>
      <PageTitle title="Login | Programmer Fashion" />
      <section className="my-10">
        <div className="flex flex-col-reverse md:flex-row w-full lg:w-3/4 p-5 gap-10 mx-auto">
          <div className="p-5 w-full">
            <SocialConnect></SocialConnect>
          </div>
          <div className="p-5 w-full">
            <h1 className="text-3xl text-center font-bold">Login now!</h1>
            <form className="" onSubmit={handleSubmit(handelLogin)}>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="green-input w-full"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className="error-message">Email is Required</p>
                )}
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="green-input w-full"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <button
                    type="button"
                    className="absolute top-4 right-3 text-xl"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                  </button>
                </div>
                {errors.password?.type === "required" && (
                  <p className="error-message">Password is Required</p>
                )}
              </div>
              <div className="form-control mt-3">
                <button className="green-btn">Login</button>
              </div>
              <p className="my-3 text-base">
                New to PROGRAMMER FASHION?{" "}
                <Link
                  to="/registration"
                  className="link link-hover text-blue-600"
                >
                  Register Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
