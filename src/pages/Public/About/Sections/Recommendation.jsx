import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/pagination";

const Recommendation = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <section className="my-10 h-[400px]">
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
        {products.map((product) => (
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
    </section>
  );
};

export default Recommendation;
