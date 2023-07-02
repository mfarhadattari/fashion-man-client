import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";
import banner from "../../../../assets/images/banner.jpg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="w-full">
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
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
              <Link to="shops">
                <button className="btn btn-sm md:btn-md md:mt-5">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src={banner} className="max-h-[500px] w-full" alt="" />
            <div className="w-full h-full absolute top-0 bg-black bg-opacity-50"></div>
            <div className="absolute top-1/3 right-20 text-white">
              <h1 className="text-2xl md:text-6xl">
                Stylist picks <br /> beat the heat
              </h1>
              <Link to="shops">
                <button className="btn btn-sm md:btn-md md:mt-5">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src={banner} className="max-h-[500px] w-full" alt="" />
            <div className="w-full h-full absolute top-0 bg-black bg-opacity-50"></div>
            <div className="absolute top-1/3 right-20 text-white">
              <h1 className="text-2xl md:text-6xl">
                Stylist picks <br /> beat the heat
              </h1>
              <Link to="shops">
                <button className="btn btn-sm md:btn-md md:mt-5">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img src={banner} className="max-h-[500px] w-full" alt="" />
            <div className="w-full h-full absolute top-0 bg-black bg-opacity-50"></div>
            <div className="absolute top-1/3 right-20 text-white">
              <h1 className="text-2xl md:text-6xl">
                Stylist picks <br /> beat the heat
              </h1>
              <Link to="shops">
                <button className="btn btn-sm md:btn-md md:mt-5">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
