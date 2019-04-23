import React, {Component} from 'react';
import Aux from '../../../hoc/auxilary/Auxilary'

import Button from '../../ui/button/button';

class OrderSummary extends Component{
    

    render(){
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey =>{
        return (<li key={igKey}>
        <span syle={{textTransform: 'capitalize'}}>{igKey} </span> : {this.props.ingredients[igKey]}
        </li>)
    });
    return( 
       
    <Aux>
       <h3> Your Order </h3>
       <p>A delicious burger with the following ingredients:</p>
        <ul>
        { ingredientSummary }
        </ul>
        <p><strong>Total Price : {this.props.price.toFixed(2)} </strong></p>
        <Button btnType="Danger" clicked={this.props.PurchaseCancelled}>Cancel</Button>
        <Button btnType="Success" clicked={this.props.PurchaseContinued}>Continue</Button>


    </Aux>
);
}
}
export default OrderSummary;