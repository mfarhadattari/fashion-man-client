import { Link } from "react-router-dom";

const NewProductCard = ({ productInfo }) => {
  return (
    <div className="card w-full border p-5 rounded-3xl hover:scale-105 duration-300 hover:shadow-2xl">
      <Link to={`/shop/${productInfo?._id}`}>
        <figure>
          <img
            className="w-[300px] h-[200px] rounded-md"
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

export default NewProductCard;
