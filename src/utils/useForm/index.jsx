import { useState } from "react";
const useForm = (submitCallBack) => {
  const [values, setValues] = useState({});
  const submit = (e) => {
    e.preventDefault();
    submitCallBack();
  };
  const handleChange = (e) => {
    e.preventDefault();
    e.persist();
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return [values, handleChange, submit];
};

export default useForm;
