import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAuth from "./../../../hooks/useAuth";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import SuccessAlert from "../../../components/SuccessAlert";
import { useLocation, useNavigate } from "react-router-dom";
import FirebaseErrorAlert from "../../../components/FirebaseErrorAlert";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SocialConnect = () => {
  const { socialLogin } = useAuth();
  const { axiosPublic } = useAxiosPublic();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const navigate = useNavigate();
  const location = useLocation();
  const redirectFrom = location?.state?.from || "/";

  const handelSocialLogin = (provider) => {
    socialLogin(provider)
      .then((result) => {
        if (result.user && result.user.email) {
          axiosPublic
            .post("/create-user", {
              displayName: result.user?.displayName,
              email: result.user.email,
              photoURL: result.user?.photoURL,
            })
            .then((res) => {
              if (res.data.insertedId) {
                SuccessAlert("Successfully Login!").then(() => {
                  navigate(redirectFrom, { replace: true });
                });
              }
            });
        }
      })
      .catch((error) => {
        FirebaseErrorAlert(error.message);
      });
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Continue with!</h1>
      <div className="flex flex-col gap-3 justify-center items-center w-3/4 mx-auto mt-5">
        <button
          className="primary-outline-btn w-full"
          onClick={() => handelSocialLogin(googleProvider)}
        >
          <span className="text-2xl">
            <FcGoogle></FcGoogle>
          </span>
          Google
        </button>
        <button
          className="primary-outline-btn w-full"
          onClick={() => handelSocialLogin(githubProvider)}
        >
          <span className="text-2xl">
            <FaGithub></FaGithub>
          </span>
          Github
        </button>
      </div>
    </div>
  );
};

export default SocialConnect;
