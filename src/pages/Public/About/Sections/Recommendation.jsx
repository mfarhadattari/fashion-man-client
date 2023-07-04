import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import useAxiosPublic from "./../../../../hooks/useAxiosPublic";
import { useQuery } from "react-query";
import Loaders from "./../../../../components/Loaders";

const Recommendation = () => {
  const { axiosPublic } = useAxiosPublic();

  const { data: recommendation = [], isLoading } = useQuery({
    queryKey: ["recommendation", axiosPublic],
    queryFn: async () => {
      const res = await axiosPublic.get("/popular-products");
      return res.data;
    },
  });

  return (
    <section className="my-10 h-[400px]">
      {isLoading ? (
        <Loaders></Loaders>
      ) : (
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          spaceBetween={20}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
        >
          {recommendation.map((product) => (
            <SwiperSlide key={product._id}>
              <div
                className="flex flex-col justify-center items-center h-[400px]"
                style={{
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex flex-col justify-end items-center h-full w-full text-white ">
                  <p className="text-3xl mb-10">{product.price} &#2547;</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Recommendation;
