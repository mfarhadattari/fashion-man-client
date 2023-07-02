import MenuCover from "../../../components/MenuCover";
import banner from "../../../assets/images/banner.jpg";

const AboutPage = () => {
  return (
    <main>
      <MenuCover
        heading="About Us"
        subheading="Explore who we are?"
        backgroundURL={banner}
      ></MenuCover>
    </main>
  );
};

export default AboutPage;
