import MenuCover from "../../../components/MenuCover";
import banner from "../../../assets/images/banner.jpg";

const Shop = () => {
  return (
    <main>
      <MenuCover
        heading="Our Shop"
        subheading="Get your favorite product"
        backgroundURL={banner}
      ></MenuCover>
    </main>
  );
};

export default Shop;
