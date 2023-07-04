import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import SectionTitle from "../../../../components/SectionTitle";
import { useQuery } from "react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Loaders from "./../../../../components/Loaders";

const Testimonials = () => {
  const { axiosPublic } = useAxiosPublic();

  const { data: testimonials = [], isLoading } = useQuery({
    queryKey: ["testimonials", axiosPublic],
    queryFn: async () => {
      const res = await axiosPublic.get("/testimonials");
      return res.data;
    },
  });

  return (
    <section className="my-10">
      <SectionTitle
        title="Testimonials"
        subtitle="What say our customer?"
      ></SectionTitle>
      <div className="my-10 h-[400px]">
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
              800: {
                slidesPerView: 3,
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
            navigation={true}
            modules={[Pagination, Autoplay, Navigation]}
          >
            {testimonials.map((review) => (
              <SwiperSlide key={review._id}>
                <div className="w-full rounded-none h-[400px]  py-5 flex flex-col justify-center items-center relative">
                  <img
                    className="w-32 mx-auto rounded-full border h-32"
                    src={review?.image}
                    alt={review?.username}
                  />
                  <div className="text-center space-y-3 mt-5">
                    <h2 className="text-xl font-semibold">
                      {review?.username}
                    </h2>
                    <p className="text-lg w-3/4 mx-auto">{review?.message}</p>
                  </div>
                  <p className="absolute top-10 left-10 text-4xl">
                    <FaQuoteLeft></FaQuoteLeft>
                  </p>
                  <p className="absolute bottom-10 right-10 text-4xl">
                    <FaQuoteRight></FaQuoteRight>
                  </p>
                  <div className="absolute top-10 right-5 flex items-center gap-2">
                    <Rating
                      style={{ maxWidth: 90 }}
                      value={review.rating}
                      readOnly
                    />
                    <span className="text-sm">({review.rating})</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
