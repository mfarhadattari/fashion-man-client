import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <section className="flex justify-center items-center min-h-screen ">
      <div className="flex flex-col gap-20 items-center">
        <div className="flex items-end gap-2">
          <h1 className="text-7xl">404</h1>
          <span className="text-3xl">Not Found</span>
        </div>
        <div>
          <Link className="btn text-red-600" to="/">
            <FaArrowLeft></FaArrowLeft>
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;