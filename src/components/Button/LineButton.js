import React from 'react';
import styles from './LineButton.module.css';
import Icon from '../Icon/Icon';

const LineButton = (props) => {
    return (
        <div className={` 
            ${ styles.lineButtonContainer } 
            ${ props.className ? props.className : ''}
        `}
            onClick={ props.click }
        >
            <p className={`
                ${ styles.lineButtonContainer__label } 
                p2
            `}>
                { props.label }
            </p>
            <Icon
                className={ styles.lineButtonContainer__iconContainer }
                icon={ props.icon }
            />
        </div>
    );
};

export default LineButton;