import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MenuCover from "./../../../components/MenuCover";
import banner from "../../../assets/images/banner.jpg";
import DeleteBtn from "../../../components/DeleteBtn";
import {FaMinus, FaPlus } from "react-icons/fa";
import Loaders from "./../../../components/Loaders";
import NoData from "./../../../components/NoData";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import useTotalCart from "./../../../hooks/useTotalCart";
import ShowBtn from "../../../components/ShowBtn";

const CartPage = () => {
  const { axiosSecure } = useAxiosSecure();
  const { refetchItemInCart } = useTotalCart();

  const {
    data: carts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["carts", axiosSecure],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-cart");
      return await res.data;
    },
  });

  // ! Delete Cart
  const deleteCart = (id) => {
    axiosSecure.delete(`/delete-cart/${id}`).then(({ data }) => {
      if (data.deletedCount > 0) {
        refetch();
        refetchItemInCart();
        toast.success("Deleted Successfully!");
      } else {
        toast.error("Something is wrong!");
      }
    });
  };

  // !Update Cart
  const updateQuantity = (id, quantity) => {
    axiosSecure
      .patch(`/update-quantity/${id}`, { quantity: quantity })
      .then(({ data }) => {
        if (data.modifiedCount > 0) {
          refetch();
        }
      });
  };

  return (
    <main>
      <MenuCover
        heading="Cart"
        subheading="Discover your cart!"
        backgroundURL={banner}
      />
      {isLoading ? (
        <div className="loader-container">
          <Loaders />
        </div>
      ) : carts.length < 1 ? (
        <NoData />
      ) : (
        <section className="my-10 lg:w-3/4 mx-auto">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th className="text-center">Info</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((cart, idx) => (
                  <tr key={cart._id}>
                    <th>{idx + 1}</th>
                    <td>
                      <div className="avatar">
                        <div className="w-20 h-20">
                          <img src={cart.image} alt={cart.title} />
                        </div>
                      </div>
                    </td>
                    <td className="md:w-2/6 lg:w-1/4">
                      <h1>{cart.title}</h1>
                    </td>
                    <td className="text-center space-y-1">
                      <p>Price: {cart.price}&#2547;</p>
                      <p>Size: {cart.size}</p>
                      <div className="flex justify-center items-center gap-2">
                        <button
                          disabled={cart.quantity == 1}
                          onClick={() =>
                            updateQuantity(cart._id, cart.quantity - 1)
                          }
                        >
                          <FaMinus />
                        </button>
                        <p className="border w-[40px]">{cart.quantity}</p>
                        <button
                          onClick={() =>
                            updateQuantity(cart._id, cart.quantity + 1)
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>
                    <th className="">
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <DeleteBtn onClick={() => deleteCart(cart._id)} />
                        <Link to={`/shop/${cart.productID}`}>
                          <ShowBtn/>
                        </Link>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-10">
            <Link to="/dashboard/checkout" className="green-btn w-[200px]">
              Checkout
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default CartPage;
