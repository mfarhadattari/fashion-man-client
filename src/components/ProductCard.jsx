import { Link } from "react-router-dom";

const ProductCard = ({ productInfo }) => {
  return (
    <div className="card w-full rounded-none">
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
          <p className="text-2xl flex gap-3 justify-center">
            <span className="line-through text-red-500">
              {productInfo?.price}&#2547;
            </span>
            <span className="text-blue-700">
              {productInfo?.price -
                (productInfo?.price * productInfo?.discount) / 100}
              &#2547;
            </span>
          </p>
        </div>
      </Link>
      <button
        className="green-btn w-full"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
