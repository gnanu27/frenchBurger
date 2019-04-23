import React, {Component} from 'react';
import CheckoutSummary from '../../Components/order/checkoutSummary/checkoutSummary';
import {Route, Redirect } from 'react-router-dom';
import ContactData from './contactData/contactData'
import {connect} from 'react-redux';
// import * as actions from '../../store/actions/index';

class Checkout extends Component{
   


    checkoutCancelledHandler =()=>{
        this.props.history.goBack()
    }

    checkoutContinueHandler =()=>{
        this.props.history.replace('/checkout/contact-data')

    }


    render(){

        let summary = <Redirect to="/" />
        
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null

            
            summary =(
                <div>

                                
                        {purchasedRedirect}

                <CheckoutSummary ingredients={this.props.ings} 
                onCheckoutCancelled={this.checkoutCancelledHandler}
                onCheckoutContinue={this.checkoutContinueHandler}
                />

                <Route path={this.props.match.path + '/contact-data'}  
                    component={ContactData} />

                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
        
    }
}


export default connect(mapStateToProps)( Checkout);