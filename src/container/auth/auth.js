import React, {Component} from 'react';
import Input from '../../Components/ui/input/input';
import Button from '../../Components/ui/button/button';
import { Redirect } from 'react-router-dom';
import './auth.css';
import Spinner from '../../Components/ui/spinner/spinner';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import {updatedObject, checkValidity} from '../../shared/utility';



class Auth extends Component{

    state= {
        controls: {
            email: {
            elementType: 'input',
            elementConfig:{
            type: 'email',
            placeholder: 'mail address'
        },
        value: '',
        validation:{
            required: true,
            isEmail: true
        },
        valid: false,
        touched: false
        },

        password: {
            elementType: 'input',
            elementConfig:{
            type: 'password',
            placeholder: 'password'
        },
        value: '',
        validation:{
            required: true,
            minLength: 6
        },
        valid: false,
        touched: false
        },
       
    },
    isSignUP: true
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirectPath()

        }

    }
    


switchAuthModeHandler =()=>{
    this.setState(prev => {return{
        isSignUP: !prev.isSignUP
    }})
}


inputChangedHandler =(event, controlName)=>{
    const updatedControls = updatedObject(this.state.controls, {
        [controlName] : updatedObject( this.state.controls[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true

        }) 

    }) 

    this.setState({controls: updatedControls})

}

submitHandler =(event)=>{
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUP)
}

    render(){

        const formElementsArray = []
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementsArray.map(formElement =>(
            <Input key={formElement.id} 
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}  
            inValid = {!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event)=>this.inputChangedHandler(event, formElement.id)} 
             />


        ))
        if(this.props.loading){
                 form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage = (
                <p> { this.props.error.message } </p>
            )
        }
          let authRedirect = null;

        if(this.props.isAuthenticated){

                authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return(
            <div className="Auth">
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}> 
                    {form}
                    <Button btnType="Success" > Submit </Button>
                </form>
                    <Button 
                        clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch To {this.state.isSignUP ? 'SignIn' : 'SignUp'} </Button> 
                
                 </div>

        )
    }
}
const mapStateToProps =state =>{
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (email, password, isSignUp)=> dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Auth);