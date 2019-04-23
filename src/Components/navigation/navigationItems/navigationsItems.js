import React from 'react';
import './navigationItems.css'
import NavigationItem from './navigationItems/navigationItems'

const NavigationItems =(props)=>(
    <ul className="NavigationItems">
        <NavigationItem link="/" exact >Burger Builder</NavigationItem>
       { props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null }       
       { !props.isAuthenticated ?
        <NavigationItem link="/auth">Authenticated</NavigationItem>
        :
        <NavigationItem link="/logout">Logout</NavigationItem>    
    }
    </ul>
)

export default NavigationItems