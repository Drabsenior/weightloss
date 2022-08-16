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
        {
          answerText: "F",
          next: "1",
          icon: "https://img.icons8.com/bubbles/344/female.png",
        },
        {
          answerText: "M",
          next: "7",
          icon: "https://img.icons8.com/bubbles/344/male.png",
        },
      ],
      que: "gender",
      backimage:
        "http://thoughtcatalog.com/wp-content/uploads/2013/11/menwomendiff.jpg",
    },
    {
      questiontext: "Did you have a birth ? ",
      answeroptions: [
        {
          answerText: "Yes",
          next: "2",
          icon: "https://img.icons8.com/color/344/embryo.png",
        },
        {
          answerText: "No",
          next: "7",
          icon: "https://img.icons8.com/external-bearicons-flat-bearicons/344/external-No-yes-or-no-bearicons-flat-bearicons.png",
        },
      ],
      que: "havebirth",
      backimage:
        "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/06/water_birth_baby-1296x728-header-1.jpg?w=1155&h=1528",
    },
    {
      questiontext: "What do you give birth by?",
      answeroptions: [
        {
          answerText: "Labour",
          next: "3",
          icon: "https://img.icons8.com/fluency/344/giving-birth.png",
        },
        {
          answerText: "CSC",
          next: "3",
          icon: "https://img.icons8.com/fluency/344/giving-birth.png",
        },
      ],
      que: "birthby",

      backimage:
        "https://media.istockphoto.com/photos/pregnant-lady-suffering-from-backache-husband-massaging-her-shoulders-picture-id1193730890?k=20&m=1193730890&s=612x612&w=0&h=VPKzwQ48G_j93LMqtkBIPtsqoKonIAbkN-yuWqOKhZw=",
    },
    {
      questiontext: "how long its been",
      questionoptions: [{ q: "months" }],
      insertvalue: { c: "4" },
      backimage:
        "https://cdn.cdnparenting.com/articles/2018/01/648398527-H.webp",
    },
    {
      questiontext: "Are you still feeding ?",
      answeroptions: [
        {
          answerText: "Yes",
          next: "5",
          icon: "https://img.icons8.com/color/344/embryo.png",
        },
        {
          answerText: "No ",
          next: "5",
          icon: "https://img.icons8.com/external-bearicons-flat-bearicons/344/external-No-yes-or-no-bearicons-flat-bearicons.png",
        },
      ],
      que: "stillfeeding",

      backimage:
        "https://post.healthline.com/wp-content/uploads/2020/07/mother_nursing_baby_in_bed-1200x628-facebook-1200x628.jpg",
    },
    {
      questiontext: "",
      Bmi: { n: "6" },
      insertvalue: { c: "6" },
      backimage:
        "https://www.diabetes.co.uk/wp-content/uploads/2019/01/iStock-528072248.jpg",
    },
    {
      questiontext: "What is your body type ?",
      answeroptions: [
        {
          answerText: "Extra Large",
          next: "7",
          icon: "https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/344/external-fat-health-vitaliy-gorbachev-blue-vitaly-gorbachev-1.png",
        },
        {
          answerText: "Large",
          next: "7",
          icon: "https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/344/external-fat-health-vitaliy-gorbachev-blue-vitaly-gorbachev.png",
        },
        {
          answerText: "Medium",
          next: "7",
          icon: "https://img.icons8.com/cotton/344/woman-torso.png",
        },
      ],
      que: "bodytype",
      backimage:
        "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F190102214222-20190103-size-stigma-workplace.jpg",
    },
    {
      questiontext: "What is your water in take ?",
      answeroptions: [
        {
          answerText: "A under 2 liter",
          next: "8",
          icon: "https://img.icons8.com/bubbles/344/water-cooler.png",
        },
        {
          answerText: "B. above 2 liter",
          next: "8",
          icon: "https://img.icons8.com/bubbles/344/water-cooler.png",
        },
      ],
      que: "waterintake",

      backimage:
        "https://images-stylist.s3-eu-west-1.amazonaws.com/app/uploads/2021/02/29110842/drink-water.jpg",
    },
    {
      questiontext: "Is there any addition when you eat ?",
      answeroptions: [
        {
          answerText: "Yes",
          next: "9",
          icon: "https://img.icons8.com/external-bearicons-outline-color-bearicons/344/external-Yes-yes-or-no-bearicons-outline-color-bearicons.png",
        },
        {
          answerText: "No",
          next: "9",
          icon: "https://img.icons8.com/external-bearicons-flat-bearicons/344/external-No-yes-or-no-bearicons-flat-bearicons.png",
        },
      ],
      que: "additiondiet",

      backimage:
        "https://post.healthline.com/wp-content/uploads/2020/06/salmon-olive-oil-healthy-1200x628-facebook-1.jpg",
    },
    {
      questiontext: "Is there any addiction you have like ?",
      answeroptions: [
        {
          answerText: "Coffee",
          next: "10",
          icon: "https://img.icons8.com/office/344/espresso-cup.png",
        },
        {
          answerText: "Tea",
          next: "10",
          icon: "https://img.icons8.com/office/344/teapot.png",
        },
        {
          answerText: "Soft drink",
          next: "10",
          icon: "https://img.icons8.com/external-konkapp-flat-konkapp/344/external-softdrink-cinema-konkapp-flat-konkapp.png",
        },
        {
          answerText: "Alcohol",
          next: "10",
          icon: "https://img.icons8.com/emoji/344/beer-mug.png",
        },
      ],
      que: "addiction",

      backimage:
        "https://stories.starbucks.com/uploads/2020/07/SBX202077-Summer-Beverages-Feature-image.jpg",
    },
    {
      questiontext: "Is there any health issue?",
      answeroptions: [
        {
          answerText: "Yes",
          next: "11",
          icon: "https://img.icons8.com/external-bearicons-outline-color-bearicons/344/external-Yes-yes-or-no-bearicons-outline-color-bearicons.png",
        },
        {
          answerText: "No",
          next: "11",
          icon: "https://img.icons8.com/external-bearicons-flat-bearicons/344/external-No-yes-or-no-bearicons-flat-bearicons.png",
        },
      ],
      que: "health issue",

      backimage:
        "https://businessmirror.com.ph/wp-content/uploads/2018/12/hf01-121318.jpg",
    },
    {
      questiontext: "Is there any in particular?",
      answeroptions: [
        {
          answerText: "Diabetes",
          next: "12",
        },
        {
          answerText: "Blood pressure",
          next: "12",
        },
        {
          answerText: "Backlash",
          next: "12",
        },
        {
          answerText: "Any gastric isssue",
          next: "12",
        },
        {
          answerText: "Other",
          next: "12",
        },
      ],
      que: "disease",

      backimage:
        "https://washingtonmonthly.com/wp-content/uploads/2019/10/iStock-1046447804.jpg",
    },
    {
      questiontext: "Occupation ?",
      answeroptions: [
        {
          answerText: "Student",
          next: "13",
          icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-student-online-learning-kiranshastry-lineal-color-kiranshastry-1.png",
        },
        {
          answerText: "Employee",
          next: "13",
          icon: "https://img.icons8.com/external-flaticons-flat-flat-icons/344/external-worker-insurance-flaticons-flat-flat-icons.png",
        },
      ],
      que: "occupation",

      backimage:
        "https://cdn.xxl.thumbs.canstockphoto.com/people-of-various-professions-set-teacher-chef-cook-construction-worker-characters-cartoon-vector-vector-clip-art_csp91306512.jpg",
    },
    {
      questiontext: "What is your sitting time ?",
      answeroptions: [
        {
          answerText: "Less Active",
          next: "14",
          icon: "https://img.icons8.com/external-sbts2018-flat-sbts2018/344/external-active-basic-ui-elements-2.3-sbts2018-flat-sbts2018.png",
        },
        {
          answerText: "Active",
          next: "14",
          icon: "https://img.icons8.com/external-sbts2018-flat-sbts2018/344/external-active-basic-ui-elements-2.3-sbts2018-flat-sbts2018.png",
        },
        {
          answerText: "More Active",
          next: "14",
          icon: "https://img.icons8.com/external-sbts2018-flat-sbts2018/344/external-active-basic-ui-elements-2.3-sbts2018-flat-sbts2018.png",
        },
      ],
      que: "sittingtime",

      backimage:
        "https://post.healthline.com/wp-content/uploads/2020/08/workplace-health-things-that-happen-when-you-sit-down-all-day_thumb.jpg",
    },
    {
      questiontext: "Sleeping time ?",
      answeroptions: [
        {
          answerText: "A. 4pm - 12Am",
          next: "15",
          icon: "https://img.icons8.com/external-sbts2018-flat-sbts2018/344/external-active-basic-ui-elements-2.3-sbts2018-flat-sbts2018.png",
        },
        {
          answerText: "B. above 6pm",
          next: "15",
          icon: "https://img.icons8.com/external-sbts2018-flat-sbts2018/344/external-active-basic-ui-elements-2.3-sbts2018-flat-sbts2018.png",
        },
      ],
      que: "sleepingtime",

      backimage:
        "https://www.verywellmind.com/thmb/_NvXGprP3usPvZZoHy6PbEEvJew=/2120x1192/smart/filters:no_upscale()/GettyImages-674707495-1a3096b7f13a4c90b719961ab96f708a.jpg",
    },
    {
      questiontext: "What kind of food you eat usually ?",
      answeroptions: [
        {
          answerText: "Eat bread",
          next: "16",
          icon: "https://img.icons8.com/office/344/meal.png",
        },
        {
          answerText: "Eat injera",
          next: "16",
          icon: "https://img.icons8.com/office/344/meal.png",
        },
        {
          answerText: "Eat sweet thing",
          next: "16",
          icon: "https://img.icons8.com/office/344/meal.png",
        },
        {
          answerText: "Eat junk food",
          next: "16",
          icon: "https://img.icons8.com/office/344/meal.png",
        },
      ],
      que: "food",

      backimage:
        "https://d18mqtxkrsjgmh.cloudfront.net/public/2021-03/Eating%20More%20Ultraprocessed%20%E2%80%98Junk%E2%80%99%20Food%20Linked%20to%20Higher%20CVD%20Risk.jpeg",
    },
    {
      questiontext: "Have you try to lose weight before ?",
      answeroptions: [
        {
          answerText: "Yes",
          next: "17",
          icon: "https://img.icons8.com/external-bearicons-outline-color-bearicons/344/external-Yes-yes-or-no-bearicons-outline-color-bearicons.png",
        },
        {
          answerText: "No",
          next: "19",
          icon: "https://img.icons8.com/external-bearicons-flat-bearicons/344/external-No-yes-or-no-bearicons-flat-bearicons.png",
        },
      ],
      que: "tryweightloss",

      backimage:
        "https://cdn-3.expansion.mx/dims4/default/9a5524a/2147483647/strip/true/crop/1212x636%200%20115/resize/1200x630!/format/jpg/quality/80/?url=https://cdn-3.expansion.mx/d7/e5/efcc6e5a40e3932dbbdd6fc76621/istock-1128680396.jpg",
    },
    {
      questiontext: "Did you try it ?",
      answeroptions: [
        {
          answerText: "By yourself",
          next: "19",
          icon: "https://img.icons8.com/office/344/checked--v1.png",
        },
        {
          answerText: "Professional",
          next: "18",
          icon: "https://img.icons8.com/office/344/checked--v1.png",
        },
      ],
      que: "weightlossbywho",

      backimage:
        "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Fitness/Articles/Favorite+Workouts/woman+with+personal+trainer-carousel.jpg",
    },
    {
      questiontext: " what kind of diet you use?",
      answeroptions: [
        {
          answerText: "Keto diet",
          next: "19",
        },
        {
          answerText: "inlitument testing ",
          next: "19",
        },
        {
          answerText: "Keto diet",
          next: "19",
        },
        {
          answerText: "None",
          next: "19",
        },
      ],
      que: "diet",

      backimage:
        "https://308286-943399-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2020/03/Different-Types-of-Diet.png",
    },
    {
      questiontext: "would you like a fasting diet or not?",
      answeroptions: [
        {
          answerText: "Yes",
          next: "23",
          icon: "https://img.icons8.com/external-bearicons-outline-color-bearicons/344/external-Yes-yes-or-no-bearicons-outline-color-bearicons.png",
        },
        {
          answerText: "No",
          next: "23",
          icon: "https://img.icons8.com/external-bearicons-flat-bearicons/344/external-No-yes-or-no-bearicons-flat-bearicons.png",
        },
      ],
      que: "fastingdiet",
    },
  ];
  const inputRef = useRef(null);
  const nextquestion = (num, answer, que) => {
    setQuestionCount(num);
    console.log(typeof question);

    setAnswers((current) => [...current, { [que]: answer }]);
    {
      console.log(answers);
      console.log(questionConut);
    }
  };

  const inputnext = (n, i) => {
    setAnswers((current) => [...current, { months: inputRef.current.value }]);
    setQuestionCount(n);
    if (questionConut === 23) {
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
    setAnswers((current) => [
      ...current,
      { age: bmi.age },
      { bloodtype: bmi.bloodtype },
      { height: bmi.height },
      { weight: bmi.weight },
    ]);
    const Bmi = (bmi.weight / bmi.height) * 2;
    if (Bmi < 18.5) {
      setAnswers((current) => [...current, { bmi: "underweight" }]);
    } else if (18.5 < Bmi < 24.9) {
      setAnswers((current) => [...current, { bmi: "normal" }]);
    } else if (25 < Bmi < 29.9) {
      setAnswers((current) => [...current, { bmi: "overweight" }]);
    } else if (30 < Bmi) {
      setAnswers((current) => [...current, { bmi: "obese" }]);
    }
    setQuestionCount(n);
    if (questionConut === 23) {
      setQuestionCount(0);
    }
  };
  return (
    <div className="questioncontainer">
      <div className="questionitemscontain">
        {questionConut < 23 ? (
          <>
            <img
              className="questionbackimage"
              src={question[questionConut].backimage}
              alt=""
            />

            <div className="questiontitle">
              <h2>{question[questionConut].questiontext}</h2>
              {/* <button
                onClick={() =>
                  nextquestion(
                    ans.next,
                    ans.answerText,
                    question[questionConut].questiontext
                  )
                }
              >
                back
              </button> */}
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
                    <li> - {answer.gender}</li>
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
