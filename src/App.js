import React, { Component } from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Layout from './hoc/layout/layout';
import BurgerBuilder from './container/burgerBuilder/burgerBuilder';

import Logout from './container/auth/logout/logout';
import {connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/async/asyncComponent';

const asyncCheckout = asyncComponent(()=>{
  return import('./container/checkout/checkout')

})
const asyncOrders = asyncComponent(()=>{
  return import('./container/order/order')

})
const asyncAuth = asyncComponent(()=>{
  return import('./container/auth/auth')

})


class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp();
  }
  
  render() {
    let routes = (
      <Switch>
      <Route path="/auth" component={asyncAuth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
    )
      if(this.props.isAuthenticated){

        routes = (
        <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrders} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/logout" component={Logout}/>
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to="/" />
        </Switch>
        )
      }

    return (
      <div >
        <Layout>
         

            {routes}
        
          
          
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>{
  return{
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignUp: ()=> dispatch(actions.authCheckState())
  }
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
