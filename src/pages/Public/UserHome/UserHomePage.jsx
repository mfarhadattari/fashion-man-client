import SectionTitle from "../../../components/SectionTitle";
import { useQuery } from "react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Loaders from "../../../components/Loaders";
import { FaCoins, FaShippingFast, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const UserHomePage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { data: overview = {}, isLoading } = useQuery({
    queryKey: ["overview", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-overview");
      return res.data;
    },
  });

  return (
    <main>
      <section className="my-10">
        <SectionTitle title="User Home" subtitle="See Overview!" />
      </section>
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : (
        <section className="mb-20">
          <Link
            to="/dashboard/profile"
            className="flex flex-col md:flex-row gap-10 items-center justify-center border w-full p-5 mx-auto rounded-md shadow-lg hover:border-green-600"
          >
            <figure className="w-[250px] h-[250px] rounded-full">
              <img
                className="h-full w-full rounded-full border border-pink-500"
                src={overview.userInfo.photoURL}
                alt={overview.userInfo.displayName}
              />
            </figure>
            <div className="font-bold">
              <h2 className="text-3xl uppercase">
                {overview.userInfo.displayName}
              </h2>
              <p className="text-xl">{overview.userInfo.email}</p>
            </div>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 justify-center mt-10">
            <Link
              className="flex justify-center gap-10 items-end border rounded-md shadow-lg p-5 hover:border-green-600 "
              to="/cart"
            >
              <div className="font-bold">
                <h1 className="text-xl">Total Carts</h1>
                <p className="text-4xl text-primary">{overview.totalCarts}</p>
              </div>
              <div className="text-7xl text-primary">
                <FaShoppingCart />
              </div>
            </Link>
            <Link
              className="flex justify-center gap-10 items-end border rounded-md shadow-lg p-5 hover:border-green-600 "
              to="/dashboard/orders"
            >
              <div className="font-bold">
                <h1 className="text-xl">Total Orders</h1>
                <p className="text-4xl text-secondary">
                  {overview.totalOrders}
                </p>
              </div>
              <div className="text-7xl text-secondary">
                <FaShippingFast />
              </div>
            </Link>
            <Link
              to="/dashboard/payment-history"
              className="flex justify-center gap-10 items-end border rounded-md shadow-lg p-5 hover:border-green-600 "
            >
              <div className="font-bold">
                <h1 className="text-xl">Total Payment</h1>
                <p className="text-4xl text-accent">{overview.totalPayment}</p>
              </div>
              <div className="text-7xl text-accent">
                <FaCoins />
              </div>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default UserHomePage;
