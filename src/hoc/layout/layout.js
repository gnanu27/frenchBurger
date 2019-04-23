import React, {Component} from 'react';
import Aux from '../auxilary/Auxilary';
import './layout.css';
import {connect} from 'react-redux';
import Toolbar from '../../Components/navigation/toolbar/toolbar'
import SideDrawer from '../../Components/navigation/sideDrawer/sideDrawer'


class layout extends Component{

    state={
        showSideDrawer : false,
    }



    CloseSideBar =()=>{
        this.setState({showSideDrawer : false})
    }
    sideDrawerToggle = (props) =>{
        this.setState((prev) =>{
            return {showSideDrawer : !prev.showSideDrawer}
        } )
    }

    render(){

    return(
    
    <Aux>
        <Toolbar isAuth={this.props.isAuth}  DrawerToggleClicked = {this.sideDrawerToggle} />

        <SideDrawer  
        isAuth={this.props.isAuth}
        open = {this.state.showSideDrawer} close={this.CloseSideBar} />
    <main className="Content">{this.props.children}</main>
    </Aux>
)
}
}

const mapStateToProps = state =>{
    return{
        isAuth : state.auth.token !== null
    }

}

export default connect(mapStateToProps) (layout); 