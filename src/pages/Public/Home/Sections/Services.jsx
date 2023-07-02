import {
  FaFingerprint,
  FaLifeRing,
  FaShippingFast,
  FaUndo,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
import { Autoplay, EffectCube, Pagination } from "swiper";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <>
      <section className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start w-fit mx-auto">
          <div className="flex gap-5 items-center w-[300px]">
            <div className="text-[#024E82] text-5xl ">
              <FaShippingFast></FaShippingFast>
            </div>
            <div>
              <div className="text-xl font-bold uppercase">Free Shipping</div>
              <div className="font-medium">
                Enjoy free shipping on <br /> all orders above $100
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-center w-[300px]">
            <div className="text-[#024E82] text-5xl ">
              <FaLifeRing></FaLifeRing>
            </div>
            <div>
              <div className="text-xl font-bold uppercase">SUPPORT 24/7</div>
              <div className="font-medium">
                Our support team is there <br /> to help you for queries
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-center w-[300px]">
            <div className="text-[#024E82] text-5xl ">
              <FaUndo></FaUndo>
            </div>
            <div>
              <div className="text-xl font-bold uppercase">30 DAYS RETURN</div>
              <div className="font-medium">
                Simply return it within 30 days for an exchange
              </div>
            </div>
          </div>
          <div className="flex gap-5 items-center w-[300px]">
            <div className="text-[#024E82] text-5xl ">
              <FaFingerprint></FaFingerprint>
            </div>
            <div>
              <div className="text-xl font-bold uppercase">
                100% PAYMENT SECURE
              </div>
              <div className="font-medium">
                Our payments are secured with 256 bit encryption
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="my-20">
        <Swiper
          effect={"cube"}
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          pagination={true}
          modules={[EffectCube, Pagination, Autoplay]}
          className="h-[400px]"
        >
          <SwiperSlide>
            <div className="h-full w-full md:w-3/4 bg-black text-white flex flex-col text-center justify-center items-center gap-3">
              <h1 className="uppercase text-4xl">peace of mind</h1>
              <p>
                A one-stop platform for all your fashion needs,
                <br /> hassle-free. Buy with a peace of mind.
              </p>
              <Link to="/shops" className="btn btn-outline text-white">
                Shop Now
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full w-full md:w-3/4 bg-black text-white flex flex-col text-center justify-center items-center gap-3">
              <h1 className="uppercase text-4xl">Buy 2 Get 1 Free</h1>
              <p>
                End of season sale. Buy any 2 items <br /> of your choice and
                get 1 free.
              </p>
              <Link to="/shops" className="btn btn-outline text-white">
                Shop Now
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full w-full md:w-3/4 bg-black text-white flex flex-col text-center justify-center items-center gap-3">
              <h1 className="uppercase text-4xl">Cash On Delivery</h1>
              <p>
                Make your payment after
                <br /> products received.
              </p>
              <Link to="/shops" className="btn btn-outline text-white">
                Shop Now
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
};

export default Services;
