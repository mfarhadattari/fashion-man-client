import SectionTitle from "../../../../components/SectionTitle";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loaders from "./../../../../components/Loaders";
import NewProductCard from "../../../../components/NewProductCard";

const NewArrivals = () => {
  const { axiosPublic } = useAxiosPublic();

  const { data: newProducts = [], isLoading } = useQuery({
    queryKey: ["newProducts", axiosPublic],
    queryFn: async () => {
      const res = await axiosPublic.get("/new-products");
      return res.data;
    },
  });

  return (
    <section className="mt-20">
      <SectionTitle
        title="Discover New Arrivals"
        subtitle="Recently added products!"
      ></SectionTitle>
      {isLoading ? (
        <div className="h-[300px] flex justify-center items-center">
          <Loaders></Loaders>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-5 p-5">
          {newProducts.map((product) => (
            <NewProductCard key={product._id} productInfo={product}></NewProductCard>
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

export default NewArrivals;
