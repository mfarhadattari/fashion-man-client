import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const PaymentFailedPage = () => {
  return (
    <div className="h-[300px] flex flex-col justify-center items-center text-3xl">
      <h1 className="text-red-600">Payment Failed!</h1>
      <div className="mt-5">
        <Link className="green-btn" to="/">
          <FaArrowLeft></FaArrowLeft>
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
