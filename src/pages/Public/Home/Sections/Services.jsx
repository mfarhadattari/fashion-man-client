import { FaFingerprint, FaLifeRing, FaShippingFast, FaUndo } from "react-icons/fa";

const Services = () => {
  return (
    <section className="my-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start w-fit mx-auto">
        <div className="flex gap-5 items-center w-[300px]">
          <div className="text-[#024E82] text-5xl ">
            <FaShippingFast></FaShippingFast>
          </div>
          <div>
            <div className="text-xl font-bold uppercase">Free Shipping</div>
            <div className="font-medium">Enjoy free shipping on <br /> all orders above $100</div>
          </div>
        </div>
        <div className="flex gap-5 items-center w-[300px]">
          <div className="text-[#024E82] text-5xl ">
            <FaLifeRing></FaLifeRing>
          </div>
          <div>
            <div className="text-xl font-bold uppercase">SUPPORT 24/7</div>
            <div className="font-medium">Our support team is there <br /> to help you for queries</div>
          </div>
        </div>
        <div className="flex gap-5 items-center w-[300px]">
          <div className="text-[#024E82] text-5xl ">
            <FaUndo></FaUndo>
          </div>
          <div>
            <div className="text-xl font-bold uppercase">30 DAYS RETURN</div>
            <div className="font-medium">Simply return it within 30 days for an exchange</div>
          </div>
        </div>
        <div className="flex gap-5 items-center w-[300px]">
          <div className="text-[#024E82] text-5xl ">
            <FaFingerprint></FaFingerprint>
          </div>
          <div>
            <div className="text-xl font-bold uppercase">100% PAYMENT SECURE</div>
            <div className="font-medium">Our payments are secured with 256 bit encryption</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
