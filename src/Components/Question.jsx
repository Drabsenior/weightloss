import React, { useEffect, useState } from "react";
import "./Question.css";
import { useRef } from "react";
import Lg from "../assets/images/lg.png";
import workout from "../assets/workoutplan/Workoutplan.pdf";
import { BsDownload } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
const Question = () => {
  const [questionConut, setQuestionCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [pathQuestion, setPathQuestion] = useState([]);
  const [length, setLength] = useState(2);
  const [bmi, setBmi] = useState({
    height: "",
    weight: "",
    age: "",
    bloodtype: "",
  });
  const question = [
    {
      questiontext: "ጾታዎ ምንድን ነው?",
      answeroptions: [
        {
          answerText: "ሴ",
          next: "1",
          icon: "https://img.icons8.com/bubbles/344/female.png",
        },
        {
          answerText: "ወ",
          next: "6",
          icon: "https://img.icons8.com/bubbles/344/male.png",
        },
      ],
      que: "gender",
      backimage:
        "http://thoughtcatalog.com/wp-content/uploads/2013/11/menwomendiff.jpg",
    },
    {
      questiontext: "በቅርቡ ወልደሻል ? ",
      answeroptions: [
        {
          answerText: "አዎ",
          next: "2",
          icon: "https://img.icons8.com/color/344/embryo.png",
        },
        {
          answerText: "አይ",
          next: "6",
          icon: "https://img.icons8.com/external-bearicons-flat-bearicons/344/external-No-yes-or-no-bearicons-flat-bearicons.png",
        },
      ],
      que: "havebirth",
      backimage:
        "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/06/water_birth_baby-1296x728-header-1.jpg?w=1155&h=1528",
    },
    {
      questiontext: "ልጅሽን በምን ተግላገልሽ?",
      answeroptions: [
        {
          answerText: "Labour(ምጥ)",
          next: "3",
          icon: "https://img.icons8.com/fluency/344/giving-birth.png",
        },
        {
          answerText: "CSC(ኦፕራሲዮን)",
          next: "4",
          icon: "https://img.icons8.com/fluency/344/giving-birth.png",
        },
      ],
      que: "birthby",

      backimage:
        "https://media.istockphoto.com/photos/pregnant-lady-suffering-from-backache-husband-massaging-her-shoulders-picture-id1193730890?k=20&m=1193730890&s=612x612&w=0&h=VPKzwQ48G_j93LMqtkBIPtsqoKonIAbkN-yuWqOKhZw=",
    },
    {
      questiontext: "ስንት ጊዜ ሆነው",
      answeroptions: [
        {
          answerText: "ከ 3 ወር በላይ",
          next: "5",
          icon: "https://img.icons8.com/fluency/344/giving-birth.png",
        },
        {
          answerText: "ከ 3 ወር በታች",
          next: "24",
          icon: "https://img.icons8.com/fluency/344/giving-birth.png",
        },
      ],
      que: "Labour",
      backimage:
        "https://cdn.cdnparenting.com/articles/2018/01/648398527-H.webp",
    },
    {
      questiontext: "ስንት ጊዜ ሆነው",
      answeroptions: [
        {
          answerText: "ከ 4 ወር በላይ",
          next: "5",
          icon: "https://img.icons8.com/fluency/344/giving-birth.png",
        },
        {
          answerText: "ከ 3 ወር በታች",
          next: "24",
          icon: "https://img.icons8.com/fluency/344/giving-birth.png",
        },
      ],
      que: "CSC",
      backimage:
        "https://cdn.cdnparenting.com/articles/2018/01/648398527-H.webp",
    },
    {
      questiontext: "አሁንም እያጠባሸ ነው?",
      answeroptions: [
        {
          answerText: "አዎ",
          next: "6",
          icon: "https://img.icons8.com/color/344/embryo.png",
        },
        {
          answerText: "አይ ",
          next: "6",
          icon: "https://img.icons8.com/external-bearicons-flat-bearicons/344/external-No-yes-or-no-bearicons-flat-bearicons.png",
        },
      ],
      que: "stillfeeding",

      backimage:
        "https://post.healthline.com/wp-content/uploads/2020/07/mother_nursing_baby_in_bed-1200x628-facebook-1200x628.jpg",
    },
    {
      questiontext: "",
      Bmi: { n: "7" },
      insertvalue: { c: "7" },
      backimage:
        "https://www.medicaldevice-network.com/wp-content/uploads/sites/23/2021/09/shutterstock_765689137-1038x720.jpg",
    },
    {
      questiontext: "የሰውነት ቅርጽ ?",
      answeroptions: [
        {
          answerText: "በጣም ትልቅ",
          next: "8",
          icon: "https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/344/external-fat-health-vitaliy-gorbachev-blue-vitaly-gorbachev-1.png",
        },
        {
          answerText: "ትልቅ",
          next: "8",
          icon: "https://img.icons8.com/external-vitaliy-gorbachev-blue-vitaly-gorbachev/344/external-fat-health-vitaliy-gorbachev-blue-vitaly-gorbachev.png",
        },
        {
          answerText: "መካከለኛ",
          next: "8",
          icon: "https://img.icons8.com/cotton/344/woman-torso.png",
        },
      ],
      que: "bodytype",
      backimage:
        "https://dynaimage.cdn.cnn.com/cnn/c_fill,g_auto,w_1200,h_675,ar_16:9/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F190102214222-20190103-size-stigma-workplace.jpg",
    },
    // {
    //   questiontext: "What is your water in take ?",
    //   answeroptions: [
    //     {
    //       answerText: "A under 2 liter",
    //       next: "8",
    //       icon: "https://img.icons8.com/bubbles/344/water-cooler.png",
    //     },
    //     {
    //       answerText: "B. above 2 liter",
    //       next: "8",
    //       icon: "https://img.icons8.com/bubbles/344/water-cooler.png",
    //     },
    //   ],
    //   que: "waterintake",

    //   backimage:
    //     "https://images-stylist.s3-eu-west-1.amazonaws.com/app/uploads/2021/02/29110842/drink-water.jpg",
    // },
    // {
    //   questiontext: "Is there any addition when you eat ?",
    //   answeroptions: [
    //     {
    //       answerText: "Yes",
    //       next: "9",
    //       icon: "https://img.icons8.com/external-bearicons-outline-color-bearicons/344/external-Yes-yes-or-no-bearicons-outline-color-bearicons.png",
    //     },
    //     {
    //       answerText: "No",
    //       next: "9",
    //       icon: "https://img.icons8.com/external-bearicons-flat-bearicons/344/external-No-yes-or-no-bearicons-flat-bearicons.png",
    //     },
    //   ],
    //   que: "additiondiet",

    //   backimage:
    //     "https://post.healthline.com/wp-content/uploads/2020/06/salmon-olive-oil-healthy-1200x628-facebook-1.jpg",
    // },
    // {
    //   questiontext: "Is there any addiction you have like ?",
    //   answeroptions: [
    //     {
    //       answerText: "Coffee",
    //       next: "10",
    //       icon: "https://img.icons8.com/office/344/espresso-cup.png",
    //     },
    //     {
    //       answerText: "Tea",
    //       next: "10",
    //       icon: "https://img.icons8.com/office/344/teapot.png",
    //     },
    //     {
    //       answerText: "Soft drink",
    //       next: "10",
    //       icon: "https://img.icons8.com/external-konkapp-flat-konkapp/344/external-softdrink-cinema-konkapp-flat-konkapp.png",
    //     },
    //     {
    //       answerText: "Alcohol",
    //       next: "10",
    //       icon: "https://img.icons8.com/emoji/344/beer-mug.png",
    //     },
    //   ],
    //   que: "addiction",

    //   backimage:
    //     "https://stories.starbucks.com/uploads/2020/07/SBX202077-Summer-Beverages-Feature-image.jpg",
    // },
    {
      questiontext: "የጤና ችግሮች አሉ?",
      answeroptions: [
        {
          answerText: "አዎ",
          next: "9",
          icon: "https://img.icons8.com/external-bearicons-outline-color-bearicons/344/external-Yes-yes-or-no-bearicons-outline-color-bearicons.png",
        },
        {
          answerText: "አይ",
          next: "10",
          icon: "https://img.icons8.com/external-bearicons-flat-bearicons/344/external-No-yes-or-no-bearicons-flat-bearicons.png",
        },
      ],
      que: "health issue",

      backimage:
        "https://businessmirror.com.ph/wp-content/uploads/2018/12/hf01-121318.jpg",
    },
    {
      questiontext: "በተለየ መልኩ?",
      answeroptions: [
        {
          answerText: "Diabetes(ስኳር)",
          next: "24",
        },
        {
          answerText: "Blood pressure(ደም ግፊት)",
          next: "24",
        },
        {
          answerText: "Back pain(የጀርባ ህመም)",
          next: "24",
        },
        {
          answerText: "Any gastric isssue(የሆድ ችግር)",
          next: "24",
        },
        {
          answerText: "Knee pain(የጉልበት ህመም)",
          next: "24",
        },
      ],
      que: "disease",

      backimage:
        "https://washingtonmonthly.com/wp-content/uploads/2019/10/iStock-1046447804.jpg",
    },
    // {
    //   questiontext: "Occupation ?",
    //   answeroptions: [
    //     {
    //       answerText: "Student",
    //       next: "13",
    //       icon: "https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/344/external-student-online-learning-kiranshastry-lineal-color-kiranshastry-1.png",
    //     },
    //     {
    //       answerText: "Employee",
    //       next: "13",
    //       icon: "https://img.icons8.com/external-flaticons-flat-flat-icons/344/external-worker-insurance-flaticons-flat-flat-icons.png",
    //     },
    //   ],
    //   que: "occupation",

    //   backimage:
    //     "https://cdn.xxl.thumbs.canstockphoto.com/people-of-various-professions-set-teacher-chef-cook-construction-worker-characters-cartoon-vector-vector-clip-art_csp91306512.jpg",
    // },
    // {
    //   questiontext: "What is your sitting time ?",
    //   answeroptions: [
    //     {
    //       answerText: "Less Active",
    //       next: "14",
    //       icon: "https://img.icons8.com/external-sbts2018-flat-sbts2018/344/external-active-basic-ui-elements-2.3-sbts2018-flat-sbts2018.png",
    //     },
    //     {
    //       answerText: "Active",
    //       next: "14",
    //       icon: "https://img.icons8.com/external-sbts2018-flat-sbts2018/344/external-active-basic-ui-elements-2.3-sbts2018-flat-sbts2018.png",
    //     },
    //     {
    //       answerText: "More Active",
    //       next: "14",
    //       icon: "https://img.icons8.com/external-sbts2018-flat-sbts2018/344/external-active-basic-ui-elements-2.3-sbts2018-flat-sbts2018.png",
    //     },
    //   ],
    //   que: "sittingtime",

    //   backimage:
    //     "https://post.healthline.com/wp-content/uploads/2020/08/workplace-health-things-that-happen-when-you-sit-down-all-day_thumb.jpg",
    // },
    // {
    //   questiontext: "Sleeping time ?",
    //   answeroptions: [
    //     {
    //       answerText: "A. 4pm - 12Am",
    //       next: "15",
    //       icon: "https://img.icons8.com/external-sbts2018-flat-sbts2018/344/external-active-basic-ui-elements-2.3-sbts2018-flat-sbts2018.png",
    //     },
    //     {
    //       answerText: "B. above 6pm",
    //       next: "15",
    //       icon: "https://img.icons8.com/external-sbts2018-flat-sbts2018/344/external-active-basic-ui-elements-2.3-sbts2018-flat-sbts2018.png",
    //     },
    //   ],
    //   que: "sleepingtime",

    //   backimage:
    //     "https://www.verywellmind.com/thmb/_NvXGprP3usPvZZoHy6PbEEvJew=/2120x1192/smart/filters:no_upscale()/GettyImages-674707495-1a3096b7f13a4c90b719961ab96f708a.jpg",
    // },
    // {
    //   questiontext: "What kind of food you eat usually ?",
    //   answeroptions: [
    //     {
    //       answerText: "Eat bread",
    //       next: "16",
    //       icon: "https://img.icons8.com/office/344/meal.png",
    //     },
    //     {
    //       answerText: "Eat injera",
    //       next: "16",
    //       icon: "https://img.icons8.com/office/344/meal.png",
    //     },
    //     {
    //       answerText: "Eat sweet thing",
    //       next: "16",
    //       icon: "https://img.icons8.com/office/344/meal.png",
    //     },
    //     {
    //       answerText: "Eat junk food",
    //       next: "16",
    //       icon: "https://img.icons8.com/office/344/meal.png",
    //     },
    //   ],
    //   que: "food",

    //   backimage:
    //     "https://d18mqtxkrsjgmh.cloudfront.net/public/2021-03/Eating%20More%20Ultraprocessed%20%E2%80%98Junk%E2%80%99%20Food%20Linked%20to%20Higher%20CVD%20Risk.jpeg",
    // },
    {
      questiontext: "ከዚህ በፊት ለመክሳት ሞክረው ነበረ?",
      answeroptions: [
        {
          answerText: "አዎ",
          next: "11",
          icon: "https://img.icons8.com/external-bearicons-outline-color-bearicons/344/external-Yes-yes-or-no-bearicons-outline-color-bearicons.png",
        },
        {
          answerText: "አይ",
          next: "13",
          icon: "https://img.icons8.com/external-bearicons-flat-bearicons/344/external-No-yes-or-no-bearicons-flat-bearicons.png",
        },
      ],
      que: "tryweightloss",

      backimage:
        "https://cdn-3.expansion.mx/dims4/default/9a5524a/2147483647/strip/true/crop/1212x636%200%20115/resize/1200x630!/format/jpg/quality/80/?url=https://cdn-3.expansion.mx/d7/e5/efcc6e5a40e3932dbbdd6fc76621/istock-1128680396.jpg",
    },
    {
      questiontext: "እንዴት ነው የሞከሩት?",
      answeroptions: [
        {
          answerText: "በግሎ",
          next: "13",
          icon: "https://img.icons8.com/office/344/checked--v1.png",
        },
        {
          answerText: "በአሰልጣኝ",
          next: "12",
          icon: "https://img.icons8.com/office/344/checked--v1.png",
        },
      ],
      que: "weightlossbywho",

      backimage:
        "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Fitness/Articles/Favorite+Workouts/woman+with+personal+trainer-carousel.jpg",
    },
    {
      questiontext: " ምን አይነት ዳይት ነው የሞከሩት?",
      answeroptions: [
        {
          answerText: "Keto diet (ኬቶ)",
          next: "13",
        },
        {
          answerText: "inlitument testing (ኢንላይትመንት) ",
          next: "13",
        },
        {
          answerText: "Keto diet (ኬቶ)",
          next: "13",
        },
        {
          answerText: "None (ሌላ)",
          next: "13",
        },
      ],
      que: "diet",

      backimage:
        "https://cdn-prod.medicalnewstoday.com/content/images/articles/319/319399/woman-leaning-on-table-with-various-ingredients-and-a-diet-planning-book.jpg",
    },
    {
      questiontext: "የዖም ዳይት ይሁንሎት ?",
      answeroptions: [
        {
          answerText: "አዎ",
          next: "15",
          icon: "https://img.icons8.com/external-bearicons-outline-color-bearicons/344/external-Yes-yes-or-no-bearicons-outline-color-bearicons.png",
        },
        {
          answerText: "አይ",
          next: "15",
          icon: "https://img.icons8.com/external-bearicons-flat-bearicons/344/external-No-yes-or-no-bearicons-flat-bearicons.png",
        },
      ],
      que: "fastingdiet",

      backimage:
        "https://cdn-prod.medicalnewstoday.com/content/images/articles/319/319399/woman-leaning-on-table-with-various-ingredients-and-a-diet-planning-book.jpg",
    },
  ];
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
  const nextquestion = (num, answer, que) => {
    setQuestionCount(num);
    setPathQuestion((current) => [...current, num]);

    setAnswers((current) => [...new Set(current), { [que]: answer }]);

    {
      console.log(answers);
      console.log(questionConut);
      console.log(pathQuestion);
    }
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

      const bmiheight = bmi.height * bmi.height;

      const Bmi = bmi.weight / bmiheight;
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
      if (questionConut === 14 || Bmi < 18) {
        setQuestionCount(15);
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
              <div className="inputscontainer">
                <input
                  type="number"
                  name="height"
                  placeholder="Height"
                  required
                  value={bmi.height}
                  onChange={handlesubmit}
                />
                <input
                  required
                  type="number"
                  name="weight"
                  placeholder="weight"
                  value={bmi.weight}
                  onChange={handlesubmit}
                />
                <input
                  required
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={bmi.age}
                  onChange={handlesubmit}
                />
                <input
                  required
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
              {console.log(answers)}
              {answers.map((key, value) => {
                return (
                  <ul>
                    <li key={key}> - {value}</li>
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
