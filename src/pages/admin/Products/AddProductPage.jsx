import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { categories, sizes } from "../../../../public/data/productFormData";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase/firebase.config";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import PageTitle from "../../../components/PageTitle";

const storage = getStorage(app);
const AddProductPage = () => {
  const { axiosSecure } = useAxiosSecure();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // ! product size handing
  const [productSizes, setProductSizes] = useState([]);
  const [productSizesError, setProductSizesError] = useState(false);

  const handleSizeChange = (selectedOptions) => {
    const selectedSizes = selectedOptions.map((option) => option.value);
    setProductSizes(selectedSizes);
    setProductSizesError(false);
  };

  // ! product image handling
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const imgExt = image?.type?.split("/")[1];
  const handelFile = (e) => {
    const imgFile = e.target.files[0];
    setImage(imgFile);
    setImageError(false);
  };

  // ! from submit handler
  const handelAdd = (data) => {
    if (productSizes.length == 0) {
      setProductSizesError(true);
      return;
    }
    if (!image) {
      setImageError(true);
      return;
    }
    const storageRef = ref(storage, `/products-image/${data.title}.${imgExt}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          getDownloadURL(snapshot?.ref).then((url) => {
            const product = {
              title: data.title,
              image: url,
              price: data.price,
              discount: data.discount,
              description: data.description,
              category: data.category,
              size: productSizes,
              featured: data.featured
                .split("\n")
                .filter((feature) => feature.length !== 0),
              tags: data.tags.split("\n").filter((tag) => tag.length !== 0),
            };
            axiosSecure.post("/admin/add-product", product).then(({ data }) => {
              if (data.insertedId) {
                toast.success("Successfully product added!");
                reset();
              } else {
                toast.error("Something is wrong!");
              }
            });
          });
        }
      },
      (error) => toast.error(error.message)
    );
  };

  return (
    <main>
      <PageTitle title="Add Product | Programmer Fashion" />
      <section className="my-10">
        <SectionTitle title="Add Product" subtitle="Add a product!" />
      </section>
      <section className="my-10">
        <form className="mt-5" onSubmit={handleSubmit(handelAdd)}>
          <div className="flex flex-col md:flex-row md:gap-5">
            {/* ------------- Product Name ---------- */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <input
                type="text"
                placeholder="Product Name"
                className="primary-input w-full "
                {...register("title", { required: true })}
              />
              {errors.title?.type === "required" && (
                <p className="error-message">Product name is required</p>
              )}
            </div>
            {/* ------------- Product Category Name ---------- */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                placeholder="Category"
                className="primary-select w-full"
                defaultValue={"Select Category"}
                {...register("category", { required: true })}
              >
                <option disabled>Select Category</option>
                {categories.map((item, idx) => (
                  <option key={idx}>{item}</option>
                ))}
              </select>
              {errors.category?.type === "required" && (
                <p className="error-message">Category is required</p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-5">
            {/* ----------------- Size ----------------- */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Size</span>
              </label>
              <div className="w-full h-[48px] border border-slate-900 rounded-none flex flex-col justify-center">
                <Select
                  name="size"
                  isMulti
                  options={sizes}
                  className="basic-multi-select"
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      borderRadius: "0px",
                      border: "none",
                      height: "100%",
                      width: "100%",
                      outline: "none",
                    }),
                  }}
                  placeholder="Select Size"
                  onChange={handleSizeChange}
                />
              </div>
              {productSizesError && (
                <p className="error-message">Size is required</p>
              )}
            </div>
            {/* ----------------- Product Image ----------------- */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Image</span>
              </label>
              <input
                type="file"
                accept="image/jpeg, image/png"
                className="primary-file-input"
                onChange={handelFile}
              />
              {imageError && <p className="error-message">Image is required</p>}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:gap-5">
            {/* ------------- Product Price ---------- */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Product Price</span>
              </label>
              <input
                type="number"
                placeholder="Product Price"
                className="primary-input w-full "
                min={0}
                {...register("price", { required: true })}
              />
              {errors.price?.type === "required" && (
                <p className="error-message">Product price is required</p>
              )}
            </div>
            {/* ------------- Product Discount Price ---------- */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Discount</span>
              </label>
              <input
                type="number"
                placeholder="Product Discount"
                className="primary-input w-full "
                min={0}
                {...register("discount", { required: true })}
              />
              {errors.discount?.type === "required" && (
                <p className="error-message">Product discount is required</p>
              )}
            </div>
          </div>
          {/* Product Description */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Product Description</span>
            </label>
            <textarea
              placeholder="Product Description"
              className="primary-textarea w-full "
              {...register("description", { required: true })}
            ></textarea>
            {errors.price?.type === "required" && (
              <p className="error-message">Product description is required</p>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:gap-5">
            {/* Product Featured */}
            <div
              className="form-control w-full"
              title="Write one down another."
            >
              <label className="label">
                <span className="label-text">Product Featured</span>
              </label>
              <textarea
                placeholder="Product Featured. Write one down another."
                className="primary-textarea w-full "
                {...register("featured", { required: true })}
              ></textarea>
              {errors.featured?.type === "required" && (
                <p className="error-message">Product featured is required</p>
              )}
            </div>
            <div
              className="form-control w-full"
              title="Write one down another."
            >
              <label className="label">
                <span className="label-text">Product Tags</span>
              </label>
              <textarea
                placeholder="Product Tags. Write one down another."
                className="primary-textarea w-full "
                {...register("tags", { required: true })}
              ></textarea>
              {errors.tags?.type === "required" && (
                <p className="error-message">Product Tags is required</p>
              )}
            </div>
          </div>

          <div className="form-control w-full mt-3">
            <button className="primary-btn">Add Product</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AddProductPage;
