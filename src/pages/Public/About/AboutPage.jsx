import MenuCover from "../../../components/MenuCover";
import banner from "../../../assets/images/banner.jpg";
import Recommendation from "./Sections/Recommendation";
import OurTeams from "./Sections/OurTeams";
import Testimonials from "./Sections/Testimonials";

const AboutPage = () => {
  return (
    <main>
      <MenuCover
        heading="About Us"
        subheading="Explore who we are?"
        backgroundURL={banner}
      ></MenuCover>
      <Recommendation></Recommendation>
      <OurTeams></OurTeams>
      <Testimonials></Testimonials>
    </main>
  );
};

export default AboutPage;
