import React from 'react';
import './toolbar.css'
import DrawerToggle from '../sideDrawer/drawerToggle/drawerToggle'
import Logo from '../../logo/logo'
import NavigationItems from '../navigationItems/navigationsItems';

const toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle clicked={props.DrawerToggleClicked}/>
        <div className="Tool-Logo">
        <Logo />
        </div>
        <nav className="displayDesktop"> 
            <NavigationItems isAuthenticated = {props.isAuth} />
        </nav>

    </header>

    
)

export default toolbar;