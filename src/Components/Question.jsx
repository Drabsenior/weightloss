import React, { useContext, useState } from "react";
import "./Question.css";
import { useRef } from "react";
import Lg from "../assets/images/lg.png";
import Logotrans from "../assets/images/logotrans.png";
import workout from "../assets/workoutplan/Workoutplan.pdf";
import { BsDownload } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { question } from "../data";
import UserContext from "../UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Question = () => {
  const [questionConut, setQuestionCount] = useState(0);
  const { formData, setFormData } = useContext(UserContext);
  const [answers, setAnswers] = useState([]);
  const [pathQuestion, setPathQuestion] = useState([]);
  const [mergedData, setMergedData] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [bmi, setBmi] = useState({
    height: "",
    weight: "",
    age: "",
    bloodtype: "O+",
  });

  const inputRef = useRef(null);
  const backbutton = () => {
    if (questionConut > -1) {
      const ind = pathQuestion.indexOf(questionConut) - 1;
      if (ind > -1) {
        setQuestionCount(pathQuestion[ind]);
      } else {
        setQuestionCount(0);
        setPathQuestion([]);
      }
      console.log(ind);
    }
    if (questionConut < 1) {
      navigate("/");
      console.log("soem");
    }
  };
  const handleConfirmSubmit = async () => {
    const API_ENDPOINT =
      "https://v1.nocodeapi.com/abenezermaru/google_sheets/zCChpcDBGdLqBkTc/addRows?tabId=billi_netsi";

    if (questionConut > 12) {
      console.log("true here");
      try {
        const response = await axios.post(API_ENDPOINT, mergedData);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      navigate("/payment");
    }
  };
  const nextquestion = (num, answer, que) => {
    console.log(que, answer);
    setQuestionCount(num);
    setPathQuestion((current) => [...current, num]);

    setAnswers((current) => [...new Set(current), { [que]: answer }]);
    const obj = { ...answers };
    const arr = [];
    arr.push({ obj });

    const splitobj = Object.keys(formData).map((key) => {
      return { [key]: formData[key] };
    });
    const merged = [...answers, ...splitobj];
    const newObj = Object.assign({}, ...merged);
    setMergedData([newObj]);
    // setData([newObj])
    // console.log(merged)
    console.log([newObj]);
    // console.log(mergedData)
    console.log("question count" + questionConut);
  };

  const inputnext = (n, i) => {
    setPathQuestion((current) => [...current, n]);

    setAnswers((current) => [...current, { months: inputRef.current.value }]);
    setQuestionCount(n);
    if (questionConut === 15) {
      setQuestionCount(0);
    }
  };
  const handlesubmit = (e) => {
    e.preventDefault();

    const val = e.target.value;
    setBmi({
      ...bmi,
      [e.target.name]: val,
    });
  };
  const handlebmi = (e, n) => {
    if (bmi.age || bmi.height || bmi.bloodtype || bmi.weight) {
      setAnswers((current) => [
        ...current,
        { age: bmi.age },
        { bloodtype: bmi.bloodtype },
        { height: bmi.height },
        { weight: bmi.weight },
      ]);
      setPathQuestion((current) => [...current, n]);

      const bmiheight = (bmi.height * bmi.height) / 10000;
      const Bmi = bmi.weight / bmiheight;

      if (Bmi < 18.5) {
        setAnswers((current) => [...current, { bmi: "underweight" }]);
      } else if (Bmi > 18.5 && Bmi < 24.9) {
        setAnswers((current) => [...current, { bmi: "normal" }]);
      } else if (Bmi > 25 && Bmi < 29.9) {
        setAnswers((current) => [...current, { bmi: "overweight" }]);
      } else if (Bmi > 30) {
        setAnswers((current) => [...current, { bmi: "obese" }]);
      }
      setQuestionCount(n);
      if (questionConut === 14 || Bmi < 18) {
        setQuestionCount(15);
        //navigate to some other page
      }
    } else {
      alert("input field required");
    }
  };
  return (
    <div className="questioncontainer text-white">
      <div className="questionitemscontain">
        {questionConut < 15 ? (
          <>
            <img
              className="questionbackimage brightness-75"
              src={question[questionConut].backimage}
              alt=""
            />

            <div className="questiontitle">
              <h2>{question[questionConut].questiontext}</h2>
              <button className="backbtn" onClick={() => backbutton()}>
                <BiArrowBack size={40} color={"white"} />
              </button>
              <img
                className="lglogobilli !w-16 !-ml-8"
                src={Logotrans}
                alt=""
              />
            </div>
            <div className="buttoncontainer ">
              {question[questionConut].answeroptions &&
                question[questionConut].answeroptions.map((ans, index) => {
                  return (
                    <>
                      <button
                        className="!border-white text-lg"
                        onClick={() =>
                          nextquestion(
                            ans.next,
                            ans.answerText,
                            question[questionConut].que
                          )
                        }
                        key={index}
                      >
                        {ans.answerText}
                        {ans.icon ? <img src={ans.icon} alt="" /> : null}
                      </button>
                    </>
                  );
                })}
            </div>
            {question[questionConut].questionoptions &&
              question[questionConut].questionoptions.map((que, index) => {
                return (
                  <div className="inputscontain">
                    <div className="inputsflex">
                      <input
                        placeholder={que.q}
                        type="text"
                        key={index}
                        ref={inputRef}
                      />
                    </div>
                  </div>
                );
              })}

            {question[questionConut].insertvalue &&
              !question[questionConut].Bmi && (
                <div className="buttonsubmit">
                  <button
                    onClick={() =>
                      inputnext(question[questionConut].insertvalue.c)
                    }
                  >
                    Submit
                  </button>
                </div>
              )}
            {question[questionConut].Bmi && (
              <div className=" z-50 absolute top-[25%] left-[40%] w-48 space-y-4 flex flex-col">
                <input
                  type="number"
                  name="height"
                  placeholder="Height cm"
                  required
                  value={bmi.height}
                  onChange={handlesubmit}
                  className="!w-full px-2 py-3"
                />
                <input
                  required
                  type="number"
                  name="weight"
                  placeholder="weight kg"
                  value={bmi.weight}
                  onChange={handlesubmit}
                  className="!w-full px-2 py-3"
                />
                <input
                  required
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={bmi.age}
                  onChange={handlesubmit}
                  className="!w-full px-2 py-3"
                />
                <select
                  value={bmi.bloodtype}
                  name="bloodtype"
                  onChange={handlesubmit}
                  defaultValue="O+"
                  required
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
                <button
                  onClick={(e) => handlebmi(e, question[questionConut].Bmi.n)}
                  className="bg-blue-500 text-white rounded-full py-1 w-36 self-center text-lg font-semibold"
                >
                  Submit
                </button>
              </div>
            )}
          </>
        ) : (
          <div className=" flex items-center justify-center w-full">
            {/* <h2>You are finished</h2>
            <span>Download your plan</span>
            <div className="downloadtitle">
              <a href={workout} download>
                Download
              </a>
            </div>
            <div className="downloadicon">
              <BsDownload color="white" />
            </div>
            <br /> */}

            <div className=" flex flex-col w-full px-6 text-gray-500">
              <button className="backbtn" onClick={() => backbutton()}>
                <BiArrowBack size={40} color={"white"} />
              </button>
              <h2 className="text-xl mb-5">your answers go back to edit</h2>
              {mergedData.map((item, index) => (
                <ul key={index} className="  max-h-72 flex-wrap flex ">
                  {Object.entries(item).map(([key, value]) => (
                    <li key={key} className="text-lg ml-8">
                      - {key}: {value}
                    </li>
                  ))}
                </ul>
              ))}
              <button
                className="bg-green-500 rounded-xl text-lg self-end px-4 py-1 mt-5 text-white"
                onClick={() => handleConfirmSubmit()}
              >
                Confirm submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
