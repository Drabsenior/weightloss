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
    <div className="bg-hero w-screen h-screen  bg-cover font-thin">
      <div className="flex justify-center items-center h-full max-w-[35%] mx-auto">
        <form
          action=""
          className="flex items-center justify-center flex-col  space-y-8  px-10 py-10  bg-black/20 shadow-2xl  border-2 border-black/5 w-full rounded-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-thin  text-white  self-center  ">
            Form Data
          </h1>

          <input
            type="text"
            placeholder="FirstName"
            className="px-2 py-2 w-full  outline-none rounded-lg"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="LastName"
            className="px-2 py-2 w-full  outline-none rounded-lg"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Phone"
            className="px-2 py-2 w-full  outline-none rounded-lg"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />
          <button
            className="bg-blue-500 text-white  w-full py-1.5 rounded-full  text-xl font-thin"
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
