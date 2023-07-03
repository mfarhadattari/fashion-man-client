import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SocialConnect = () => {
  return (
    <div>
      <h1 className="text-3xl text-center font-bold">Continue With!</h1>
      <div className="flex flex-col gap-3 justify-center items-center w-3/4 mx-auto mt-5">
        <button className="green-outline-btn w-full">
          <span className="text-2xl">
            <FcGoogle></FcGoogle>
          </span>
          Google
        </button>
        <button className="green-outline-btn w-full">
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
