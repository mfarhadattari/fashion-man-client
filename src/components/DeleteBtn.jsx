import { FaTrashAlt } from "react-icons/fa";

const DeleteBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-circle btn-error btn-sm text-white"
    >
      <FaTrashAlt />
    </button>
  );
};

export default DeleteBtn;
