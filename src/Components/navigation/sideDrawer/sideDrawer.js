import React from 'react';
import Logo from '../../logo/logo'
import Aux from '../../../hoc/auxilary/Auxilary'
import NavigationItems from '../navigationItems/navigationsItems'
import './sideDrawer.css'
import BackDrop from '../../ui/backdrop/backdrop'


const SideDrawer = (props)=>{
    let attachedClass = ["SideDrawer", "Close"];

    if(props.open){
        attachedClass = ["SideDrawer", "Open"];
    }

    return(

        <Aux>
        <BackDrop show={props.open} clicked={props.close}/>
        <div className={attachedClass.join(' ')} onClick={props.close}>
        <div className="SideDrawerLogo">
            <Logo />
        </div>
            <nav>  
                <NavigationItems isAuthenticated = {props.isAuth} />
            </nav>
         </div>
         </Aux>
    );

}

export default SideDrawer;