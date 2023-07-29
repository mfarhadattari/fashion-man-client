import { useQuery } from "react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loaders from "../../../components/Loaders";
import ShowBtn from "../../../components/ShowBtn";
import { Link } from "react-router-dom";
import { formatTimeDate } from "../../../utils/utils";
import { FaCheckCircle } from "react-icons/fa";

const AllOrderPage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/all-order");
      return res.data;
    },
  });

  return (
    <main className="mb-20">
      <section className="my-10">
        <SectionTitle
          title="All Orders"
          subtitle="Here are order from customer!"
        />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <section className="my-10">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="text-center">Order Info</th>
                  <th className="text-center">Payment Info</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order._id}>
                    <th>{idx + 1}</th>
                    <td className="text-center space-y-1">
                      <h1>Email: {order.email}</h1>
                      <div className="flex gap-3 justify-center">
                        <p>Amount: {order.totalAmount}&#2547;</p>
                        <p>
                          Items:{" "}
                          {order.products.reduce(
                            (items, prod) => prod.quantity + items,
                            0
                          )}
                          pes
                        </p>
                      </div>
                    </td>
                    <td className="text-center space-y-1">
                      <p>TranID: {order.tran_id}</p>
                      <div className="flex justify-center gap-3">
                        <p>Date: {formatTimeDate(order.timeDate).date}</p>
                        <p>Time: {formatTimeDate(order.timeDate).time}</p>
                      </div>
                    </td>
                    <td className="text-center space-y-1">
                      <p className="text-base font-bold">{order.status}</p>
                    </td>
                    <th className="">
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <Link to={`/order/${order._id}`}>
                          <ShowBtn />
                        </Link>
                        <button className="btn btn-sm text-xl btn-outline text-green-500 btn-circle">
                          <FaCheckCircle />
                        </button>
                      </div>
                    </th>
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

export default AllOrderPage;
