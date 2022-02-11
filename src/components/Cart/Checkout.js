import { useRef, useState } from 'react';
import styles from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
//Could use postcode regex here but keep it simple for demo purposes
const isValidPostcodelength = (value) => value.trim().length === 5; 

const Checkout = (props) => {

  const [formInputValidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postcode: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postcodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostcode = postcodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostcodeIsValid = isValidPostcodelength(enteredPostcode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postcode: enteredPostcodeIsValid,
        city: enteredCityIsValid
    });

    const formIsValid = 
    enteredNameIsValid && 
    enteredStreetIsValid && 
    enteredPostcodeIsValid && 
    enteredCityIsValid;

    if(!formIsValid){
        return;
    }

    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postcode: enteredPostcode
    });
  };

  const nameControlStyles = `${styles.control} ${formInputValidity.name ? '' : styles.invalid}`;
  const streeControlStyles = `${styles.control} ${formInputValidity.street ? '' : styles.invalid}`;
  const postcodeControlStyles = `${styles.control} ${formInputValidity.postcode ? '' : styles.invalid}`;
  const cityControlStyles = `${styles.control} ${formInputValidity.city ? '' : styles.invalid}`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameControlStyles}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streeControlStyles}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postcodeControlStyles}>
        <label htmlFor='postcode'>Postcode</label>
        <input type='text' id='postcode' ref={postcodeInputRef}/>
        {!formInputValidity.postcode && <p>Please enter a valid postcode ( 5 characters long)!</p>}
      </div>
      <div className={cityControlStyles}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;