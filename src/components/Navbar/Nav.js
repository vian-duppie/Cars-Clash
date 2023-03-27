import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon/Icon';
import LogoIcon from '../../assets/SVG/logo-icon.svg';
import styles from './Nav.module.css';

const Nav = () => {
    return (
        <div className={ styles.navContainer }>
            <img className={ styles.navContainer__Logo } 
                src={ LogoIcon } 
                alt="App-Logo">
            </img>
            <div className={styles.navContainer__Line}></div>


            <ul className={ styles.navContainer__listContainer }>
                <li>
                    <NavLink to='/' className={ ({ isActive }) => isActive ? styles.active : styles.unSelected}>
                            <Icon className={ styles.navContainer__listContainer__list__iconContainer }
                                icon='bar-chart'
                            />
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/Compare' className={ ({ isActive }) => isActive ? styles.active : styles.unSelected} >
                        <Icon className={ styles.navContainer__listContainer__list__iconContainer }
                            icon='pie-chart'
                        />
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/Timeline' className={ ({ isActive }) => isActive ? styles.active : styles.unSelected} >
                        <Icon className={ styles.navContainer__listContainer__list__iconContainer }
                            icon='timeline-chart'
                        />
                    </NavLink>
                </li>
            </ul>

        </div>
    );
};

export default Nav;