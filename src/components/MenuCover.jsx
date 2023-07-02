const MenuCover = ({ backgroundURL, heading, subheading }) => {
  return (
    <section
      style={{
        height: "300px",
        width: "100%",
        backgroundImage: `url(${backgroundURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-center items-center h-full bg-black text-white bg-opacity-60">
        <h1 className="text-5xl uppercase">{heading}</h1>
        <p className="text-xl">{subheading}</p>
      </div>
    </section>
  );
};

export default MenuCover;
