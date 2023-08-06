import SectionTitle from "./../../../../components/SectionTitle";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loaders from "../../../../components/Loaders";
import PopularProductCard from "../../../../components/PopularProductCard";
const PopularProducts = () => {
  const { axiosPublic } = useAxiosPublic();

  const { data: popularProducts = [], isLoading } = useQuery({
    queryKey: ["popularProducts", axiosPublic],
    queryFn: async () => {
      const res = await axiosPublic.get("/popular-products");
      return res.data;
    },
  });
  return (
    <section className="my-20">
      <SectionTitle
        title="Discover Popular Product"
        subtitle="Browse our top-selling & popular products!"
      ></SectionTitle>
      {isLoading ? (
        <div className="h-[300px] flex justify-center items-center">
          <Loaders></Loaders>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-5 p-5">
          {popularProducts.map((product) => (
            <PopularProductCard key={product._id} productInfo={product}></PopularProductCard>
          ))}
        </div>
      )}
      <div className="flex justify-center my-5">
        <Link to="/shop" className="btn rounded-none w-[250px]">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default PopularProducts;
