import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper";
import banner from "../../../../assets/images/banner.jpg";
import banner2 from "../../../../assets/images/banner2.jpg";
import banner3 from "../../../../assets/images/banner3.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="w-full">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="mySwiper max-h-[500px] w-full"
      >
        <SwiperSlide>
          <div className="relative">
            <img src={banner} className="max-h-[500px] w-full" alt="" />
            <div className="w-full h-full absolute top-0 bg-black bg-opacity-50"></div>
            <div className="absolute top-1/3 right-20 text-white">
              <h1 className="text-2xl md:text-6xl">
                Stylist picks <br /> beat the heat
              </h1>
              <Link
                to="/shop"
                className="btn btn-sm md:btn-md rounded-none md:mt-5"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src={banner2} className="max-h-[500px] w-full" alt="" />
            <div className="w-full h-full absolute top-0 bg-black bg-opacity-50"></div>
            <div className="absolute top-1/3 right-20 text-white">
              <h1 className="text-2xl md:text-6xl">
                Fashion up <br /> your code
              </h1>
              <Link
                to="/shop"
                className="btn btn-sm md:btn-md rounded-none md:mt-5"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src={banner3} className="max-h-[500px] w-full" alt="" />
            <div className="w-full h-full absolute top-0 bg-black bg-opacity-50"></div>
            <div className="absolute top-1/3 right-20 text-white">
              <h1 className="text-2xl md:text-6xl">
                Dressing the <br /> Digital Devs
              </h1>
              <Link
                to="/shop"
                className="btn btn-sm md:btn-md rounded-none md:mt-5"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
