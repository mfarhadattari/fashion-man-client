import { Link } from "react-router-dom";

const PopularProductCard = ({ productInfo }) => {
  return (
    <div className="card w-full border p-5 rounded-3xl rounded-bl-none hover:skew-y-2 hover:skew-x-2 duration-500 hover:shadow-2xl">
      <Link to={`/shop/${productInfo?._id}`}>
        <figure>
          <img
            className="w-[300px] h-[200px]"
            src={productInfo?.image}
            alt={productInfo?.title}
          />
        </figure>
        <div className="card-body text-center pb-2">
          <h2 className="card-title">{productInfo?.title}</h2>
        </div>
      </Link>
    </div>
  );
};

export default PopularProductCard;
