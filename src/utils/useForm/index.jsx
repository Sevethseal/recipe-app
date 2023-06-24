import { useState } from "react";
const useForm = (initialData, submitCallBack) => {
  const [values, setValues] = useState(initialData);
  const submit = (e) => {
    e.preventDefault();
    submitCallBack();
    setValues(initialData);
  };
  const handleChange = (e) => {
    e.preventDefault();
    e.persist();
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const clearForm = () => {
    setValues(null);
  };
  return [values, handleChange, submit, setValues, clearForm];
};

export default useForm;
