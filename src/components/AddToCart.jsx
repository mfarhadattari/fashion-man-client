import moment from "moment/moment";
import useAuth from "./../hooks/useAuth";
import { toast } from "react-hot-toast";
import useAxiosSecure from "./../hooks/useAxiosSecure";
import { useState } from "react";
import useTotalCart from "../hooks/useTotalCart";

const AddToCart = ({ productInfo }) => {
  const { authUser, authLoading } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  const { refetch } = useTotalCart();
  const [loading, setLoading] = useState(false);

  const handelAddToCart = () => {
    setLoading(true);
    if (!authUser || authLoading) {
      toast("Please Login First!");
      return setLoading(false);
    }
    const { title, price, size, _id, discount, category, image } = productInfo;
    const productPrice = discount > 0 ? (price * discount) / 100 : price;
    const cartInfo = {
      productID: _id,
      title,
      image,
      size,
      category,
      price: Math.round(productPrice),
      quantity: 1,
      email: authUser?.email,
      timeDate: moment().format("YYYY-MM-DD/HH:mm:ss"),
    };
    axiosSecure.post("/add-to-cart", cartInfo).then(({ data }) => {
      if (data.insertedId || data.modifiedCount > 0) {
        toast.success("Added Successfully!");
        refetch();
      } else {
        toast.error("Something is wrong!");
      }
      setLoading(false);
    });
  };

  return (
    <button
      className="green-btn w-full"
      onClick={handelAddToCart}
      disabled={loading}
    >
      {loading ? (
        <span className="loading loading-spinner text-green-600"></span>
      ) : (
        ""
      )}
      Add to cart
    </button>
  );
};

export default AddToCart;
