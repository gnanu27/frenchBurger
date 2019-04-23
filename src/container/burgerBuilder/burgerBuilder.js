import React , {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/auxilary/Auxilary';
import Burger from '../../Components/burger/burger';
import BuildControls from '../../Components/burger/buildControls/buildControls';
import Modal from '../../Components/ui/modal/modal';
import OrderSummary from '../../Components/burger/orderSummary/orderSummary';
import Spinner from '../../Components/ui/spinner/spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-order';



export class BurgerBuilder extends Component{
    state = {
         purchasing: false,
         
    }

    componentDidMount(){
        
        this.props.onInitIngredients()
       
    }
updatePurchase(ingredients){
    const sum = Object.keys(ingredients)
    .map(igKey =>{
        return ingredients[igKey];
    })
        .reduce((sum, el)=>{
        return sum + el;
    },0);
    return sum > 0
}

purchaseHandler = ()=>{
    if(this.props.isAuthenticated){
        this.setState({purchasing: true})
    }

    else{
        
        this.props.onSetAuthRedirectPath('/checkout')
        this.props.history.push('/auth')
    }
    
}

    purchaseCancelHandler =()=>{
        this.setState({purchasing: false})

    }
    purchaseContinueHandler =()=>{
        // alert('You Continue!!')
        
        this.props.onInitPurchased();
        this.props.history.push('/checkout');

    }
    
    render(){
        const disableInfo = {
            ...this.props.ings
        }
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
    
        let burger = this.props.error ? <p> some error in the link </p> :<Spinner />
        
        if(this.props.ings ){
            burger = (
                <Aux>
    
                <Burger ingredients={this.props.ings} />
                 <BuildControls 
                            ingredientAdded={this.props.onIngredientsAdded}
                            ingredientRemoved = {this.props.onIngredientsRemoved}
                            disabled = {disableInfo}
                            price={this.props.price}
                            isAuth = {this.props.isAuthenticated}
                            purchasable={this.updatePurchase(this.props.ings)}
                            ordered={this.purchaseHandler}
                    />
    
                </Aux>
            )
            orderSummary = <OrderSummary 
                price ={this.props.price}
                PurchaseContinued={this.purchaseContinueHandler} 
                PurchaseCancelled={this.purchaseCancelHandler}
                ingredients={this.props.ings} />

        }

      
    
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger} 
                
            </Aux>
        )
    }
}

const mapStateToProps = state =>{

    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null,
     
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientsAdded : (ingName) =>dispatch( actions.addIngredient(ingName)),
        onIngredientsRemoved : (ingName) =>dispatch( actions.removeIngredient(ingName)),
        onInitIngredients: ()=>dispatch(actions.initIngredients()),
        onInitPurchased: ()=>dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path)=>dispatch(actions.setAuthRedirectPath(path))
    
    };
}

export default connect(mapStateToProps, mapDispatchToProps)( WithErrorHandler( BurgerBuilder, axios));