import React,{Component} from 'react';
import Button from '../../../Components/ui/button/button';
import './contactData.css';
import axios from '../../../axios-order';
import Input from '../../../Components/ui/input/input';
import Spinner from '../../../Components/ui/spinner/spinner'
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';
import { updatedObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component{


    state={
        orderForm:{
            name: {
                elementType: 'input',
                elementConfig:{
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
            },
            street:{
                elementType: 'input',
                elementConfig:{
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig:{
                type: 'text',
                placeholder: 'ZipCode'
            },
            value: '',
            validation:{
                required: true,
                maxLength: 5,
                minLength: 5
            },
            valid: false,
            touched: false
            },
            country: {
                elementType: 'input',
                elementConfig:{
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
            },
            email: {
                elementType: 'input',
                elementConfig:{
                type: 'text',
                placeholder: 'Email'
            },
            value: '',
            validation:{
                required: true
            },
            valid: false,
            touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig:{
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'slowest', displayValue: 'Slowest'}
                ],
            },
            value: 'fastest',
            validation:{},
            valid: true
            },
        },
        formIsValid: false
            
    }
orderHandler = (event)=>{
    event.preventDefault();
    
    const formData = {}
    for(let formElementIdentifier in this.state.orderForm){
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        
    }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger( order, this.props.token)
       
}



inputChangedHandler =(event, inputIdentifier)=>{
  

    const updatedOrderElements = updatedObject(this.state.orderForm[inputIdentifier], {

        value: event.target.value,
        valid : checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
        touched:true,
    })  
    const updatedOrderForm = updatedObject(this.state.orderForm, {
        [inputIdentifier] : updatedOrderElements
    })


    let formIsValid = true;
    for(let inputIdentifier in updatedOrderForm){
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
    }

    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})

}

    render(){
        const formElementsArray = []
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}> 
               {
                   formElementsArray.map(formElement =>(
                       <Input key={formElement.id} elementType={formElement.config.elementType} 
                              elementConfig={formElement.config.elementConfig}
                              value={formElement.config.value}  
                              inValid = {!formElement.config.valid}
                              shouldValidate={formElement.config.validation}
                              touched={formElement.config.touched}
                              changed={(event)=>this.inputChangedHandler(event, formElement.id)}
                       />
                   ))
               }
                <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>

            </form>
        );
            if(this.props.loading){
                form = <Spinner />;
            }


        return(
            <div className="contactData">
                <h4>Contact Details....</h4>
            {form}

            </div>

        )
    }
}

const mapStateToProps = state=>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onOrderBurger : (orderData, token) => dispatch( actions.purchaseBurger(orderData, token))
}}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( ContactData, axios))