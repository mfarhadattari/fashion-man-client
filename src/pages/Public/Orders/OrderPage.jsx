import { useQuery } from "react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loaders from "../../../components/Loaders";
import NoData from "../../../components/NoData";
import { Link } from "react-router-dom";
import { formatTimeDate } from "../../../utils/utils";
import ShowBtn from "../../../components/ShowBtn";
import PageTitle from "../../../components/PageTitle";

const OrderPage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: orders = [], isLoading: isOrderLoading } = useQuery({
    queryKey: ["orders", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-orders");
      return await res.data;
    },
  });

  return (
    <main>
      <PageTitle title="My Orders | Programmer Fashion" />
      <section className="my-10">
        <SectionTitle title="My Orders" subtitle="See Your Orders!" />
      </section>
      {isOrderLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : orders.length < 1 ? (
        <NoData />
      ) : (
        <section className="my-10 lg:w-3/4 mx-auto">
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
                      <p>Amount: {order.totalAmount}&#2547;</p>
                      <p>
                        Items:{" "}
                        {order.products.reduce(
                          (items, prod) => prod.quantity + items,
                          0
                        )}
                        pes
                      </p>
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

export default OrderPage;
