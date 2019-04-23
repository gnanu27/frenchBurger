import * as actionTypes from './actionTypes';
import axios from '../../axios-order';
import { purchaseBurgerStart } from './order';

export const addIngredient = (name)=>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}


export const removeIngredient = (name)=>{
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}
export const fetchIngredientFailed = ()=>{
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED
    }
}

export const setIngredient = (ingredients)=>{
    return{
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
} 

export const initIngredients = ()=>{
    return dispatch =>{
       dispatch(purchaseBurgerStart())
         axios.get('https://{firebase app url}/ingredients.json')
        .then( response => {
           dispatch(setIngredient(response.data))
        })
        .catch( error =>{
            dispatch(fetchIngredientFailed());
           
        } )


    }
}