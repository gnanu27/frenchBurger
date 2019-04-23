import React from 'react';
import {NavLink} from 'react-router-dom';
import './navigationItems.css'

const NavigationItem =(props)=>(
    <li className="NavigationItem">
        <NavLink to={props.link}
        exact = {props.exact}
            className={props.active ? "active" : null}
            activeClassName="active"
        >{props.children}</NavLink>
    </li>
)

export default NavigationItem