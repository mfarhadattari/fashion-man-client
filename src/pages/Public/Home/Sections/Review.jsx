import { Rating } from "@smastrom/react-rating";
import reviewimage from "../../../../assets/images/review.png";
import { useState } from "react";
import SectionTitle from "../../../../components/SectionTitle";

const Review = () => {
  const [rating, setRating] = useState(0);

  return (
    <section className="my-10 p-5">
      <SectionTitle title="Review Us" subtitle="What you thing about us!" />
      <div className="flex flex-col lg:flex-row-reverse gap-10 items-center h-fit mt-10">
        <div className="w-full" data-aos="zoom-in-left"  data-aos-duration="3000">
          <img src={reviewimage} className="rounded-md" />
        </div>
        <form className="card-body p-0 w-full" data-aos="zoom-in-right"  data-aos-duration="3000">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                required
                className="primary-input"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                required
                className="primary-input"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Rating</span>
              </label>
              <div className="w-full">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={rating}
                  onChange={setRating}
                />
              </div>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Review</span>
              </label>
              <input
                type="text"
                placeholder="Review"
                required
                className="primary-input"
              />
            </div>
          </div>
          <div className="form-control mt-2">
            <button type="submit" className="primary-btn w-fit">
              Send Review
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Review;
