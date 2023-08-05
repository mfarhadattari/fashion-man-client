import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";

const PaymentSuccessPage = () => {
  return (
    <div className="h-[300px] flex flex-col justify-center items-center text-3xl">
      <PageTitle title="Payment Success" />
      <h1>Payment Successful!</h1>
      <div className="mt-5">
        <Link className="primary-btn" to="/">
          <FaArrowLeft></FaArrowLeft>
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
