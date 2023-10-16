import { ChangeEvent, useState } from "react";

type TForm = {
  [key: string]: string;
};

export function useForm(inputValues: TForm) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return { values, handleChange, setValues };
}
