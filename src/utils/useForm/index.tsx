import { useState } from 'react'
const useForm = (
  initialData: unknown,
  submitCallBack: () => void
): [
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (e: React.FormEvent<HTMLFormElement>) => void,
  React.Dispatch<unknown>,
  () => void,
] => {
  const [values, setValues] = useState(initialData)

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(e as unknown as React.ChangeEvent<HTMLInputElement>).preventDefault()
    submitCallBack()
    setValues(initialData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    e.persist()
    setValues((prevState: object) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  const clearForm = () => {
    setValues(null)
  }
  return [values, handleChange, submit, setValues, clearForm]
}

export default useForm
