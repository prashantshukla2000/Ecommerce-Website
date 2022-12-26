import React from "react";
import "./Cart.scss";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { makeRequest } from "../../makeRequest.js";
import {loadStripe} from "@stripe/stripe-js";

const Cart = () => {
    const products = useSelector(state => state.cart.products);
    console.log(products);
    const dispatch = useDispatch();

    const totalPrice = () => {
        let total = 0
        products.forEach(item => (total += item.quantity * item.price));
        return total.toFixed(2)
    };
    const stripePromise = loadStripe(
        'pk_test_51MIf4cSHxqPFshn1QoblANf6BGxdWOgTaSeidRXMQQPdf4d3mBS7ltRUlcBr5sXvJVjwONFK2F3tYeXDinWL4AOF00yr4h1wbn'
        );
        
   const handlePayment=async()=>{
    try{
          const stripe= await stripePromise;
         const res=await makeRequest.post("/orders", {
            products,
         });


          await stripe.redirectToCheckout({
            sessionId: res.data.stripeSession.id,
          });
    } catch(err){
      console.log(err)
    }
   };

    return (
        <div className="cart">
            <h1>Products in our Cart</h1>
            {products?.map(item => (
                <div className="item" key={item.id}>
                    <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
                    <div className="details">
                        <h1>{item.title}</h1>
                        <p>{item.desc?.substring(0, 100)}</p>
                        <div className="price">{item.quantity} x ${item.price}</div>
                    </div>
                    <DeleteOutlineIcon className="delete" onClick={() => dispatch(removeItem(item.id))} />
                </div>
            ))}
            <div className="total">
                <span>SUBTOTAL</span>
                <span>{totalPrice()}</span>
            </div>
            <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
            <span className="reset" onClick={() => dispatch(resetCart())}>
                Reset Cart</span>
        </div>
    )
}
export default Cart;