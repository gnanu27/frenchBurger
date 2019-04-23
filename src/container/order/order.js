import React,{Component} from 'react';
import Order from '../../Components/order/order';
import {connect} from 'react-redux';
import axios from '../../axios-order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/ui/spinner/spinner';

class Orders extends Component{



    componentDidMount(){
     this.props.onFetchOrder(this.props.token, this.props.userId);

    }
    render(){
        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.orders.map(order =>(
                    <Order key= {order.id} 
                            ingredients={order.ingredients}
                            price = {order.price}
                    />
                ))
        }
         return(
             <div>
               {orders}
             </div>

         );

    }
}
const mapStateToProps = state =>{
    return{
        token: state.auth.token,
        orders: state.orders.orders,
        loading: state.orders.loading,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrder: (token, userId)=> dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps ) (WithErrorHandler(Orders, axios))