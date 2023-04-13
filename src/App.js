import { useState } from "react";
import Question from "./Components/Question";
import UserInput from "./Components/UserInput";
import UserContext from "./UserContext";
import { Route, Routes } from "react-router-dom";

function App() {
  const [formData,setFormData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:""
  })
  return (
      <UserContext.Provider value={{
      formData,
      setFormData
    }}>
    <div className="App">
      {/* <Question /> */}
      <Routes>
      <Route path="/" element={<UserInput/>}/>
      <Route path="/question" element={<Question/>}/>
      </Routes>
    </div>
    </UserContext.Provider>
  );
}

export default App;
