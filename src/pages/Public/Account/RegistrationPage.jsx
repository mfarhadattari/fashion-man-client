import { Link } from "react-router-dom";
import SocialConnect from "./SocialConnect";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const RegistrationPage = () => {
  const [inputPassword, setInputPassword] = useState("");
  const [isPassMatched, setIsPassMatched] = useState();
  const { createAccount, updateInfo } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handelRegister = (data) => {
    const { email, password, firstName, lastName, photoURL } = data;
    if (isPassMatched) {
      createAccount(email, password)
        .then((result) => {
          if (result.user) {
            updateInfo(`${firstName} ${lastName}`, photoURL)
              .then(() => {
                console.log("Success");
              })
              .catch((error) => {
                console.error(error.message);
              });
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  const handleConfirmPassword = (e) => {
    if (e.target.value !== inputPassword) {
      setIsPassMatched(false);
      return;
    }
    if (e.target.value === "") {
      setIsPassMatched();
      return;
    } else {
      setIsPassMatched(true);
      return;
    }
  };

  return (
    <main>
      <section>
        <div className="flex flex-col-reverse md:flex-row w-full p-5 gap-10 mx-auto">
          <div className="p-5 w-full md:w-2/4">
            <SocialConnect></SocialConnect>
          </div>
          <div className="p-5 w-full">
            <h1 className="text-3xl text-center font-bold">Register now!</h1>
            <form className="mt-5" onSubmit={handleSubmit(handelRegister)}>
              <div className="flex flex-col md:flex-row md:gap-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="green-input w-full "
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName?.type === "required" && (
                    <p className="error-message">First name is required</p>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="green-input w-full "
                    {...register("lastName", { required: true })}
                  />
                  {errors.lastName?.type === "required" && (
                    <p className="error-message">Last name is required</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-5">
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
                    <p className="error-message">Email is required</p>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="Photo URL"
                    className="green-input w-full"
                    {...register("photoURL", { required: true })}
                  />
                  {errors.photoURL?.type === "required" && (
                    <p className="error-message">PhotoURL is required</p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onKeyUp={(e) => setInputPassword(e.target.value)}
                    className="green-input w-full"
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <p className="error-message">Password is required</p>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="green-input w-full"
                    onKeyUp={handleConfirmPassword}
                    {...register("confirmPassword", { required: true })}
                  />
                  {errors.confirmPassword?.type === "required" && (
                    <p className="error-message">
                      Confirm Password is required
                    </p>
                  )}
                  {isPassMatched === false ? (
                    <p className="error-message">{"Password didn't Matched"}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="form-control w-full mt-3">
                <button className="green-btn" disabled={!isPassMatched}>
                  Register
                </button>
              </div>
              <p className="my-3 text-base">
                Already have an account?{" "}
                <Link to="/login" className="link link-hover text-blue-600">
                  Login Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegistrationPage;
