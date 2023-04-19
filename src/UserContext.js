import React from "react";

const UserContext = React.createContext({
  formData: {
    firstName:"",
    lastName:"",
    phone:""
  },
  setFormData: () => {}
});

export default UserContext;