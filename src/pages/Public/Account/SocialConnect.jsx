import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAuth from "./../../../hooks/useAuth";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

const SocialConnect = () => {
  const { socialLogin } = useAuth();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handelSocialLogin = (provider) => {
    socialLogin(provider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Continue with!</h1>
      <div className="flex flex-col gap-3 justify-center items-center w-3/4 mx-auto mt-5">
        <button
          className="green-outline-btn w-full"
          onClick={() => handelSocialLogin(googleProvider)}
        >
          <span className="text-2xl">
            <FcGoogle></FcGoogle>
          </span>
          Google
        </button>
        <button
          className="green-outline-btn w-full"
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
