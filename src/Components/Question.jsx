import React, {  useContext, useState } from "react";
import "./Question.css";
import { useRef } from "react";
import Lg from "../assets/images/lg.png";
import workout from "../assets/workoutplan/Workoutplan.pdf";
import { BsDownload } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import {question} from '../data'
import UserContext from "../UserContext";
import axios from "axios";
const Question = () => {
  const [questionConut, setQuestionCount] = useState(0);
  const {formData, setFormData} = useContext(UserContext);
  const [answers, setAnswers] = useState([]);
  const [pathQuestion, setPathQuestion] = useState([]);
  const [mergedData,setMergedData]=useState([])
  const [bmi, setBmi] = useState({
    height: "",
    weight: "",
    age: "",
    bloodtype: "",
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
  };
  const nextquestion = async (num, answer, que) => {
    setQuestionCount(num);
    setPathQuestion((current) => [...current, num]);

    setAnswers((current) => [...new Set(current), { [que]: answer }]);
    const obj = {...answers}
     const arr = []
     arr.push({obj})
     console.log(formData)
     console.log(answers)
    
    const splitobj = Object.keys(formData).map((key) => {
      return { [key]: formData[key] };
    });
    const API_ENDPOINT= 'https://v1.nocodeapi.com/abenezermaru/google_sheets/zCChpcDBGdLqBkTc/addRows?tabId=billi_netsi'
    const merged = [...answers, ...splitobj]
    setMergedData(merged)
      data={
        gender:"m",
        
      }
      axios.post(API_ENDPOINT,mergedData).then(res=>{
        console.log(res)
      })
 
  };

  const inputnext = (n, i) => {
    setPathQuestion((current) => [...current, n]);

    setAnswers((current) => [...current, { months: inputRef.current.value }]);
    setQuestionCount(n);
    if (questionConut === 14) {
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
    console.log(answers);
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

      const bmiheight = (bmi.height * bmi.height)/10000;
      console.log(bmiheight)
      const Bmi = bmi.weight / bmiheight;
      console.log(Bmi )
    
      if(Bmi < 18.5){
        setAnswers((current)=>[...current ,{bmi: "underweight"}])
      }else if( Bmi > 18.5 && Bmi < 24.9){
        setAnswers((current)=>[...current ,{bmi: "normal"}])
      }else if(Bmi > 25 && Bmi < 29.9){
        setAnswers((current)=>[...current ,{bmi: "overweight"}])
      }else if(Bmi > 30){
        setAnswers((current) => [...current, { bmi: "obese" }]);

      }
      setQuestionCount(n);
      if (questionConut === 14 || Bmi < 18) {
        setQuestionCount(15);
        //navigate to some other page
      }
    }
  };
  return (
    <div className="questioncontainer">
      <div className="questionitemscontain">
        {questionConut < 15 ? (
          <>
            <img
              className="questionbackimage"
              src={question[questionConut].backimage}
              alt=""
            />

            <div className="questiontitle">
              <h2>{question[questionConut].questiontext}</h2>
              <button className="backbtn" onClick={() => backbutton()}>
                <BiArrowBack size={40} color={"white"} />
              </button>
              <img className="lglogobilli" src={Lg} alt="" />
            </div>
            <div className="buttoncontainer">
              {question[questionConut].answeroptions &&
                question[questionConut].answeroptions.map((ans, index) => {
                  return (
                    <>
                      <button
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
                   <select value={bmi.bloodtype} name="bloodtype" onChange={handlesubmit} >
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
                  className="bg-teal-200 rounded-lg w-36 self-center text-lg font-semibold"
                >
                  Submit
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="answershare">
            <h2>You are finished</h2>
            <span>Download your plan</span>
            <div className="downloadtitle">
              <a href={workout} download>
                Download
              </a>
            </div>
            <div className="downloadicon">
              <BsDownload color="white" />
            </div>
            <br />

            <div className="answercontainer">
              
              {mergedData.map((item, index) => (
              <ul key={index}>
                {Object.entries(item).map(([key, value]) => (
                  <li key={key}>
                    {key}: {value}
                  </li>
    ))}
  </ul>
))}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
