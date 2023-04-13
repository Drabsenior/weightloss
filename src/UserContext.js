import React from "react";

const UserContext = React.createContext({
  formData: {
    firstName:"",
    lastName:"",
    email:"",
    phone:""
  },
  setFormData: () => {}
});

export default UserContext;