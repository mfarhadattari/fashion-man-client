import MenuCover from "../../../components/MenuCover";
import banner from "../../../assets/images/banner.jpg";

const ContractPage = () => {
  return (
    <main>
      <MenuCover
        backgroundURL={banner}
        heading="contact us"
        subheading="Contract us for help!"
      ></MenuCover>
    </main>
  );
};

export default ContractPage;
