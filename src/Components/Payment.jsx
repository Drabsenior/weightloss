import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSvg from "../assets/svg/loadingio.svg";
const imageMimeType = /image\/(png|jpg|jpeg)/i;

const Payment = () => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [fileDataURL, setFileDataURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setData(e.target.files[0]);
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setImageUrl(dataUrl);
    };
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  const handleUpload = async () => {
    const BOT_TOKEN = "6186190625:AAGOUD8OoACmZ2aGF0iMYBabBkeANyzXjIM";
    const CHAT_ID = "2124047667";

    try {
      setLoading(true);
      const response = await axios.all([
        axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`,
          {
            chat_id: CHAT_ID,
            photo: data,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        axios.post(
          `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${name}`
        ),
      ]);
      console.log(response.data);
      alert("sent successfully");
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("something went wrong");
    }
  };

  return (
    <div className=" w-screen h-screen bg-hero bg-cover font-thin text-white overflow-x-hidden">
      {loading ? (
        <div className="absolute bg-gray-500/50 w-screen h-screen flex justify-center items-center">
          <img src={LoadingSvg} alt="" />
        </div>
      ) : null}
      <div className="flex justify-center items-center w-full h-full">
        <div
          className={`w-full h-full  md:w-[38%] md:h-auto py-10  bg-black/20 shadow-2xl  border-2 border-black/5 md:rounded-lg`}
        >
          <div className="flex items-center justify-center flex-col h-full w-full">
            <h2 className="text-3xl  mb-0">Payment verification</h2>
            <div className="flex self-start px-[10%] text-xl flex-col py-10 w-full flex-wrap">
              <label htmlFor="name" className="font-thin">
                Name{" "}
              </label>
              <input
                type="text"
                placeholder="Abebe kebede"
                id="name"
                className="outline-none rounded-lg px-3 mt-3 w-full py-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="max-w-5xl w-[80%] ">
              <label className="flex justify-center w-full h-auto py-5  items-center px-4 transition bg-white   flex-col border-gray-300  rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                <span className="flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    viewBox="0 0 24                24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="font-medium text-gray-600">
                    Drop files to Attach, or
                    <span className="text-blue-600 underline">browse</span>
                  </span>
                </span>
                <input
                  type="file"
                  name="file_upload"
                  className="hidden"
                  accept="image/*"
                  onChange={changeHandler}
                />
                {fileDataURL ? (
                  <p className="w-40 mt-7">
                    {<img src={imageUrl} alt="preview" />}
                  </p>
                ) : null}
              </label>
            </div>

            <button
              className={`${
                loading ? "bg-blue-300" : "bg-blue-500"
              } w-[70%] rounded-full text-white text-xl  mt-6 py-3 font-thin `}
              onClick={() => handleUpload()}
            >
              {loading ? "Uploading" : "Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
