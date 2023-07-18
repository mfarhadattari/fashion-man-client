import Loaders from "../../../components/Loaders";
import NoData from "../../../components/NoData";
import SectionTitle from "../../../components/SectionTitle";
import { formatTimeDate } from "../../../utils/utils";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";

const PaymentHistory = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-payments");
      return res.data;
    },
  });
  return (
    <main>
      <section className="my-10">
        <SectionTitle
          title="Payment History"
          subtitle="See Your Payment History!"
        />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : payments.length < 1 ? (
        <NoData />
      ) : (
        <section className="my-10 lg:w-3/4 mx-auto">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="text-center">Transaction ID</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Time</th>
                  <th className="text-center">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, idx) => (
                  <tr key={payment._id}>
                    <th>{idx + 1}</th>
                    <td className="text-center space-y-1">{payment.tran_id}</td>
                    <td className="text-center space-y-1">{payment.amount}</td>
                    <td className="text-center space-y-1">
                      {formatTimeDate(payment.timeDate).time}
                    </td>
                    <td className="text-center space-y-1">
                      {formatTimeDate(payment.timeDate).date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
};

export default PaymentHistory;
