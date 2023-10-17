import { useCallback, useState } from "react";

type TValues = {
  [key: string]: string;
};

type TErrors = {
  [key: string]: string;
};

export function useFormWithValidation(inputValues: TValues) {
  const [values, setValues] = useState(inputValues);
  const [errors, setErrors] = useState<TErrors>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form")!.checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, setValues, resetForm };
}
