import { useState, useEffect } from "react";

function useForm({ initialValue = {}, validate }) { // 기본값 추가
    const [values, setValues] = useState(initialValue);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    // value: input change 값/e.target.value
    const handleChangeInput = (name, value) => {
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleBlur = (name) => {
        setTouched({
            ...touched, 
            [name]: true,
        });
        
    };

    const getTextInputProps = (name) => {
        const value = values[name];
        const onChange = (event) => handleChangeInput(name, event.target.value);
        const onBlur = () => handleBlur(name);

        return { value, onChange, onBlur }
    };


    useEffect(() => {
        if (typeof validate === 'function') { 
          const newErrors = validate(values);
          setErrors(newErrors);
        }
      }, [validate, values]);

    return { values, errors, touched, getTextInputProps }; 
}
export default useForm;
