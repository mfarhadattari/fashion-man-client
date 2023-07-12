import { Link, useNavigate } from "react-router-dom";
import SocialConnect from "./SocialConnect";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SuccessAlert from "../../../components/SuccessAlert";
import FirebaseErrorAlert from "../../../components/FirebaseErrorAlert";
import useAxiosPublic from "./../../../hooks/useAxiosPublic";
import { toast } from "react-hot-toast";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase/firebase.config";

const storage = getStorage(app);

const RegistrationPage = () => {
  const [inputPassword, setInputPassword] = useState("");
  const [isPassMatched, setIsPassMatched] = useState();
  const [passwordShow, setPasswordShow] = useState(false);
  const { createAccount, updateInfo, logout } = useAuth();
  const { axiosPublic } = useAxiosPublic();
  const [image, setImage] = useState(null);
  const imgExt = image?.type?.split("/")[1];

  const navigate = useNavigate();

  const handelFile = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile?.size > 300000) {
      setImage(null);
      toast("Image must size less then 300kb");
      return;
    }
    setImage(imgFile);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handelRegister = (data) => {
    const { email, password, firstName, lastName, confirmPassword } = data;

    if (password !== confirmPassword) {
      setIsPassMatched(false);
      return;
    }

    const storageRef = ref(storage, `/users-avatar/${email}-avatar.${imgExt}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          getDownloadURL(snapshot?.ref).then((url) => {
            createAccount(email, password)
              .then((result) => {
                if (result.user) {
                  updateInfo(`${firstName} ${lastName}`, url)
                    .then(() => {
                      axiosPublic
                        .post("/create-user", {
                          displayName: `${firstName} ${lastName}`,
                          email,
                          photoURL: url,
                        })
                        .then((res) => {
                          if (res.data.insertedId) {
                            SuccessAlert("Successfully Register!").then(() => {
                              reset();
                              logout();
                              navigate("/login", { replace: true });
                            });
                          }
                        });
                    })
                    .catch((error) => {
                      FirebaseErrorAlert(error.message);
                    });
                }
              })
              .catch((error) => {
                FirebaseErrorAlert(error.message);
              });
          });
        }
      },
      (error) => console.error(error.message)
    );
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
                {/* ------------- First Name ---------- */}
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
                {/* ------------- Last Name ---------- */}
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
                {/* ----------------- Email ----------------- */}
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
                {/* ----------------- Photo ----------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Profile Photo</span>
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    className="green-file-input"
                    onChange={handelFile}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row md:gap-5">
                {/* ----------------- Password ----------------- */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={passwordShow ? "text" : "password"}
                      placeholder="Password"
                      name="password"
                      onKeyUp={(e) => setInputPassword(e.target.value)}
                      className="green-input w-full"
                      {...register("password", {
                        required: true,
                        minLength: 8,
                        maxLength: 20,
                        pattern:
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,
                      })}
                    />
                    <button
                      type="button"
                      className="absolute top-4 right-3 text-xl"
                      onClick={() => setPasswordShow(!passwordShow)}
                    >
                      {passwordShow ? (
                        <FaEyeSlash></FaEyeSlash>
                      ) : (
                        <FaEye></FaEye>
                      )}
                    </button>
                  </div>
                  {errors.password?.type === "required" && (
                    <p className="error-message">Password is Required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p className="error-message">
                      Password must be 8 character
                    </p>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <p className="error-message">
                      Password less then 20 character
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="error-message">
                      Minimum one uppercase, one lowercase, one number and one
                      special character
                    </p>
                  )}
                </div>
                {/* ----------------- Confirm Password ----------------- */}
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
                <button
                  className="green-btn"
                  disabled={!isPassMatched || !image}
                >
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
