import React, { useEffect, useState } from "react";
import "./Question.css";
import { useRef } from "react";
import workout from "../assets/workoutplan/Workoutplan.pdf";
import { BsDownload } from "react-icons/bs";
const Question = () => {
  const [questionConut, setQuestionCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [length, setLength] = useState(2);
  const [bmi, setBmi] = useState({
    height: "",
    weight: "",
    age: "",
    bloodtype: "",
  });
  const question = [
    {
      questiontext: "what is your gender ?",
      answeroptions: [
        { answerText: "F", next: "1" },
        { answerText: "M", next: "7" },
      ],
    },
    {
      questiontext: "Did you have a birth ? ",
      answeroptions: [
        { answerText: "Yes", next: "2" },
        { answerText: "No", next: "7" },
      ],
    },
    {
      questiontext: "",
      answeroptions: [
        { answerText: "Labour", next: "3" },
        { answerText: "CSC", next: "3" },
      ],
    },
    {
      questiontext: "how long its been",
      questionoptions: [{ q: "months" }],
      insertvalue: { c: "4" },
    },
    {
      questiontext: "Are you still feeding ?",
      answeroptions: [
        { answerText: "Yes", next: "5" },
        { answerText: "No ", next: "5" },
      ],
    },
    {
      questiontext: "",
      Bmi: { n: "6" },
      insertvalue: { c: "6" },
    },
    {
      questiontext: "What is your body type ?",
      answeroptions: [
        { answerText: "Extra Large", next: "7" },
        { answerText: "Large", next: "7" },
        { answerText: "Medium", next: "7" },
      ],
    },
    {
      questiontext: "What is your water in take ?",
      answeroptions: [
        { answerText: "A under 2 liter", next: "8" },
        { answerText: "B. above 2 liter", next: "8" },
      ],
    },
    {
      questiontext: "Is there any addition when you eat ?",
      answeroptions: [
        { answerText: "Yes", next: "9" },
        { answerText: "No", next: "9" },
      ],
    },
    {
      questiontext: "Is there any addiction you have like ?",
      answeroptions: [
        { answerText: "Coffee", next: "10" },
        { answerText: "Tea", next: "10" },
        { answerText: "Soft drink", next: "10" },
        { answerText: "Alcohol", next: "10" },
      ],
    },
    {
      questiontext: "Is there any health issue?",
      answeroptions: [
        { answerText: "Yes", next: "11" },
        { answerText: "No", next: "11" },
      ],
    },
    {
      questiontext: "",
      answeroptions: [
        { answerText: "Diabetes", next: "12" },
        { answerText: "Blood pressure", next: "12" },
        { answerText: "Backlash", next: "12" },
        { answerText: "Any gastric isssue", next: "12" },
        { answerText: "Other", next: "12" },
      ],
    },
    {
      questiontext: "Occupation ?",
      answeroptions: [
        { answerText: "Student", next: "13" },
        { answerText: "Employee", next: "13" },
      ],
    },
    {
      questiontext: "What is your sitting time ?",
      answeroptions: [
        { answerText: "Less Active", next: "14" },
        { answerText: "Active", next: "14" },
        { answerText: "More Active", next: "14" },
      ],
    },
    {
      questiontext: "Sleeping time ?",
      answeroptions: [
        { answerText: "A. 4pm - 12Am", next: "15" },
        { answerText: "B. above 6pm", next: "15" },
      ],
    },
    {
      questiontext: "What kind of food you eat usually ?",
      answeroptions: [
        { answerText: "Eat bread", next: "16" },
        { answerText: "Eat injera", next: "16" },
        { answerText: "Eat more sweet thing", next: "16" },
        { answerText: "Eat junk food", next: "16" },
      ],
    },
    {
      questiontext: "Have you try to lose weight before ?",
      answeroptions: [
        { answerText: "Yes", next: "17" },
        { answerText: "No", next: "19" },
      ],
    },
    {
      questiontext: "",
      answeroptions: [
        { answerText: "By yourself", next: "19" },
        { answerText: "Professional", next: "18" },
      ],
    },
    {
      questiontext: "",
      answeroptions: [
        { answerText: "Keto diet", next: "19" },
        { answerText: "inlitument testing ", next: "19" },
        { answerText: "Keto diet", next: "19" },
        { answerText: "None", next: "19" },
      ],
    },
    {
      questiontext: "would you like a fasting diet or not?",
      answeroptions: [
        { answerText: "Yes", next: "0" },
        { answerText: "No", next: "0" },
      ],
    },
  ];
  const inputRef = useRef(null);
  const nextquestion = (num, answer) => {
    setQuestionCount(num);
    setAnswers((current) => [...current, answer]);
    {
      console.log(answers);
      console.log(questionConut);
    }
  };

  const inputnext = (n, i) => {
    setAnswers((current) => [...current, inputRef.current.value]);
    setQuestionCount(n);
    if (questionConut === 19) {
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
    setAnswers((current) => [
      ...current,
      bmi.age,
      bmi.bloodtype,
      bmi.height,
      bmi.weight,
    ]);
    setQuestionCount(n);
    if (questionConut === 19) {
      setQuestionCount(0);
    }
  };
  return (
    <div className="questioncontainer">
      <div className="questionitemscontain">
        {questionConut < 19 ? (
          <>
            <div className="questiontitle">
              <h2>{question[questionConut].questiontext}</h2>
            </div>
            <div className="buttoncontainer">
              {question[questionConut].answeroptions &&
                question[questionConut].answeroptions.map((ans, index) => {
                  return (
                    <>
                      <button
                        onClick={() => nextquestion(ans.next, ans.answerText)}
                        key={index}
                      >
                        {ans.answerText}
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
              <div className="inputscontainer">
                <input
                  type="text"
                  name="height"
                  placeholder="Height"
                  value={bmi.height}
                  onChange={handlesubmit}
                />
                <input
                  type="text"
                  name="weight"
                  placeholder="weight"
                  value={bmi.weight}
                  onChange={handlesubmit}
                />
                <input
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={bmi.age}
                  onChange={handlesubmit}
                />
                <input
                  type="text"
                  name="bloodtype"
                  placeholder="Blood type"
                  value={bmi.bloodtype}
                  onChange={handlesubmit}
                />
                <button
                  onClick={(e) => handlebmi(e, question[questionConut].Bmi.n)}
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
              {answers.map((answer) => {
                return (
                  <ul>
                    <li> - {answer}</li>
                  </ul>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
