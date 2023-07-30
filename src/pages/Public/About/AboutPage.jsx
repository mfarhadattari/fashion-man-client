import MenuCover from "../../../components/MenuCover";
import banner from "../../../assets/images/banner.jpg";
import Recommendation from "./Sections/Recommendation";
import OurTeams from "./Sections/OurTeams";
import Testimonials from "./Sections/Testimonials";
import PageTitle from "../../../components/PageTitle";

const AboutPage = () => {
  return (
    <main>
      <PageTitle title="About | Programmer Fashion" />
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
