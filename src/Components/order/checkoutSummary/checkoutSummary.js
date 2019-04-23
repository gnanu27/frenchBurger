import React from 'react';
import Burger from '../../burger/burger';
import Button from '../../ui/button/button';
import './checkoutSummary.css'

const checkoutSummary = (props) =>{
    return(
        <div className="CheckoutSummary">
            <h1> We hope it Tastes Well!!!</h1>
            <div style={{width: "300px", margin:"auto"}}>
                <Burger ingredients={props.ingredients}/>
            </div>
        <Button btnType="Danger" clicked={props.onCheckoutCancelled}>Exit</Button>
        <Button btnType="Success" clicked={props.onCheckoutContinue}>Continue </Button>
        </div>
    )
}

export default checkoutSummary