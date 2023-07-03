import { Link } from "react-router-dom";
import SocialConnect from "./SocialConnect";

const LoginPage = () => {
  return (
    <main>
      <section className="my-10">
        <div className="flex flex-col-reverse md:flex-row w-full lg:w-3/4 p-5 gap-10 mx-auto">
          <div className="p-5 w-full">
            <SocialConnect></SocialConnect>
          </div>
          <div className="p-5 w-full">
            <h1 className="text-3xl text-center font-bold">Login now!</h1>
            <form className="">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="green-input"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="green-input"
                />
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