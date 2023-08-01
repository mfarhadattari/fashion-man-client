import { Link, useParams } from "react-router-dom";
import PageTitle from "./../../../components/PageTitle";
import SectionTitle from "./../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "react-query";
import Loaders from "../../../components/Loaders";
import {
  FaCheckDouble,
  FaEnvelope,
  FaLocationArrow,
  FaPhone,
  FaUser,
  FaWallet,
} from "react-icons/fa";
import ShowBtn from "../../../components/ShowBtn";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { axiosSecure } = useAxiosSecure();
  const { data: orderDetails = {}, isLoading } = useQuery({
    queryKey: ["orderDetails", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get(`/order/${id}`);
      return res.data;
    },
  });
  console.log(orderDetails);
  return (
    <main className="mb-20">
      <PageTitle title="Order Details | Programmer Fashion" />
      <section className="my-10">
        <SectionTitle title="Order Details" subtitle="See order info here!" />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 md:w-3/4 gap-5  mx-auto">
            <div className="flex justify-center md:justify-start">
              <div className="w-fit text-lg border p-5 rounded-lg hover:shadow-2xl">
                <h4 className="text-center uppercase font-semibold text-base">
                  Cusomer Info
                </h4>
                <h1 className="flex gap-2 items-center">
                  <FaUser /> {orderDetails.name}
                </h1>
                <h1 className="flex gap-2 items-center">
                  <FaEnvelope /> {orderDetails.email}
                </h1>
                <h1 className="flex gap-2 items-center">
                  <FaPhone /> {orderDetails.phone}
                </h1>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="w-fit text-lg border p-5 rounded-lg hover:shadow-2xl">
                <h4 className="text-center uppercase font-semibold text-base">
                  Order Info
                </h4>
                <div className="flex gap-2 items-center">
                  <FaLocationArrow />
                  <div>
                    <p>{orderDetails.address}</p>
                    <p>
                      {orderDetails.city}, {orderDetails.postCode}
                    </p>
                  </div>
                </div>
                <p className="flex gap-2 items-center">
                  <FaWallet /> Total: {orderDetails.totalAmount} &#2547;
                </p>
                <p className="flex gap-2 items-center">
                  <FaCheckDouble /> Status: {orderDetails.status}
                </p>
              </div>
            </div>
          </section>
          <section className="my-10">
            <h1 className="text-center text-xl font-bold uppercase border-b-4 border-gray-600 w-fit mx-auto">
              Ordered Products
            </h1>
            <div className="overflow-x-auto mt-5  border">
              <table className="table">
                <tbody>
                  {orderDetails?.products?.map((product, idx) => (
                    <tr key={product.productId}>
                      <th>{idx + 1}</th>
                      <td>
                        <div className="avatar">
                          <div className="w-20 h-20">
                            <img src={product.image} alt={product.productName} />
                          </div>
                        </div>
                      </td>
                      <td className="md:w-2/6 lg:w-1/4">
                        <h1>{product.productName}</h1>
                      </td>
                      <td className="text-center space-y-1">
                        <p>Price: {product.price}&#2547;</p>
                        <p>Size: {product.size}</p>
                        <p>Quantity: {product.quantity}</p>
                      </td>
                      <th className="">
                        <Link to={`/shop/${product.productId}`}>
                          <ShowBtn />
                        </Link>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default OrderDetailsPage;
