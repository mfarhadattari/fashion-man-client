import Marquee from "react-fast-marquee";
import { categories } from "../../../../../public/data/productFormData";

const Category = () => {
  return (
    <section className="my-10">
      <Marquee pauseOnHover={true}>
        {categories.map((item, idx) => (
          <div className="w-[200px] h-[120px] border m-5 text-center rounded-3xl text-2xl hover:bg-slate-950 flex justify-center items-center uppercase" key={idx}>{item}</div>
        ))}
      </Marquee>
    </section>
  );
};

export default Category;
