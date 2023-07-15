import { useState } from 'react';

const useInput = (verifyInput) => {
    const [value, setValue] = useState('');
    const [isInputTouched, setIsInputTouched] = useState(false);

    const inputIsValid = verifyInput(value);
    
    const inputChangeHandler = (event) => {
        setValue(event.target.value);
    }

    const inputBlurHandler = (event) => {
        setIsInputTouched(true);
    }
    const resetForm=()=>{
        setIsInputTouched(false);
        setValue('');
    }

    const enteredInputInvalid = !inputIsValid && isInputTouched;
    return{
        value,
        inputIsValid,
        inputBlurHandler,
        inputChangeHandler,
        resetForm,
        enteredInputInvalid
    }
}

export default useInput;