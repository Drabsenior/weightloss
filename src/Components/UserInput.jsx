import { useContext } from "react";
import UserContext from "../UserContext";
import { useNavigate } from "react-router-dom";

const UserInput = () => {
  const { formData, setFormData } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.firstName | formData.lastName | formData.phone) {
      navigate("/question");
    } else {
      alert("user input required");
    }
  };
  return (
    <div className="bg-hero w-screen h-screen  bg-cover">
      <div className="flex justify-center items-center h-full max-w-[40%] mx-auto">
        <form
          action=""
          className="flex items-center justify-center flex-col  space-y-8  px-10 py-10  bg-teal-400 w-full rounded-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-semibold  self-start text-yellow-50 ">
            Form Data
          </h1>

          <input
            type="text"
            placeholder="FirstName"
            className="px-2 py-2 w-full outline-none "
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="LastName"
            className="px-2 py-2 w-full outline-none "
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Phone"
            className="px-2 py-2 w-full outline-none "
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <button
            className="bg-blue-500 text-white  px-6 w-44 py-2 rounded-full  text-xl font-semibold"
            type="submit"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserInput;
