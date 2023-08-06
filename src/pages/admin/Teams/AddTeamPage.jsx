import { useState } from "react";
import PageTitle from "../../../components/PageTitle";
import SectionTitle from "../../../components/SectionTitle";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase/firebase.config";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const storage = getStorage(app);
const AddTeamPage = () => {
  const { axiosSecure } = useAxiosSecure();

  const [image, setImage] = useState(null);
  const imgExt = image?.type?.split("/")[1];

  const handelFile = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile?.size > 300000) {
      setImage(null);
      toast("Image must size less then 300kb");
      return;
    }
    setImage(imgFile);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handelRegister = (data) => {
    const { email, name, position, address, phone } = data;
    const storageRef = ref(storage, `/our-teams/${email}-avatar.${imgExt}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          getDownloadURL(snapshot?.ref).then((url) => {
            const memberInfo = {
              name,
              email,
              phone,
              position,
              address,
              image: url,
            };
            axiosSecure
              .post("/admin/add-member", memberInfo)
              .then(({ data }) => {
                if (data.insertedId) {
                  toast.success("Member Added Successfully!");
                  reset()
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
      <PageTitle title="Add Team Member | Programmer Fashion" />
      <section className="my-10">
        <SectionTitle title="Add Team Member" />
      </section>
      <section>
        <div className="p-5 w-full border rounded-lg">
          <h1 className="text-center text-xl font-medium">Add Team Member</h1>
          <form className="mt-5" onSubmit={handleSubmit(handelRegister)}>
            <div className="flex flex-col md:flex-row md:gap-5">
              {/* ------------- Name ---------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="primary-input w-full "
                  {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <p className="error-message">Name is required</p>
                )}
              </div>
              {/* ----------------- Email ----------------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="primary-input w-full"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className="error-message">Email is required</p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-5">
              {/* ------------- Phone ---------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="text"
                  placeholder="Phone"
                  className="primary-input w-full "
                  {...register("phone", { required: true })}
                />
                {errors.phone?.type === "required" && (
                  <p className="error-message">Phone is required</p>
                )}
              </div>
              {/* ------------- Position ---------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Position</span>
                </label>
                <input
                  type="text"
                  placeholder="Position"
                  className="primary-input w-full "
                  {...register("position", { required: true })}
                />
                {errors.position?.type === "required" && (
                  <p className="error-message">Position is required</p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-5">
              {/* ------------- Address ---------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Adress"
                  className="primary-input w-full "
                  {...register("address", { required: true })}
                />
                {errors.address?.type === "required" && (
                  <p className="error-message">Address is required</p>
                )}
              </div>
              {/* ----------------- Photo ----------------- */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  className="primary-file-input"
                  onChange={handelFile}
                />
              </div>
            </div>

            <div className="form-control w-full mt-3">
              <button className="primary-btn" disabled={!imgExt}>
                Add Member
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default AddTeamPage;
