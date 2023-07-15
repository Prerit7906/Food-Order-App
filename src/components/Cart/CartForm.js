import React from 'react'
import classes from './CartForm.module.css'
import useInput from '../../hooks/use-Input'
import loader from '../../assets/Spinner-2.gif'
const CartForm = (props) => {
  const {
    value:name,
    inputIsValid:nameIsValid,
    inputBlurHandler:nameBlurHandler,
    inputChangeHandler:nameChangeHandler,
    resetForm:resetName,
    enteredInputInvalid:enteredNameInvalid
  }=useInput((value)=>value.trim().length!==0);
  const {
    value:street,
    inputIsValid:streetIsValid,
    inputBlurHandler:streetBlurHandler,
    inputChangeHandler:streetChangeHandler,
    resetForm:resetStreet,
    enteredInputInvalid:enteredStreetInvalid
  }=useInput((value)=>value.trim().length!==0);
  const {
    value:postalCode,
    inputIsValid:postalCodeIsValid,
    inputBlurHandler:postalCodeBlurHandler,
    inputChangeHandler:postalCodeChangeHandler,
    resetForm:resetPostalCode,
    enteredInputInvalid:enteredPostalCodeInvalid
  }=useInput((value)=>value.trim().length===6);
  const {
    value:city,
    inputIsValid:cityIsValid,
    inputBlurHandler:cityBlurHandler,
    inputChangeHandler:cityChangeHandler,
    resetForm:resetCity,
    enteredInputInvalid:enteredCityInvalid
  }=useInput((value)=>value.trim().length!==0);

  const submitHandler=(event)=>{
    event.preventDefault();
    if(!nameIsValid || !streetIsValid || !postalCodeIsValid || !cityIsValid){
      if(!nameIsValid)
      nameBlurHandler();
      if(!streetIsValid)
      streetBlurHandler();
      if(!postalCodeIsValid)
      postalCodeBlurHandler();
      if(!cityIsValid)
      cityBlurHandler();
      return ;
    }
    const isSucceed=props.onOrder({
      name,
      street,
      postalCode,
      city
    });
    if(isSucceed.value){
    resetName();
    resetStreet();
    resetPostalCode();
    resetCity();
    }
    
  }
  const nameStyle=`${classes.control} ${enteredNameInvalid?classes.invalid:''}`;
  const streetStyle=`${classes.control} ${enteredStreetInvalid?classes.invalid:''}`;
  const postalCodeStyle=`${classes.control} ${enteredPostalCodeInvalid?classes.invalid:''}`;
  const cityStyle=`${classes.control} ${enteredCityInvalid?classes.invalid:''}`;
  return (
    <form className={classes.form} onSubmit={submitHandler}>
        <div className={nameStyle}>
        <label htmlFor='name'>Your Name</label>
        <input onChange={nameChangeHandler} onBlur={nameBlurHandler} type='text' id='name' value={name}/>
        {enteredNameInvalid && <p >Name should not be empty</p>}
      </div>
      <div className={streetStyle}>
        <label htmlFor='street'>Street</label>
        <input onChange={streetChangeHandler} onBlur={streetBlurHandler} value={street} type='text' id='street' />
        {enteredStreetInvalid && <p >Street should not be empty</p>}
      </div>
      <div className={postalCodeStyle}>
        <label htmlFor='postal'>Postal Code</label>
        <input onChange={postalCodeChangeHandler} onBlur={postalCodeBlurHandler} value={postalCode} type='number' id='postal' />
        {enteredPostalCodeInvalid && <p >Postal Code should contain 6 digits  </p>}
      </div>
      <div className={cityStyle}>
        <label htmlFor='city'>City</label>
        <input onChange={cityChangeHandler} onBlur={cityBlurHandler} value={city} type='text' id='city' />
        {enteredCityInvalid && <p >City should not be empty </p>}      
      </div>
      {props.isLoading && <img src={loader} alt='Loader'></img> }

      {props.postError && <p className={classes['post-error']}>{props.postError}</p>}
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default CartForm