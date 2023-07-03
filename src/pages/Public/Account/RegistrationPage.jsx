import { Link } from "react-router-dom";
import SocialConnect from "./SocialConnect";

const RegistrationPage = () => {
  return (
    <main>
      <section>
        <div className="flex flex-col-reverse md:flex-row w-full p-5 gap-10 mx-auto">
          <div className="p-5 w-full md:w-2/4">
            <SocialConnect></SocialConnect>
          </div>
          <div className="p-5 w-full">
            <h1 className="text-3xl text-center font-bold">Register now!</h1>
            <form className="mt-5">
              <div className="flex flex-col md:flex-row md:gap-5">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="green-input w-full "
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="green-input w-full "
                  />
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
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Photo URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="Photo URL"
                    className="green-input w-full"
                  />
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
                    className="green-input w-full"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="green-input w-full"
                  />
                </div>
              </div>
              <div className="form-control w-full mt-3">
                <button className="green-btn">Register</button>
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
