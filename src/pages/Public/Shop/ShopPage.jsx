import MenuCover from "../../../components/MenuCover";
import banner from "../../../assets/images/banner.jpg";
import ProductCard from "../../../components/ProductCard";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loaders from "../../../components/Loaders";

// TODO: Filtering, Searching, Pagination

const ShopPage = () => {
  const { axiosPublic } = useAxiosPublic();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", axiosPublic],
    queryFn: async () => {
      const res = await axiosPublic.get("/products");
      return res.data;
    },
  });

  return (
    <main>
      <MenuCover
        heading="Our Shop"
        subheading="Get your favorite product"
        backgroundURL={banner}
      ></MenuCover>
      <section>
        {isLoading ? (
          <div className="h-[300px]">
            <Loaders></Loaders>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-20 gap-5 p-5">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                productInfo={product}
              ></ProductCard>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default ShopPage;
