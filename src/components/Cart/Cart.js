import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartForm from './CartForm';

const Cart = (props) => {
  
  const [isOrdered, setIsOrdered] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, { ...item, amount: 1 })}
        />
      ))}
    </ul>
  );

  const [postError,setPostError]=useState(null);

  const [isSubmitted,setIsSubmitted]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const finalOrderHandler=async (info)=>{
    setIsLoading(true);
    setPostError(false);
    setIsSubmitted(false);
    const foodList=cartCtx.items;
    try{
      const response =await fetch('https://mybackend-bf49e-default-rtdb.firebaseio.com/orderMeals.json',{
      method:'POST',
      body:JSON.stringify({foodList,info})
    });
    if(!response.ok){
      throw new Error("Could not order food due to network error!!")
    }
    const responseData=await response.json();
    cartCtx.clearCart();
    setIsSubmitted(true)
    console.log("Food Ordered Successfully!!");
    console.log(responseData);
    setIsLoading(false);
    }
    catch(error){
      console.log(error);
      setPostError(error.message);
      setIsLoading(false);
      return false;
    }  
    return true;
  }

  if(!postError && isSubmitted){
    return <Modal onClose={props.onClose}>
        <h3 className={classes.submitted}>Order Submitted Successfully!!</h3>
        <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
      </div>
      </Modal>
  }
  const orderFoodHandler = () => {
    setIsOrdered(true);
  }
  const orderJSX = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>
      Close
    </button>
    {hasItems && <button onClick={orderFoodHandler} className={classes.button}>{isLoading? 'Loading...':'Confirm'}</button>}
  </div>;
  // console.log(postError);
  return (
    <Modal onClose={props.onClose}>
      <div className={classes.modal}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isOrdered && <CartForm postError={postError} isLoading={isLoading} onOrder={finalOrderHandler} onCancel={props.onClose}/>}
        {!isOrdered && orderJSX}

      </div>
    </Modal>
  );
};

export default Cart;
