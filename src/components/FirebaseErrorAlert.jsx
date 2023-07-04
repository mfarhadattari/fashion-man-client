import Swal from "sweetalert2";

const FirebaseErrorAlert = (message) => {
  const title = message.split("/")[1].slice(0, -2).split("-").join(" ");
  return Swal.fire({
    position: "center",
    icon: "error",
    title: title,
    color: "red",
    showConfirmButton: false,
    timer: 2500,
  });
};

export default FirebaseErrorAlert;
