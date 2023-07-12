import MenuCover from "../../../components/MenuCover";
import banner from "../../../assets/images/banner.jpg";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const ContractPage = () => {
  return (
    <main>
      <MenuCover
        backgroundURL={banner}
        heading="contact us"
        subheading="Contract us for help!"
      ></MenuCover>
      <section className="md:p-10">
        <div className="hero w-full">
          <div className="hero-content w-full flex-col items-start  gap-10 md:flex-row">
            <div className="p-0 lg:w-2/3 space-y-3 ">
              <h1 className="text-3xl font-medium">
                We would love to hear from you.
              </h1>
              <p className="lg:w-3/4">
                If you have any query or any type of suggestion, you can contact
                us here. We would love to hear from you.
              </p>
              <form className="card-body p-0">
                <div className="flex flex-col lg:flex-row gap-5">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="name"
                      placeholder="Name"
                      required
                      className="input  border-green-600 rounded-none"
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
                      className="input border-green-600 rounded-none"
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    placeholder="Message"
                    className="green-textarea"
                    rows="4"
                  ></textarea>
                </div>
                <div className="form-control mt-2">
                  <button
                    type="submit"
                    className="green-btn w-fit"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full lg:w-1/3 space-y-10 text-left text-lg">
              <div>
                <h1 className="text-2xl font-bold mb-2 uppercase">Visit Us</h1>
                <p>
                  Shikalbaha, Karnafuli <br />
                  Chattogram, Bangladesh
                </p>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2 uppercase">
                  Contract Us
                </h1>
                <a href="mailto:info@programmer-fashion.com">
                  info@programmer-fashion.com
                </a>
                <p>+880 1234567890, +880 1234567890</p>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2 uppercase">
                  Connect Us
                </h1>
                <div className="flex gap-7 text-4xl">
                  <a href="https://www.facebook.com">
                    <FaFacebook></FaFacebook>
                  </a>
                  <a href="https://www.twitter.com">
                    <FaTwitter></FaTwitter>
                  </a>
                  <a href="https://www.linkedin.com">
                    <FaLinkedinIn></FaLinkedinIn>
                  </a>
                  <a href="https://www.instragram.com">
                    <FaInstagram></FaInstagram>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContractPage;
