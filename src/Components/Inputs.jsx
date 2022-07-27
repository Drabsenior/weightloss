import React, { useState } from "react";
import "./Inputs.css";
const Inputs = () => {
  //   const [height, setHeight] = useState("");
  //   const [weight, setWeight] = useState("");
  //   const [age, setAge] = useState("");
  //   const [bloodtype, setBloodtype] = useState("");
  const [bmi, setBmi] = useState({
    height: "",
    weight: "",
    age: "",
    bloodtype: "",
  });
  const handlesubmit = (e) => {
    e.preventDefault();

    const val = e.target.value;
    setBmi({
      ...bmi,
      [e.target.name]: val,
    });
    console.log(bmi);
  };
  return (
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
      <button onClick={(e) => handlesubmit(e)}>Submit</button>
    </div>
  );
};

export default Inputs;
