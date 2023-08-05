import moment from "moment/moment";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200">
      <div className="p-10 text-base-content grid grid-cols-1 md:grid-cols-2 space-y-5 lg:grid-cols-4 justify-between">
        <div className="w-fit flex flex-col items-center">
          <img src="/icon.png" className="h-[100px] w-[100px]" alt="" />
          <h1 className="text-2xl">PROGRAMMER FASHION</h1>
          <div>
            <p className="flex gap-2 items-center text-base">
              <FaEnvelope></FaEnvelope>info@programmer-fashion.com
            </p>
            <p className="flex gap-2 items-center text-base">
              <FaPhone></FaPhone>+880 1234567890
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="footer-title">Company</span>

          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/shop" className="link link-hover">
            Shops
          </Link>
          <Link to="/about" className="link link-hover">
            About Us
          </Link>
          <Link to="/contract" className="link link-hover">
            Contract Us
          </Link>
        </div>
        <div className="flex flex-col">
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
        <div>
          <span className="footer-title">Newsletter</span>
          <form
            className="form-control w-80"
            onSubmit={(e) => e.preventDefault()}
          >
            <label className="label">
              <span className="label-text">Enter your email address</span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                required
                className="input input-bordered w-full pr-16"
              />
              <button className="primary-btn absolute top-0 right-0">
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mb-5">
        <img
          src="https://securepay.sslcommerz.com/public/image/SSLCommerz-Pay-With-logo-All-Size-01.png"
          alt=""
        />
      </div>
      <div className="footer footer-center p-4 text-base-content border-t">
        <p>
          Copyright © {moment().format("YYYY")} - All right reserved by
          PROGRAMMER FASHION
        </p>
      </div>
    </footer>
  );
};

export default Footer;
