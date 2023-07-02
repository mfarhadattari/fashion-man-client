
const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold uppercase">{title}</h1>
      <p className="text-xl">{subtitle}</p>
    </div>
  );
};

export default SectionTitle;
